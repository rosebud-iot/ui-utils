"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.API = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/** API
 * API class offers a set of methods to prepare various data
 * that you'd need when performing API calls.
 * Instantiate with the correct profile (endpoints map for chosen environment)
 * @param {object} profile Map of endpoints that suits your environment.
 */
var API =
/*#__PURE__*/
function () {
  function API(profile) {
    _classCallCheck(this, API);

    if (!profile || _typeof(profile) !== 'object') throw new TypeError('Expected profile to be an object');
    this.profile = profile;
    this.extend = this.extend.bind(this);
    this.URIBuilder = this.URIBuilder.bind(this);
    this.tokenStillValid = this.tokenStillValid.bind(this);
    this.getURL = this.getURL.bind(this);
  }

  _createClass(API, [{
    key: "extend",
    value: function extend(profile) {
      if (!profile || _typeof(profile) !== 'object') throw new TypeError('Expected profile to be an object');
      this.profile = Object.assign({}, this.profile, profile);
    }
    /** URIBuilder
     * Builds up a URL based on path and config.
     * @param {string} resource Resource to request in call.
     * @param {object} config Configuration object to enable overriding.
     * @returns {string} Returns a URL.
     */

  }, {
    key: "URIBuilder",
    value: function URIBuilder(resource, config) {
      if (typeof resource !== 'string' || _typeof(config) !== 'object') {
        throw new TypeError('Invalid parameters');
      }

      var o = Object.assign({}, this.profile, config);
      return o.protocol + '://' + o.domain + o.port + o[resource];
    }
    /** parseToken
     * Decodes token string from base64.
     * @param {string} token The token to decode.
     * @returns {object} Returns JSON.
     */

  }, {
    key: "parseToken",
    value: function parseToken(token) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(window.atob(base64));
    }
    /** tokenStillValid
     * Determines whether a token is valid.
     * @param {string} string Token to evaluate.
     * @returns {boolean} Returns boolean, token is valid or not.
     */

  }, {
    key: "tokenStillValid",
    value: function tokenStillValid(token) {
      if (!token) return;

      var _this$parseToken = this.parseToken(token),
          exp = _this$parseToken.exp;

      return exp * 1000 - Date.now() > 0;
    }
    /** parameterize
     * Parameterizes an object into a string suitable for URLs.
     * @description Creates a URL parameter string based on given object.
     * If a value in the object is 'undefined', the =value will be omitted.
     * @param {object} obj The object to parameterize.
     * @returns {string} Returns the parameterized string.
     * @example
     * parameterize({ name: 'Tyler', age: '15', musician: 'undefined' });
     * #=> '?name=Tyler&age=15&musician'
     */

  }, {
    key: "parameterize",
    value: function parameterize(obj) {
      var prms = '?';

      for (var key in obj) {
        if (prms.charAt(prms.length - 1) === '?') {
          prms = obj[key] === 'undefined' ? prms + key : prms + key + '=' + obj[key];
        } else {
          prms = obj[key] === 'undefined' ? prms + '&' + key : prms + '&' + key + '=' + obj[key];
        }
      }

      return prms;
    }
    /** getURL
     * @param {string} resource The resource to request from API.
     * @param {object} [addendum] Configure the output in various ways.
     * @returns {string} Returns a URL based on input.
     * @example
     *
     * getURL('login')
     * // => 'https://bracelet-factory.com/login'
     *
     * getURL('bracelets', { path: '/green' })
     * // => 'https://bracelet-factory.com/bracelets/green'
     *
     * getURL('bracelets', { config: { protocol: 'ftp' } })
     * // => 'ftp://bracelet-factory.com/bracelets'
     */

  }, {
    key: "getURL",
    value: function getURL(resource) {
      var addendum = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!resource) {
        throw ReferenceError('Missing resource');
      }

      var path = addendum.path ? addendum.path : '';
      var params = addendum.params ? this.parameterize(addendum.params) : '';
      var config = addendum.config || {};
      return this.URIBuilder(resource, config) + path + params;
    }
  }]);

  return API;
}();

exports.API = API;