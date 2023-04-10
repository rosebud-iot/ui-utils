"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
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
var getAPIDomain = function getAPIDomain(host, prefix) {
  var dev = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "mobile";
  if (/localhost/g.test(host)) return "".concat(prefix, ".").concat(dev, ".sweepr.com");
  var h = host.split(".");
  h.splice(0, 1);
  h = h.join(".");
  return "".concat(prefix, ".").concat(h);
};
var _default = getAPIDomain;
exports["default"] = _default;