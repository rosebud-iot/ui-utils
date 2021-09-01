"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.escapeCharacters = exports.escChars = void 0;

var _map = _interopRequireDefault(require("lodash/map"));

var _isArray = _interopRequireDefault(require("lodash/isArray"));

var _isObject = _interopRequireDefault(require("lodash/isObject"));

var _isString = _interopRequireDefault(require("lodash/isString"));

var _forOwn = _interopRequireDefault(require("lodash/forOwn"));

var _isFunction = _interopRequireDefault(require("lodash/isFunction"));

/**
 * @descr Takes a string and returns a new escaped string.
 *        Escaped characters are (&apos;): ´`'
 * @param {string} string The string to escape.
 * @return {string} The escaped string.
 * @example
 * escChars('Thomas O'Malley');
 * #=> 'Thomas O&apos;Malley'
 *
 * escChars("They'd tell me: ´This is for you!´");
 * #=> "They&apos;d tell me: &apos;This is for you!&apos;"
 */
var escChars = function escChars(str, reverse) {
  return reverse ? String(str).replace(/&apos;/g, "'") : String(str).replace(/[`'´]/g, '&apos;');
};
/**
 * @descr Takes an object, an array or a string and returns a version where each string value is escaped.
 * @param {object|array|string} val The object/array/string to travers and escape.
 * @return {object|array|string} A new object/array/string with escaped values.
 * @example
 *
 * escapeCharacters({ name: 'Thomas O'Malley', friends: ['John O'Reiley', 'Jack's Farm'] });
 * #=> { name: 'Thomas O&apos;Malley', friends: ['John O&apos;Reiley', 'Jack&apos;s Farm'] }
 *
 * escapeCharacters(['Thomas O'Malley', { name: 'Thomas O'Malley' }]);
 * #=> ['Thomas O&apos;Malley', { name: 'Thomas O&apos;Malley' }]
 *
 * escapeCharacters('Thomas O'Malley');
 * #=> 'Thomas O&apos;Malley'
 */


exports.escChars = escChars;

var escapeCharacters = function escapeCharacters(val, reverse) {
  if ((0, _isFunction["default"])(val) || !(0, _isObject["default"])(val) && !(0, _isString["default"])(val)) {
    //console.warn('Unsupported data structure (escapeCharacters)');
    return undefined;
  }

  var escAry = function escAry(a) {
    return (0, _map["default"])(a, function (itm) {
      return (0, _isArray["default"])(itm) ? escAry(itm) : (0, _isObject["default"])(itm) ? escObj(itm) : (0, _isString["default"])(itm) ? escChars(itm, reverse) : itm;
    });
  };

  var escObj = function escObj(o) {
    var _o = {};
    (0, _forOwn["default"])(o, function (v, k) {
      _o[k] = (0, _isArray["default"])(v) ? escAry(v) : (0, _isObject["default"])(v) ? escObj(v) : (0, _isString["default"])(v) ? escChars(v, reverse) : v;
    });
    return _o;
  };

  return (0, _isArray["default"])(val) ? escAry(val) : (0, _isObject["default"])(val) ? escObj(val) : (0, _isString["default"])(val) ? escChars(val, reverse) : val;
};

exports.escapeCharacters = escapeCharacters;
var _default = escapeCharacters;
exports["default"] = _default;