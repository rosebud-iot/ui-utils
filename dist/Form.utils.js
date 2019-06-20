"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Validation = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Validation =
/*#__PURE__*/
function () {
  function Validation() {
    _classCallCheck(this, Validation);
  }

  _createClass(Validation, null, [{
    key: "required",

    /** required
      * @param {*} value The value to determine.
      * @returns {boolean} Returns true if given value had a proper value.
      */
    value: function required(value) {
      return value && value.trim() !== '' ? true : false;
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
      if (typeof value !== 'string') throw new TypeError('Expected a string');
      if (typeof minCharCount !== 'number') throw new TypeError('Expected a number');
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
      if (typeof value !== 'string') throw new TypeError('Expected a string');
      if (typeof maxCharCount !== 'number') throw new TypeError('Expected a number');
      return value && value.length <= maxCharCount ? true : false;
    }
  }]);

  return Validation;
}();

exports.Validation = Validation;