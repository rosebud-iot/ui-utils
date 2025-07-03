"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _toArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toArray"));
/**
 * getAPIDomain
 * @since 1.7.3
 * @category URL
 * @description Looks at the host and discards the first part and replaces it
 * with a given prefix. Special case for localhost.
 * @param {String} host
 * @param {String} prefix
 * @param {String} dev 'qa', 'mobile', 'dev' or any other environment.
 * @returns {string} Returns new string.
 * @example
 * getAPIDomain('admin.sweepr.com', 'api');
 * #=> 'api.sweepr.com'
 *
 * getAPIDomain('some-new.sub-domain.example.co.uk', 'cms');
 * #=> 'cms.sub-domain.example.co.uk'
 *
 * getAPIDomain('admin.dev-provider.sweepr.com', 'dev-api');
 * #=> 'dev-api.dev-provider.sweepr.com'
 *
 * getAPIDomain('localhost:3000', 'api', 'qa');
 * #=> 'api.qa.sweepr.com'
 */
var getAPIDomain = function getAPIDomain() {
  var host = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.location.host;
  var prefix = arguments.length > 1 ? arguments[1] : undefined;
  var dev = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "mobile";
  if (/localhost/g.test(host)) return "".concat(prefix, ".").concat(dev, ".sweepr.com");
  var _host$split = host.split("."),
    _host$split2 = (0, _toArray2["default"])(_host$split),
    segments = _host$split2.slice(1);
  return "".concat(prefix, ".").concat(segments.join("."));
};
var _default = exports["default"] = getAPIDomain;