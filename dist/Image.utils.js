"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Image = void 0;

var _every = _interopRequireDefault(require("lodash/every"));

var _isString = _interopRequireDefault(require("lodash/isString"));

var _pickBy = _interopRequireDefault(require("lodash/pickBy"));

var _assign = _interopRequireDefault(require("lodash/assign"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/** Image
 * Image class offers methods useful for retrieving relevant
 * URIs to graphical assets managed by a CMS.
 * Instantiate with the correct profile (endpoints map for chosen environment)
 * @param {object} profile Map of endpoints that suits your environment.
 */
var Image =
/*#__PURE__*/
function () {
  function Image(profile) {
    _classCallCheck(this, Image);

    this.profile = profile;
    this.url = this.url.bind(this);
    this.parameterize = this.parameterize.bind(this);
    this.imageUrlBuilder = this.imageUrlBuilder.bind(this);
    this.service = this.service.bind(this);
    this.device = this.device.bind(this);
    this.imageURLWithParams = this.imageURLWithParams.bind(this);
  }
  /** url
   * @param {string} [path] Path to be appended to URL.
   * @returns {string} Returns image URL, based on CMS configuration.
   */


  _createClass(Image, [{
    key: "url",
    value: function url() {
      var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var o = this.profile;
      return o.protocol + '://' + o.domain + o.port + o[path];
    }
    /** parameterize, duplicated from API.utils
     * Parameterizes an object into a string suitable for URLs.
     * @param {object} obj The object to parameterize.
     * @returns {string} Returns the parameterized string.
     */

  }, {
    key: "parameterize",
    value: function parameterize(obj) {
      var params = '?';

      for (var key in obj) {
        params.charAt(params.length - 1) === '?' ? params = params + key + '=' + obj[key] : params = params + '&' + key + '=' + obj[key];
      }

      return params;
    }
    /** deParameterize
     * @param {string} queryString A string query to structure.
     * @example
     * deParameterize('category=music&artist=B.Dylan&instrument=guitar')
     * #=> { category: 'music', artist: 'B.Dylan', instrument: 'guitar' }
     * @returns {object} Returns the structured JS object.
     */

  }, {
    key: "deParameterize",
    value: function deParameterize(queryString) {
      var ary = queryString.split('&');
      var paramObj = {};

      for (var keyPair in ary) {
        paramObj[ary[keyPair].split('=')[0]] = ary[keyPair].split('=')[1];
      }

      return paramObj;
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
          throw new TypeError('Missing required params or wrong types');
        }

        var p = this.parameterize((0, _assign["default"])({
          domain: imageDomain
        }, stringParams));
        return "".concat(this.url('images')).concat(p).replace(/\s/gi, '-').toLowerCase();
      } catch (e) {
        console.warn(e);
      }
    }
    /** service
     * @param {object} params Service params used to fetch the corresponding image.
     * @returns {string} Returns URL to service image resource.
     */

  }, {
    key: "service",
    value: function service(params) {
      return this.imageUrlBuilder('service', 'category', params);
    }
    /** device
     * @param {object} params Device params used to fetch the corresponding image.
     * @returns {string} Returns URL to service image resource.
     */

  }, {
    key: "device",
    value: function device(params) {
      return this.imageUrlBuilder('device', 'manufacturer', params);
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
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'thumbnail';

      try {
        if (!paramsString || typeof paramsString !== 'string') {
          throw new TypeError('Missing URL paramsString, empty or not a string');
        }

        return "".concat(this.url('images'), "?").concat(paramsString, "&type=").concat(type);
      } catch (e) {
        console.warn(e);
      }
    }
  }]);

  return Image;
}();

exports.Image = Image;