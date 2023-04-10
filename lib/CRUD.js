"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var RequestError = /*#__PURE__*/function (_Error) {
  (0, _inherits2["default"])(RequestError, _Error);
  var _super = _createSuper(RequestError);
  function RequestError(_ref) {
    var _this;
    var _ref$name = _ref.name,
      name = _ref$name === void 0 ? "XHR request error" : _ref$name,
      error = _ref.error,
      message = _ref.message,
      data = _ref.data,
      status = _ref.status,
      headers = _ref.headers,
      request = _ref.request,
      config = _ref.config;
    (0, _classCallCheck2["default"])(this, RequestError);
    _this = _super.call(this);
    _this.name = name;
    _this.error = error;
    _this.message = message;
    _this.data = data;
    _this.status = status;
    _this.headers = headers;
    _this.request = request;
    _this.config = config;
    return _this;
  }
  return (0, _createClass2["default"])(RequestError);
}( /*#__PURE__*/(0, _wrapNativeSuper2["default"])(Error));
exports.RequestError = RequestError;
exports.CRUD = /*#__PURE__*/function () {
  function CRUD(_ref2) {
    var axiosInstance = _ref2.axiosInstance;
    (0, _classCallCheck2["default"])(this, CRUD);
    this.axiosInstance = axiosInstance;
  }
  (0, _createClass2["default"])(CRUD, [{
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
      var _xhr = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(url, body, verb) {
        var requestConfig,
          _args = arguments;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              requestConfig = _args.length > 3 && _args[3] !== undefined ? _args[3] : {};
              return _context.abrupt("return", this.axiosInstance.request(_objectSpread({
                method: verb,
                url: url,
                data: body || null
              }, requestConfig)).then(function (response) {
                switch (response.status) {
                  case 200: // OK
                  case 201: // Created
                  case 202: // Accepted
                  case 203: // Non-Authoritative Information
                  case 204:
                    // No content
                    // TODO: handle in interceptor instead
                    if (requestConfig.responseType === "blob") return response;
                    return response.data;
                  default:
                    throw new RangeError("Unhandled response ".concat(response.status, ", not within accepted range"));
                }
              })["catch"](function (error) {
                var config = {
                  data: error.data,
                  error: error.error
                };
                if (error.response) {
                  config = Object.assign(config, {
                    message: "Request error, server responded with a status code that falls out of range of 2xx (".concat(error.response.status, ")"),
                    data: error.response.data,
                    status: error.response.status,
                    headers: error.response.headers
                  });
                } else if (error.request) {
                  config = Object.assign(config, {
                    message: "Request error, no response was received",
                    request: error.request
                  });
                } else {
                  config = Object.assign(config, {
                    message: "Request error, error was triggered when setting up the request",
                    message2: error.message
                  });
                }
                var errResp = JSON.stringify(new RequestError(config));
                throw JSON.parse(errResp);
              }));
            case 2:
            case "end":
              return _context.stop();
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