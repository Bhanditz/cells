/*
 * Copyright (c) 2018. Abstrium SAS <team (at) pydio.com>
 * This file is part of Pydio Cells.
 *
 * Pydio Cells is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Pydio Cells is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Pydio Cells.  If not, see <http://www.gnu.org/licenses/>.
 *
 * The latest code can be found at <https://pydio.com>.
 */

package rest

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"

	"github.com/emicklei/go-restful"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"

	"strings"

	"encoding/base64"

	"time"

	"github.com/pborman/uuid"
	"github.com/pydio/cells/common"
	"github.com/pydio/cells/common/config"
	"github.com/pydio/cells/common/log"
	"github.com/pydio/cells/common/proto/rest"
	"github.com/pydio/cells/common/service"
	"github.com/pydio/cells/common/service/frontend"
)

type FrontendHandler struct{}

func NewFrontendHandler() *FrontendHandler {
	f := &FrontendHandler{}
	return f
}

// SwaggerTags list the names of the service tags declared in the swagger json implemented by this service
func (a *FrontendHandler) SwaggerTags() []string {
	return []string{"FrontendService"}
}

// Filter returns a function to filter the swagger path
func (a *FrontendHandler) Filter() func(string) string {
	return nil
}

func (a *FrontendHandler) FrontState(req *restful.Request, rsp *restful.Response) {
	pool, e := frontend.GetPluginsPool()
	if e != nil {
		service.RestError500(req, rsp, e)
		return
	}
	ctx := req.Request.Context()
	wsId := req.QueryParameter("ws")

	user := &frontend.User{}
	if e := user.Load(ctx); e != nil {
		service.RestError500(req, rsp, e)
		return
	}
	user.LoadActiveWorkspace(wsId)
	cfg := config.Default()
	rolesConfigs := user.FlattenedRolesConfigs()

	status := frontend.RequestStatus{
		Config:        cfg,
		AclParameters: rolesConfigs.Get("parameters").(*config.Map),
		AclActions:    rolesConfigs.Get("actions").(*config.Map),
		WsScopes:      user.GetActiveScopes(),
		User:          user,
		NoClaims:      !user.Logged,
	}
	registry := pool.RegistryForStatus(ctx, status)
	rsp.WriteAsXml(registry)
}

func (a *FrontendHandler) FrontBootConf(req *restful.Request, rsp *restful.Response) {

	pool, e := frontend.GetPluginsPool()
	if e != nil {
		service.RestError500(req, rsp, e)
		return
	}
	bootConf := frontend.ComputeBootConf(pool)
	rsp.WriteAsJson(bootConf)

}

