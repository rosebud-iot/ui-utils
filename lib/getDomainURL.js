"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDomainURL = exports["default"] = void 0;
var _getAPIDomain = _interopRequireDefault(require("./getAPIDomain"));
/**
 * getDomainURL
 * @since 2.4.5
 * @category URL
 * @description Creates the domain URL using a custom protocol.
 * @param {boolean} options.protocol - The protocol.
 * @param {Function} options.host - The URL host.
 * @param {number} options.prefix - The desired prefix for the domain URL.
 * @returns {string} Returns the domain URL.
 * @example
 * getAPIDomain({protocol: 'http', host: 'admin.sweepr.com', prefix: 'api'});
 * #=> 'http://api.sweepr.com'
 *
 * getAPIDomain({protocol: 'https', host: 'admin.sweepr.com', prefix: 'api'});
 * #=> 'https://api.sweepr.com'
 */
var getDomainURL = function getDomainURL(_ref) {
  var protocol = _ref.protocol,
    host = _ref.host,
    prefix = _ref.prefix,
    dev = _ref.dev;
  return "".concat(protocol, "://").concat((0, _getAPIDomain["default"])(host, prefix, dev));
};
exports.getDomainURL = getDomainURL;
var _default = getDomainURL;
exports["default"] = _default;