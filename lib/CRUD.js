"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var RequestError = /*#__PURE__*/function (_Error) {
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
    _this = _callSuper(this, RequestError);
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
  (0, _inherits2["default"])(RequestError, _Error);
  return (0, _createClass2["default"])(RequestError);
}(/*#__PURE__*/(0, _wrapNativeSuper2["default"])(Error));
exports.RequestError = RequestError;
exports.CRUD = /*#__PURE__*/function () {
  function CRUD(_ref2) {
    var axiosInstance = _ref2.axiosInstance;
    (0, _classCallCheck2["default"])(this, CRUD);
    this.axiosInstance = axiosInstance;
  }
  return (0, _createClass2["default"])(CRUD, [{
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
      var _xhr = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(url, body, verb) {
        var requestConfig,
          _args = arguments;
        return _regenerator["default"].wrap(function (_context) {
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
            case 1:
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
}();