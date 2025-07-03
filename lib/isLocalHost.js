"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
/**
 * Checks if the current window location is on localhost.
 * @returns {boolean} True if the window location is localhost, false otherwise.
 * @example
 * isLocalHost() /// true;
 */
var isLocalHost = function isLocalHost() {
  var host = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.location.host;
  return /localhost/g.test(host);
};
var _default = exports["default"] = isLocalHost;