func (a *FrontendHandler) FrontSession(req *restful.Request, rsp *restful.Response) {

	var loginRequest rest.FrontSessionRequest
	if e := req.ReadEntity(&loginRequest); e != nil {
		service.RestError500(req, rsp, e)
		return
	}

	if loginRequest.Logout {
		if session, err := frontend.GetSessionStore().Get(req.Request, "pydio"); err == nil {
			if _, ok := session.Values["jwt"]; ok {
				log.Logger(req.Request.Context()).Info("Clearing session")
				delete(session.Values, "jwt")
				session.Options.MaxAge = 0
				session.Save(req.Request, rsp.ResponseWriter)
			}
		}
		rsp.WriteEntity(&rest.FrontSessionResponse{})
		return
	}

	if loginRequest.Login == "" && loginRequest.Password == "" {
		if session, err := frontend.GetSessionStore().Get(req.Request, "pydio"); err == nil {
			if val, ok := session.Values["jwt"]; ok {
				expiry := session.Values["expiry"].(int)
				expTime := time.Unix(int64(expiry), 0)
				response := &rest.FrontSessionResponse{
					JWT:        val.(string),
					ExpireTime: int32(expTime.Sub(time.Now()).Seconds()),
				}
				log.Logger(req.Request.Context()).Info("Sending response from session", zap.Any("r", response))
				rsp.WriteEntity(response)
			} else {
				// Just send an empty response
				rsp.WriteEntity(&rest.FrontSessionResponse{})
			}
		} else {
			service.RestError500(req, rsp, fmt.Errorf("could not load session store", err))
		}
		return
	}

	fullURL := config.Get("defaults", "urlInternal").String("") + "/auth/dex/token"

	data := url.Values{}
	data.Set("grant_type", "password")
	data.Add("username", loginRequest.Login)
	data.Add("password", loginRequest.Password)
	data.Add("scope", "email profile pydio")
	data.Add("nonce", uuid.New())

	httpReq, err := http.NewRequest("POST", fullURL, strings.NewReader(data.Encode()))
	if err != nil {
		service.RestError500(req, rsp, err)
		return
	}

	auth := "cells-front" + ":" + "4zINIVHwQhG1aNqATGKT6jQ2"
	basic := "Basic " + base64.StdEncoding.EncodeToString([]byte(auth))

	httpReq.Header.Add("Content-Type", "application/x-www-form-urlencoded") // Important our dex API does not yet support json payload.
	httpReq.Header.Add("Cache-Control", "no-cache")
	httpReq.Header.Add("Authorization", basic)

	res, err := http.DefaultClient.Do(httpReq)
	if err != nil {
		service.RestError500(req, rsp, err)
		return
	}
	defer res.Body.Close()

	var respMap map[string]interface{}
	err = json.NewDecoder(res.Body).Decode(&respMap)
	if err != nil {
		service.RestError500(req, rsp, fmt.Errorf("could not unmarshall response with status %d: %s\nerror cause: %s", res.StatusCode, res.Status, err.Error()))
		return
	}
	if errMsg, exists := respMap["error"]; exists {
		service.RestError500(req, rsp, fmt.Errorf("could not retrieve token, %s: %s", errMsg, respMap["error_description"]))
	}

	token := respMap["id_token"].(string)
	expiry := respMap["expires_in"].(float64) - 60 // Secure by shortening expiration time

	response := &rest.FrontSessionResponse{
		JWT:        token,
		ExpireTime: int32(expiry),
	}

	if session, err := frontend.GetSessionStore().Get(req.Request, "pydio"); err == nil {
		log.Logger(req.Request.Context()).Info("Saving token in session")
		session.Values["jwt"] = token
		session.Values["expiry"] = time.Now().Add(time.Duration(expiry) * time.Second).Second()
		if e := session.Save(req.Request, rsp.ResponseWriter); e != nil {
			log.Logger(req.Request.Context()).Error("Error saving session", zap.Error(e))
		}
	} else {
		log.Logger(req.Request.Context()).Error("Could not load session store", zap.Error(err))
	}

	rsp.WriteEntity(response)
}

func (a *FrontendHandler) FrontMessages(req *restful.Request, rsp *restful.Response) {
	pool, e := frontend.GetPluginsPool()
	if e != nil {
		service.RestError500(req, rsp, e)
		return
	}
	lang := req.PathParameter("Lang")
	rsp.WriteAsJson(pool.I18nMessages(lang).Messages)
}

// Log handles all HTTP requests sent to the FrontLogService, reads the message and directly returns.
// It then dispatches asynchronously the corresponding log message to technical and audit loggers.
func (a *FrontendHandler) FrontLog(req *restful.Request, rsp *restful.Response) {

	var message rest.FrontLogMessage
	req.ReadEntity(&message)
	rsp.WriteEntity(&rest.FrontLogResponse{Success: true})

	go func() {
		logger := log.Logger(req.Request.Context())

		zaps := []zapcore.Field{
			zap.String(common.KEY_FRONT_IP, message.Ip),
			zap.String(common.KEY_FRONT_USERID, message.UserId),
			zap.String(common.KEY_FRONT_WKSID, message.WorkspaceId),
			zap.String(common.KEY_FRONT_SOURCE, message.Source),
			zap.Strings(common.KEY_FRONT_NODES, message.Nodes),
		}

		if message.Level == rest.LogLevel_DEBUG || message.Level == rest.LogLevel_NOTICE {
			logger.Debug(message.Message, zaps...)
		} else if message.Level == rest.LogLevel_ERROR || message.Level == rest.LogLevel_WARNING {
			logger.Error(message.Message, zaps...)
		} else {
			logger.Info(message.Message, zaps...)
		}
	}()
}

func (a *FrontendHandler) SettingsMenu(req *restful.Request, rsp *restful.Response) {

	rsp.WriteEntity(settingsNode)

}
