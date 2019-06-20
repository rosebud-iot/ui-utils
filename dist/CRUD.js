"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CRUD = exports.RequestError = void 0;

var _map = _interopRequireDefault(require("lodash/map"));

var _every = _interopRequireDefault(require("lodash/every"));

var _find = _interopRequireDefault(require("lodash/find"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var RequestError =
/*#__PURE__*/
function (_Error) {
  _inherits(RequestError, _Error);

  function RequestError(_ref) {
    var _this;

    var _ref$name = _ref.name,
        name = _ref$name === void 0 ? "XHR request error" : _ref$name,
        message = _ref.message,
        code = _ref.code,
        devMessage = _ref.devMessage;

    _classCallCheck(this, RequestError);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RequestError).call(this));
    _this.name = name;
    _this.message = message;
    _this.code = code;
    _this.devMessage = devMessage;
    return _this;
  }

  return RequestError;
}(_wrapNativeSuper(Error));

exports.RequestError = RequestError;

var CRUD =
/*#__PURE__*/
function () {
  function CRUD(_ref2) {
    var axiosInstance = _ref2.axiosInstance,
        sideEffects = _ref2.sideEffects;

    _classCallCheck(this, CRUD);

    this.axiosInstance = axiosInstance;
    this.sideEffects = sideEffects;
  }

  _createClass(CRUD, [{
    key: "create",
    value: function create(url, payload) {
      return this.xhr(url, payload, "POST");
    }
  }, {
    key: "read",
    value: function read(url) {
      return this.xhr(url, null, "GET");
    }
  }, {
    key: "update",
    value: function update(url, payload) {
      return this.xhr(url, payload, "PUT");
    }
  }, {
    key: "delete",
    value: function _delete(url) {
      return this.xhr(url, null, "DELETE");
    }
  }, {
    key: "xhr",
    value: function () {
      var _xhr = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(url, body, verb) {
        var _this2 = this;

        var conditionsResult, allConditionsMet, unmetCondition;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                conditionsResult = (0, _map["default"])(this.sideEffects.conditions, function (fn) {
                  return fn({
                    auth_token: _this2.axiosInstance.defaults.headers.common["Authorization"]
                  });
                });
                allConditionsMet = (0, _every["default"])(conditionsResult, function (res) {
                  return res.response;
                });

                if (allConditionsMet) {
                  _context.next = 5;
                  break;
                }

                unmetCondition = (0, _find["default"])(conditionsResult, function (r) {
                  return !r.response;
                });
                throw new Error("Condition unmet ".concat(unmetCondition.msg));

              case 5:
                return _context.abrupt("return", this.axiosInstance.request({
                  method: verb,
                  url: url,
                  data: body || null
                }).then(function (response) {
                  console.info("".concat(verb, ":"), response.request.status, "-> ".concat(response.request.responseURL));

                  switch (response.status) {
                    case 200: // OK

                    case 201: // Created

                    case 202: // Accepted

                    case 203: // Non-Authoritative Information

                    case 204:
                      // No content
                      return response.data;

                    default:
                      throw new RangeError("Unhandled response ".concat(response.status, ", not within accepted range"));
                  }
                })["catch"](function (error) {
                  if (error.response && error.response.data && error.request) {
                    throw new RequestError({
                      message: error.response.data.error,
                      devMessage: error.response.data.error_description,
                      code: error.request.status
                    });
                  } else {
                    console.warn("Request response format invalid (could not create readable error)", _objectSpread({}, error));
                  }
                }));

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function xhr(_x, _x2, _x3) {
        return _xhr.apply(this, arguments);
      }

      return xhr;
    }()
  }]);

  return CRUD;
}();

exports.CRUD = CRUD;