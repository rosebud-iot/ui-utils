"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _every = _interopRequireDefault(require("lodash/every"));

var _isString = _interopRequireDefault(require("lodash/isString"));

var _isNumber = _interopRequireDefault(require("lodash/isNumber"));

var _map = _interopRequireDefault(require("lodash/map"));

var _assign = _interopRequireDefault(require("lodash/assign"));

var _at = _interopRequireDefault(require("lodash/at"));

// Individual imports (without IndexOf) for smaller file size.

/** Collection is a utility library that offers a set of static methods that
  * may help with straightening out iteratable data models in common ways.
  * You do not need to instantiate this class, but rather use it as follows.
    import Collection from 'path/to/file.ext'
    const newAry = Collection.keyify(myArray);
  */
exports.Collection = /*#__PURE__*/function () {
  function Collection() {
    (0, _classCallCheck2["default"])(this, Collection);
  }

  (0, _createClass2["default"])(Collection, null, [{
    key: "keyify",

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
    value: function keyify(ary, identifier) {
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
      }; // Sanitises input.


      if (!identifier && aryMissingIDs(ary)) return aryError();
      if (!identifier && aryIDsInvalid(ary)) return aryError();
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
    }
  }]);
  return Collection;
}();