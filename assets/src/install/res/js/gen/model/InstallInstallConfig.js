/**
 * Pydio Cells Rest API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 */

'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _ApiClient = require('../ApiClient');

var _ApiClient2 = _interopRequireDefault(_ApiClient);

var _InstallCheckResult = require('./InstallCheckResult');

var _InstallCheckResult2 = _interopRequireDefault(_InstallCheckResult);

/**
* The InstallInstallConfig model module.
* @module model/InstallInstallConfig
* @version 1.0
*/

var InstallInstallConfig = (function () {
    /**
    * Constructs a new <code>InstallInstallConfig</code>.
    * @alias module:model/InstallInstallConfig
    * @class
    */

    function InstallInstallConfig() {
        _classCallCheck(this, InstallInstallConfig);

        this.internalUrl = undefined;
        this.dbConnectionType = undefined;
        this.dbTCPHostname = undefined;
        this.dbTCPPort = undefined;
        this.dbTCPName = undefined;
        this.dbTCPUser = undefined;
        this.dbTCPPassword = undefined;
        this.dbSocketFile = undefined;
        this.dbSocketName = undefined;
        this.dbSocketUser = undefined;
        this.dbSocketPassword = undefined;
        this.dbManualDSN = undefined;
        this.dsName = undefined;
        this.dsPort = undefined;
        this.dsFolder = undefined;
        this.externalMicro = undefined;
        this.externalGateway = undefined;
        this.externalWebsocket = undefined;
        this.externalFrontPlugins = undefined;
        this.externalDAV = undefined;
        this.externalWOPI = undefined;
        this.externalDex = undefined;
        this.externalDexID = undefined;
        this.externalDexSecret = undefined;
        this.frontendHosts = undefined;
        this.frontendLogin = undefined;
        this.frontendPassword = undefined;
        this.frontendRepeatPassword = undefined;
        this.fpmAddress = undefined;
        this.licenseRequired = undefined;
        this.licenseString = undefined;
        this.CheckResults = undefined;
    }

    /**
    * Constructs a <code>InstallInstallConfig</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:model/InstallInstallConfig} obj Optional instance to populate.
    * @return {module:model/InstallInstallConfig} The populated <code>InstallInstallConfig</code> instance.
    */

    InstallInstallConfig.constructFromObject = function constructFromObject(data, obj) {
        if (data) {
            obj = obj || new InstallInstallConfig();

            if (data.hasOwnProperty('internalUrl')) {
                obj['internalUrl'] = _ApiClient2['default'].convertToType(data['internalUrl'], 'String');
            }
            if (data.hasOwnProperty('dbConnectionType')) {
                obj['dbConnectionType'] = _ApiClient2['default'].convertToType(data['dbConnectionType'], 'String');
            }
            if (data.hasOwnProperty('dbTCPHostname')) {
                obj['dbTCPHostname'] = _ApiClient2['default'].convertToType(data['dbTCPHostname'], 'String');
            }
            if (data.hasOwnProperty('dbTCPPort')) {
                obj['dbTCPPort'] = _ApiClient2['default'].convertToType(data['dbTCPPort'], 'String');
            }
            if (data.hasOwnProperty('dbTCPName')) {
                obj['dbTCPName'] = _ApiClient2['default'].convertToType(data['dbTCPName'], 'String');
            }
            if (data.hasOwnProperty('dbTCPUser')) {
                obj['dbTCPUser'] = _ApiClient2['default'].convertToType(data['dbTCPUser'], 'String');
            }
            if (data.hasOwnProperty('dbTCPPassword')) {
                obj['dbTCPPassword'] = _ApiClient2['default'].convertToType(data['dbTCPPassword'], 'String');
            }
            if (data.hasOwnProperty('dbSocketFile')) {
                obj['dbSocketFile'] = _ApiClient2['default'].convertToType(data['dbSocketFile'], 'String');
            }
            if (data.hasOwnProperty('dbSocketName')) {
                obj['dbSocketName'] = _ApiClient2['default'].convertToType(data['dbSocketName'], 'String');
            }
            if (data.hasOwnProperty('dbSocketUser')) {
                obj['dbSocketUser'] = _ApiClient2['default'].convertToType(data['dbSocketUser'], 'String');
            }
            if (data.hasOwnProperty('dbSocketPassword')) {
                obj['dbSocketPassword'] = _ApiClient2['default'].convertToType(data['dbSocketPassword'], 'String');
            }
            if (data.hasOwnProperty('dbManualDSN')) {
                obj['dbManualDSN'] = _ApiClient2['default'].convertToType(data['dbManualDSN'], 'String');
            }
            if (data.hasOwnProperty('dsName')) {
                obj['dsName'] = _ApiClient2['default'].convertToType(data['dsName'], 'String');
            }
            if (data.hasOwnProperty('dsPort')) {
                obj['dsPort'] = _ApiClient2['default'].convertToType(data['dsPort'], 'String');
            }
            if (data.hasOwnProperty('dsFolder')) {
                obj['dsFolder'] = _ApiClient2['default'].convertToType(data['dsFolder'], 'String');
            }
            if (data.hasOwnProperty('externalMicro')) {
                obj['externalMicro'] = _ApiClient2['default'].convertToType(data['externalMicro'], 'String');
            }
            if (data.hasOwnProperty('externalGateway')) {
                obj['externalGateway'] = _ApiClient2['default'].convertToType(data['externalGateway'], 'String');
            }
            if (data.hasOwnProperty('externalWebsocket')) {
                obj['externalWebsocket'] = _ApiClient2['default'].convertToType(data['externalWebsocket'], 'String');
            }
            if (data.hasOwnProperty('externalFrontPlugins')) {
                obj['externalFrontPlugins'] = _ApiClient2['default'].convertToType(data['externalFrontPlugins'], 'String');
            }
            if (data.hasOwnProperty('externalDAV')) {
                obj['externalDAV'] = _ApiClient2['default'].convertToType(data['externalDAV'], 'String');
            }
            if (data.hasOwnProperty('externalWOPI')) {
                obj['externalWOPI'] = _ApiClient2['default'].convertToType(data['externalWOPI'], 'String');
            }
            if (data.hasOwnProperty('externalDex')) {
                obj['externalDex'] = _ApiClient2['default'].convertToType(data['externalDex'], 'String');
            }
            if (data.hasOwnProperty('externalDexID')) {
                obj['externalDexID'] = _ApiClient2['default'].convertToType(data['externalDexID'], 'String');
            }
            if (data.hasOwnProperty('externalDexSecret')) {
                obj['externalDexSecret'] = _ApiClient2['default'].convertToType(data['externalDexSecret'], 'String');
            }
            if (data.hasOwnProperty('frontendHosts')) {
                obj['frontendHosts'] = _ApiClient2['default'].convertToType(data['frontendHosts'], 'String');
            }
            if (data.hasOwnProperty('frontendLogin')) {
                obj['frontendLogin'] = _ApiClient2['default'].convertToType(data['frontendLogin'], 'String');
            }
            if (data.hasOwnProperty('frontendPassword')) {
                obj['frontendPassword'] = _ApiClient2['default'].convertToType(data['frontendPassword'], 'String');
            }
            if (data.hasOwnProperty('frontendRepeatPassword')) {
                obj['frontendRepeatPassword'] = _ApiClient2['default'].convertToType(data['frontendRepeatPassword'], 'String');
            }
            if (data.hasOwnProperty('fpmAddress')) {
                obj['fpmAddress'] = _ApiClient2['default'].convertToType(data['fpmAddress'], 'String');
            }
            if (data.hasOwnProperty('licenseRequired')) {
                obj['licenseRequired'] = _ApiClient2['default'].convertToType(data['licenseRequired'], 'Boolean');
            }
            if (data.hasOwnProperty('licenseString')) {
                obj['licenseString'] = _ApiClient2['default'].convertToType(data['licenseString'], 'String');
            }
            if (data.hasOwnProperty('CheckResults')) {
                obj['CheckResults'] = _ApiClient2['default'].convertToType(data['CheckResults'], [_InstallCheckResult2['default']]);
            }
        }
        return obj;
    };

    /**
    * @member {String} internalUrl
    */
    return InstallInstallConfig;
})();

