"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var host = window.location.host;

/** CookieStorage
 * @description Utility library for using cookies both in development and prod.
 */
exports.CookieStorage = /*#__PURE__*/function () {
  function CookieStorage() {
    (0, _classCallCheck2["default"])(this, CookieStorage);
  }
  (0, _createClass2["default"])(CookieStorage, null, [{
    key: "setup",
    value:
    /**
     * setup
     * @description Prepares given cookies library for usage.
     * - Sets default path
     * - Sets default domain
     */
    function setup(cookies) {
      try {
        cookies.defaults = {
          path: "/",
          domain: this.domain
        };
      } catch (e) {
        console.warn("Cookie setup error", e);
      }
    }

    /**
     * domain
     * @returns {string} Returns current domain, usable when managing cookies.
     */
  }, {
    key: "domain",
    get: function get() {
      if (/localhost/g.test(host)) return "localhost";
      return host;
    }
  }]);
  return CookieStorage;
}();