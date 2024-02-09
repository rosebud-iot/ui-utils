"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
/**
 * Sets the host property of the window.location object.
 * @param {string} [host='localhost'] - The host value to set. Defaults to 'localhost'.
 * @returns {void}
 * @example
 * setLocationHost('sweepr.com');
 */
var setLocationHost = function setLocationHost() {
  var host = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "localhost";
  Object.defineProperty(window, "location", {
    value: {
      host: host
    },
    writable: true
  });
};
var _default = setLocationHost;
exports["default"] = _default;