"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CookieStorage = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var host = window.location.host;
/** CookieStorage
 * @description Utility library for using cookies both in development and prod.
 */

var CookieStorage =
/*#__PURE__*/
function () {
  function CookieStorage() {
    _classCallCheck(this, CookieStorage);
  }

  _createClass(CookieStorage, null, [{
    key: "setup",

    /**
     * setup
     * @description Prepares given cookies library for usage.
     * - Sets default path
     * - Sets default domain
     */
    value: function setup(cookies) {
      try {
        cookies.defaults = {
          path: '/',
          domain: this.domain
        };
      } catch (e) {
        console.warn('Cookie setup error', e);
      }
    }
    /**
     * domain
     * @returns {string} Returns current domain, usable when managing cookies.
     */

  }, {
    key: "domain",
    get: function get() {
      if (/localhost/g.test(host)) return 'localhost';
      return host;
    }
  }]);

  return CookieStorage;
}();

exports.CookieStorage = CookieStorage;