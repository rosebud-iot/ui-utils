"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _every = _interopRequireDefault(require("lodash/every"));
var _isString = _interopRequireDefault(require("lodash/isString"));
var _pickBy = _interopRequireDefault(require("lodash/pickBy"));
var _assign = _interopRequireDefault(require("lodash/assign"));
var _parameterize = _interopRequireDefault(require("./parameterize"));
/** Utils
 * Utils class offers methods useful for retrieving relevant
 * URIs to graphical assets managed by a CMS.
 * Instantiate with the correct profile (endpoints map for chosen environment)
 * @param {object} profile Map of endpoints that suits your environment.
 */
exports.Utils = /*#__PURE__*/function () {
  function Utils(profile) {
    (0, _classCallCheck2["default"])(this, Utils);
    this.profile = profile;
    this.url = this.url.bind(this);
    this.imageUrlBuilder = this.imageUrlBuilder.bind(this);
    this.imageURLWithParams = this.imageURLWithParams.bind(this);
  }
  (0, _createClass2["default"])(Utils, [{
    key: "extend",
    value: function extend(profile) {
      if (!profile || (0, _typeof2["default"])(profile) !== "object") throw new TypeError("Expected profile to be an object");
      this.profile = Object.assign({}, this.profile, profile);
    }

    /** url
     * @param {string} [path] Path to be appended to URL.
     * @returns {string} Returns image URL, based on CMS configuration.
     */
  }, {
    key: "url",
    value: function url() {
      var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      var o = this.profile;
      return o.protocol + "://" + o.domain + o.port + o[path];
    }

    /** imageUrlBuilder
     * @param {string} imageDomain The domain that corresponds to devices or services.
     * @param {string} requiredParam Critical param required to have the possibility to
     * retrieve a default image from the CSM (devices->manufacturer, service->category).
     * @param {object} paramsObject Params object provided to the Image instance.
     * @returns {string} Returns image URL.
     */
  }, {
    key: "imageUrlBuilder",
    value: function imageUrlBuilder(imageDomain, requiredParam, paramsObject) {
      try {
        var stringParams = (0, _pickBy["default"])(paramsObject, _isString["default"]);
        if (!stringParams[requiredParam] && (0, _every["default"])(stringParams, _isString["default"])) {
          throw new TypeError("Missing required params or wrong types");
        }
        var p = (0, _parameterize["default"])((0, _assign["default"])({
          domain: imageDomain
        }, stringParams));
        return "".concat(this.url("images")).concat(p).replace(/\s/gi, "-").toLowerCase();
      } catch (e) {
        console.warn(e);
      }
    }

    /** imageURLWithParams
     * Retrieve both categories of images when the URL params string is already built.
     * @param {string} params string Image URL params string used to fetch the corresponding image.
     * @param {string} [type] Specifies the image type (thumbnail, square etc).
     * @returns {string} Returns URL to service image resource.
     */
  }, {
    key: "imageURLWithParams",
    value: function imageURLWithParams(paramsString) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "thumbnail";
      try {
        if (!paramsString || typeof paramsString !== "string") {
          throw new TypeError("Missing URL paramsString, empty or not a string");
        }
        return "".concat(this.url("images"), "?").concat(paramsString, "&type=").concat(type);
      } catch (e) {
        console.warn(e);
      }
    }
  }]);
  return Utils;
}();