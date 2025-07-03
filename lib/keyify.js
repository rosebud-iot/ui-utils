"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _every = _interopRequireDefault(require("lodash/every"));
var _isString = _interopRequireDefault(require("lodash/isString"));
var _isNumber = _interopRequireDefault(require("lodash/isNumber"));
var _map = _interopRequireDefault(require("lodash/map"));
var _assign = _interopRequireDefault(require("lodash/assign"));
var _at = _interopRequireDefault(require("lodash/at"));
/** Keyify
 * Iterates through an array with IDs, adds a new property 'key' to each item.
 * Each item in ary must be an object.
 * Each item object in ary must have ID property or an identifier path or string.
 * ID value must be appendable to a String (string, number etc.)
 * @param {array} ary Array of objects to keyify.
 * @param {string} [identifier] Path to identifier.
 * @returns {array} New array with 'key' fields.
 * @example
 *
 * const a = [{ id: 1, name: 'Summer' }, { id: 2, name: 'Snuffles' }];
 * keyify(a)
 * // => [{ id: 1, name: 'Summer', key: 'key-1' }, { id: 2, name: 'Snuffles', key: 'key-2' }]
 *
 * const a = [{ data: { n: 192 } }, { data: { n: b290 } }];
 * keyify(a, 'data.n')
 * // => [{ data: { n: 192 }, key: 'key-192' }, { data: { n: b290 }, key: 'key-b290' }]
 */

var keyify = function keyify(ary, identifier) {
  var aryMissingIDs = function aryMissingIDs(ary) {
    return !(0, _every["default"])(ary, function (item) {
      return item.id;
    });
  };
  var aryIDsInvalid = function aryIDsInvalid(ary) {
    return !(0, _every["default"])(ary, function (item) {
      return (0, _isString["default"])(item.id) || (0, _isNumber["default"])(item.id);
    });
  };
  var aryError = function aryError() {
    console.warn("keyify: Missing or invalid ID or identifier attribute in Array items", ary);
    return ary;
  };

  // Sanitises input.
  if (!identifier && aryMissingIDs(ary) || !identifier && aryIDsInvalid(ary)) return aryError();
  identifier = identifier ? identifier : "id";
  return (0, _map["default"])(ary, function (item) {
    switch ((0, _typeof2["default"])(identifier)) {
      case "string":
        return identifier === "id" ? (0, _assign["default"])({}, item, {
          key: "key-".concat(item[identifier])
        }) : (0, _assign["default"])({}, item, {
          key: "key-".concat((0, _at["default"])(item, identifier)[0])
        });
      default:
        aryError();
    }
  });
};
var _default = exports["default"] = keyify;