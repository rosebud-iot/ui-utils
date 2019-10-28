"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _assign = _interopRequireDefault(require("lodash/assign"));

var _deParameterize = _interopRequireDefault(require("./deParameterize.js"));

/**
 * Converts an object to a parameter string, appropriate for URLs.
 *
 * @since 0.1.0
 * @category Object
 * @param {object} objPrimary The object to parameterize. If second argument is preset, this object will take precedence.
 * @param {string} [queryString=null] A query string to merge into the returned query string.
 * @returns {string} Returns the parameterized string.
 * @example
 *
 * parameterize({ page: 3, size: 12 });
 * #=> "?page=3&size=12"
 *
 * parameterize({ page: 3, size: 12 }, "name=rick&dimension=C-137");
 * #=> "?page=3&size=12&name=rick&dimension=C-137"
 *
 * parameterize({ page: 3, size: 12 }, "?name=rick&dimension=C-137");
 * #=> "?page=3&size=12&name=rick&dimension=C-137"
 *
 * parameterize({ page: 3, size: 12 }, "page=4&limit=20");
 * #=> "?page=3&size=12&limit=20"
 */
var parameterize = function parameterize(objPrimary) {
  var queryString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var params = "?",
      objSecondary = {};

  if (queryString) {
    if (queryString.charAt(0) === "?") queryString = queryString.substring(1);
    objSecondary = (0, _deParameterize["default"])(queryString);
  }

  var obj = (0, _assign["default"])({}, objSecondary, objPrimary);

  for (var key in obj) {
    params.charAt(params.length - 1) === "?" ? params = params + key + "=" + obj[key] : params = params + "&" + key + "=" + obj[key];
  }

  return params;
};

var _default = parameterize;
exports["default"] = _default;