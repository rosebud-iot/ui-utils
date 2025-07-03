"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _type = _interopRequireDefault(require("./type"));
/**
 * Throws an error explaining that received type is not in the list of white-listed types.
 * @function
 * @param {[]} typesWhiteList - An array of white-listed types.
 * @param {any} received - The received value to check against the white-listed types.
 * @throws {Error} - A generic custom Error explaining expected and received types.
 */

var typeErrorHandler = function typeErrorHandler(typesWhiteList, received) {
  throw new Error("Invalid type. Expected ".concat(typesWhiteList.join(' or '), " but received ").concat((0, _type["default"])(received)));
};
var _default = exports["default"] = typeErrorHandler;