exports['default'] = InstallInstallConfig;
module.exports = exports['default'];

/**
* @member {String} dbConnectionType
*/

/**
* @member {String} dbTCPHostname
*/

/**
* @member {String} dbTCPPort
*/

/**
* @member {String} dbTCPName
*/

/**
* @member {String} dbTCPUser
*/

/**
* @member {String} dbTCPPassword
*/

/**
* @member {String} dbSocketFile
*/

/**
* @member {String} dbSocketName
*/

/**
* @member {String} dbSocketUser
*/

/**
* @member {String} dbSocketPassword
*/

/**
* @member {String} dbManualDSN
*/

/**
* @member {String} dsName
*/

/**
* @member {String} dsPort
*/

/**
* @member {String} dsFolder
*/

/**
* @member {String} externalMicro
*/

/**
* @member {String} externalGateway
*/

/**
* @member {String} externalWebsocket
*/

/**
* @member {String} externalFrontPlugins
*/

/**
* @member {String} externalDAV
*/

/**
* @member {String} externalWOPI
*/

/**
* @member {String} externalDex
*/

/**
* @member {String} externalDexID
*/

/**
* @member {String} externalDexSecret
*/

/**
* @member {String} frontendHosts
*/

/**
* @member {String} frontendLogin
*/

/**
* @member {String} frontendPassword
*/

/**
* @member {String} frontendRepeatPassword
*/

/**
* @member {String} fpmAddress
*/

/**
* @member {Boolean} licenseRequired
*/

/**
* @member {String} licenseString
*/

/**
* @member {Array.<module:model/InstallCheckResult>} CheckResults
*/
