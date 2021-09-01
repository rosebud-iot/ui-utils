"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

exports.Validation = /*#__PURE__*/function () {
  function Validation() {
    (0, _classCallCheck2["default"])(this, Validation);
  }

  (0, _createClass2["default"])(Validation, null, [{
    key: "required",

    /** required
     * @param {*} value The value to determine.
     * @returns {boolean} Returns true if given value had a proper value.
     */
    value: function required(value) {
      return value && value.trim() !== "" ? true : false;
    }
    /** minChar
     * @param {string} value The string to check character length of.
     * @param {number} minCharCount The minimum character count that value is required to have for this method to return true. Defaults to 2.
     * @returns {boolean} Returns true if value.length was at least minCharCount.
     */

  }, {
    key: "minChar",
    value: function minChar(value) {
      var minCharCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
      if (typeof value !== "string") throw new TypeError("Expected a string");
      if (typeof minCharCount !== "number") throw new TypeError("Expected a number");
      return value && value.length >= minCharCount ? true : false;
    }
    /** maxChar
     * @param {string} value The string to check character length of.
     * @param {number} maxCharCount The maximum character count allowed of value. Defaults to 100.
     * @returns {boolean} Returns true if value.length did not exceed maxCharCount.
     */

  }, {
    key: "maxChar",
    value: function maxChar(value) {
      var maxCharCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
      if (typeof value !== "string") throw new TypeError("Expected a string");
      if (typeof maxCharCount !== "number") throw new TypeError("Expected a number");
      return value && value.length <= maxCharCount ? true : false;
    }
  }]);
  return Validation;
}();