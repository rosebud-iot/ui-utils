"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

/**
 * Converts a query string an object.
 *
 * @since 0.1.0
 * @category String
 * @param {string} queryString The string to convert.
 * @returns {object} Returns an object.
 * @example
 *
 * deParameterize('category=music&artist=B.Dylan&instrument=guitar')
 * #=> { category: 'music', artist: 'B.Dylan', instrument: 'guitar' }
 *
 * deParameterize('')
 * #=> {}
 *
 * deParameterize('?')
 * #=> {}
 */
var deParameterize = function deParameterize(queryString) {
  if ((0, _isEmpty["default"])(queryString) || queryString.length === 1 && queryString.charAt(0) === "?") {
    return {};
  }

  if (queryString && queryString.charAt(0) === "?") {
    queryString = queryString.substring(1);
  }

  var ary = queryString.split("&");
  var paramObj = {};

  for (var keyPair in ary) {
    paramObj[ary[keyPair].split("=")[0]] = ary[keyPair].split("=")[1];
  }

  return paramObj;
};

var _default = deParameterize;
exports["default"] = _default;