"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _every = _interopRequireDefault(require("lodash/every"));

var _isString = _interopRequireDefault(require("lodash/isString"));

var _pickBy = _interopRequireDefault(require("lodash/pickBy"));

var _assign = _interopRequireDefault(require("lodash/assign"));

/** String
 * The String utility offers methods to manipulate strings in convenient ways.
 * This utility class does not need to be instantiated.
 */
exports.String =
/*#__PURE__*/
function () {
  function _class() {
    (0, _classCallCheck2["default"])(this, _class);
  }

  (0, _createClass2["default"])(_class, null, [{
    key: "parameterize",

    /** parameterize
     * Parameterizes an object into a string suitable for URLs.
     * @param {object} obj The object to parameterize.
     * @param {string} queryString An existing query string to merge the parameterized obj with.
     * @returns {string} Returns the parameterized string.
     * @example
     *
     * parameterize({ page: 3, size: 12 });
     * #=> "page=3&size=12"
     *
     * parameterize({ page: 3, size: 12 }, "name=rick&dimension=C-137");
     * #=> "page=3&size=12&name=rick&dimension=C-137"
     *
     * parameterize({ page: 3, size: 12 }, "page=4&limit=20");
     * #=> "page=3&size=12&limit=20"
     */
    value: function parameterize(objPrimary) {
      var queryString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var params = "?",
          objSecondary = {};
      if (queryString) objSecondary = String.deParameterize(queryString);
      var obj = (0, _assign["default"])({}, objSecondary, objPrimary);

      for (var key in obj) {
        params.charAt(params.length - 1) === "?" ? params = params + key + "=" + obj[key] : params = params + "&" + key + "=" + obj[key];
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
      var ary = queryString.split("&");
      var paramObj = {};

      for (var keyPair in ary) {
        paramObj[ary[keyPair].split("=")[0]] = ary[keyPair].split("=")[1];
      }

      return paramObj;
    }
  }]);
  return _class;
}();