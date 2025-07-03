"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
/**
 * Returns the type of the given object in lowercase.
 * @function
 * @param {any} obj - The object to check the type of.
 * @returns {string} - The type of the object in lowercase.
 */
var type = function type(obj) {
  if (typeof obj === 'function') return 'function';
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
};
var _default = exports["default"] = type;