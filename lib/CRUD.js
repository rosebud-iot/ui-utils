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

var _map = _interopRequireDefault(require("lodash/map"));

var _every = _interopRequireDefault(require("lodash/every"));

var _find = _interopRequireDefault(require("lodash/find"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var RequestError =
/*#__PURE__*/
function (_Error) {
  (0, _inherits2["default"])(RequestError, _Error);

  function RequestError(_ref) {
    var _this;

    var _ref$name = _ref.name,
        name = _ref$name === void 0 ? "XHR request error" : _ref$name,
        error = _ref.error,
        error_description = _ref.error_description,
        code = _ref.code,
        message = _ref.message,
        status = _ref.status;
    (0, _classCallCheck2["default"])(this, RequestError);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(RequestError).call(this));
    _this.name = name;
    _this.error = error;
    _this.error_description = error_description;
    _this.code = code;
    _this.message = message;
    _this.status = status;
    return _this;
  }

  return RequestError;
}((0, _wrapNativeSuper2["default"])(Error));

exports.RequestError = RequestError;

exports.CRUD =
/*#__PURE__*/
function () {
  function CRUD(_ref2) {
    var axiosInstance = _ref2.axiosInstance,
        sideEffects = _ref2.sideEffects;
    (0, _classCallCheck2["default"])(this, CRUD);
    this.axiosInstance = axiosInstance;
    this.sideEffects = sideEffects;
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
      var _xhr = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(url, body, verb) {
        var _this2 = this;

        var requestConfig,
            conditionsResult,
            allConditionsMet,
            unmetCondition,
            _args = arguments;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                requestConfig = _args.length > 3 && _args[3] !== undefined ? _args[3] : {};
                conditionsResult = (0, _map["default"])(this.sideEffects.conditions, function (fn) {
                  return fn({
                    auth_token: _this2.axiosInstance.defaults.headers.common["Authorization"]
                  });
                });
                allConditionsMet = (0, _every["default"])(conditionsResult, function (res) {
                  return res.response;
                });

                if (allConditionsMet) {
                  _context.next = 6;
                  break;
                }

                unmetCondition = (0, _find["default"])(conditionsResult, function (r) {
                  return !r.response;
                });
                throw new Error("Condition unmet ".concat(unmetCondition.msg));

              case 6:
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
                      if (requestConfig.responseType === "blob") {
                        return response;
                      } else {
                        return response.data;
                      }

                    default:
                      throw new RangeError("Unhandled response ".concat(response.status, ", not within accepted range"));
                  }
                })["catch"](function (error) {
                  var _error = error.response && error.response.data && error.response.data.error ? error.response.data.error : null;

                  var error_description = error.response && error.response.data && error.response.data.error_description ? error.response.data.error_description : null;
                  var code = error.response && error.response.data && error.response.data.code ? error.response.data.code : null;
                  var message = error.response && error.response.data && error.response.data.message ? error.response.data.message : null;
                  var status = error.response && error.response.status ? error.response.status : null;
                  throw new RequestError({
                    error: _error,
                    error_description: error_description,
                    code: code,
                    message: message,
                    status: status
                  });
                }));

              case 7:
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