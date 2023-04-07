"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _parameterize = _interopRequireDefault(require("./parameterize"));

/** Utils
 * Utils class offers a set of methods to prepare various data
 * that you'd need when performing API calls.
 * Instantiate with the correct profile (endpoints map for chosen environment)
 * @param {object} profile Map of endpoints that suits your environment.
 */
exports.Utils = /*#__PURE__*/function () {
  function Utils(profile) {
    (0, _classCallCheck2["default"])(this, Utils);
    if (!profile || (0, _typeof2["default"])(profile) !== "object") throw new TypeError("Expected profile to be an object");
    this.profile = profile;
    this.extend = this.extend.bind(this);
    this.URIBuilder = this.URIBuilder.bind(this);
    this.getURL = this.getURL.bind(this);
  }

  (0, _createClass2["default"])(Utils, [{
    key: "extend",
    value: function extend(profile) {
      if (!profile || (0, _typeof2["default"])(profile) !== "object") throw new TypeError("Expected profile to be an object");
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
      if (typeof resource !== "string" || (0, _typeof2["default"])(config) !== "object") {
        throw new TypeError("Invalid parameters");
      }

      var o = Object.assign({}, this.profile, config);
      return o.protocol + "://" + o.domain + o.port + o[resource];
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
        throw ReferenceError("Missing resource");
      }

      var path = addendum.path ? addendum.path : "";
      var params = addendum.params ? (0, _parameterize["default"])(addendum.params) : "";
      var config = addendum.config || {};
      return this.URIBuilder(resource, config) + path + params;
    }
  }]);
  return Utils;
}();