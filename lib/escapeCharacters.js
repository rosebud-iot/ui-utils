"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.escapeCharacters = exports.escChars = exports["default"] = void 0;
var _map = _interopRequireDefault(require("lodash/map"));
var _isArray = _interopRequireDefault(require("lodash/isArray"));
var _isObject = _interopRequireDefault(require("lodash/isObject"));
var _isString = _interopRequireDefault(require("lodash/isString"));
var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));
var _forOwn = _interopRequireDefault(require("lodash/forOwn"));
var _isFunction = _interopRequireDefault(require("lodash/isFunction"));
var _some = _interopRequireDefault(require("lodash/some"));
/**
 * Escapes apostrophies in a string, alternatively reverses the escape.
 * Escaped characters are (&apos;): ´`'
 * @func escChars
 * @param {string} string - The string to escape.
 * @param {boolean} reverse - Whether or not to reverse escaping.
 * @return {string} - The adjusted string.
 * @example
 * escChars('Thomas O'Malley');
 * #=> 'Thomas O&apos;Malley'
 *
 * escChars('Thomas O&apos;Malley', true);
 * #=> 'Thomas O'Malley'
 *
 * escChars("They'd tell me: ´This is for you!´");
 * #=> "They&apos;d tell me: &apos;This is for you!&apos;"
 */
var escChars = function escChars(str) {
  var reverse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return reverse ? String(str).replace(/&apos;/g, "'") : String(str).replace(/[`'´]/g, '&apos;');
};

/**
 * Takes an object, an array or a string and returns a version where each string value is escaped.
 * @func escapeCharacters
 * @param {object|array|string} val - The object/array/string to travers and escape.
 * @param {boolean} reverse - Whether or not to reverse escaping.
 * @param {array} exclude - An array of strings, the name of fields to leave unchanged.
 * @returns {object|array|string} A new object/array/string with (un/)escaped values at given fields.
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
 *
 * escapeCharacters({ username: "Laurel O'Sullivan", password: "e3m@PmgA'mLrY9Ds8" }, false, ['password']);
 * #=> { username: "Laurel O&apos;Sullivan", password: "e3m@PmgA'mLrY9Ds8" }
 *
 * escapeCharacters({ username: "Laurel O&apos;Sullivan", password: "e3m@PmgA'mLrY9Ds8" }, true, ['password']);
 * #=> { username: "Laurel O'Sullivan", password: "e3m@PmgA'mLrY9Ds8" }
 */
exports.escChars = escChars;
var escapeCharacters = function escapeCharacters(val) {
  var reverse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var exclude = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  if ((0, _isFunction["default"])(val) || !(0, _isObject["default"])(val) && !(0, _isString["default"])(val)) {
    return undefined;
  }
  var escAry = function escAry(a) {
    return (0, _map["default"])(a, function (itm) {
      return (0, _isArray["default"])(itm) ? escAry(itm) : (0, _isObject["default"])(itm) ? escObj(itm) : (0, _isString["default"])(itm) ? escChars(itm, reverse) : itm;
    });
  };
  var escObj = function escObj(o) {
    return (0, _isEmpty["default"])(o) ? o : function () {
      var _o = {};
      (0, _forOwn["default"])(o, function (v, k) {
        _o[k] = (0, _some["default"])(exclude, function (field) {
          return field === k;
        }) ? v : (0, _isArray["default"])(v) ? escAry(v) : v instanceof Date ? new Date(v) : (0, _isObject["default"])(v) ? escObj(v) : (0, _isString["default"])(v) ? escChars(v, reverse) : v;
      });
      return _o;
    }();
  };
  return (0, _isArray["default"])(val) ? escAry(val) : (0, _isObject["default"])(val) ? escObj(val) : (0, _isString["default"])(val) ? escChars(val, reverse) : val;
};
exports.escapeCharacters = escapeCharacters;
var _default = escapeCharacters;
exports["default"] = _default;