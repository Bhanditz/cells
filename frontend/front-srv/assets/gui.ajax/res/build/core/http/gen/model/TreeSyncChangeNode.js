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

/**
* The TreeSyncChangeNode model module.
* @module model/TreeSyncChangeNode
* @version 1.0
*/

var TreeSyncChangeNode = (function () {
    /**
    * Constructs a new <code>TreeSyncChangeNode</code>.
    * @alias module:model/TreeSyncChangeNode
    * @class
    */

    function TreeSyncChangeNode() {
        _classCallCheck(this, TreeSyncChangeNode);

        this.bytesize = undefined;
        this.md5 = undefined;
        this.mtime = undefined;
        this.nodePath = undefined;
        this.repositoryIdentifier = undefined;
    }

    /**
    * Constructs a <code>TreeSyncChangeNode</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:model/TreeSyncChangeNode} obj Optional instance to populate.
    * @return {module:model/TreeSyncChangeNode} The populated <code>TreeSyncChangeNode</code> instance.
    */

    TreeSyncChangeNode.constructFromObject = function constructFromObject(data, obj) {
        if (data) {
            obj = obj || new TreeSyncChangeNode();

            if (data.hasOwnProperty('bytesize')) {
                obj['bytesize'] = _ApiClient2['default'].convertToType(data['bytesize'], 'String');
            }
            if (data.hasOwnProperty('md5')) {
                obj['md5'] = _ApiClient2['default'].convertToType(data['md5'], 'String');
            }
            if (data.hasOwnProperty('mtime')) {
                obj['mtime'] = _ApiClient2['default'].convertToType(data['mtime'], 'String');
            }
            if (data.hasOwnProperty('nodePath')) {
                obj['nodePath'] = _ApiClient2['default'].convertToType(data['nodePath'], 'String');
            }
            if (data.hasOwnProperty('repositoryIdentifier')) {
                obj['repositoryIdentifier'] = _ApiClient2['default'].convertToType(data['repositoryIdentifier'], 'String');
            }
        }
        return obj;
    };

    /**
    * @member {String} bytesize
    */
    return TreeSyncChangeNode;
})();

exports['default'] = TreeSyncChangeNode;
module.exports = exports['default'];

/**
* @member {String} md5
*/

/**
* @member {String} mtime
*/

/**
* @member {String} nodePath
*/

/**
* @member {String} repositoryIdentifier
*/
