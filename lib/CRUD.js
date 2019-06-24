"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

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

var RequestError =
/*#__PURE__*/
function (_Error) {
  (0, _inherits2["default"])(RequestError, _Error);

  function RequestError(_ref) {
    var _this;

    var _ref$name = _ref.name,
        name = _ref$name === void 0 ? "XHR request error" : _ref$name,
        message = _ref.message,
        code = _ref.code,
        devMessage = _ref.devMessage;
    (0, _classCallCheck2["default"])(this, RequestError);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(RequestError).call(this));
    _this.name = name;
    _this.message = message;
    _this.code = code;
    _this.devMessage = devMessage;
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

        var conditionsResult, allConditionsMet, unmetCondition;
        return _regenerator["default"].wrap(function _callee$(_context) {
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
                    console.warn("Request response format invalid (could not create readable error)", (0, _objectSpread2["default"])({}, error));
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