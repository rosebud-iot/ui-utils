"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestHandler = requestHandler;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** requestHandler
 * @desc A function that adds a token check to a generator function (returned)
 * @param {function} worker A generator function (worker).
 * @param {object} actions An object containing completed and failed actions to fire at appropriate times.
 * @param {object} functions An object containing redux-saga functions used in the returned generator.
 * @returns {function*} Returns a generator function that is well prepared for using in redux-saga.
 * @example Redux-saga example:
   yield takeLatest(
     'FETCH_DATA_REQUESTED',
     requestHandler(fetchData, {
       FAILED: 'FETCH_DATA_FAILED',
       COMPLETED: 'FETCH_DATA_COMPLETED'
     },
     { put, call, delay })
   );
*/
function requestHandler(worker, _ref, _ref2) {
  var FAILED = _ref.FAILED,
      COMPLETED = _ref.COMPLETED;
  var call = _ref2.call,
      put = _ref2.put,
      delay = _ref2.delay;
  // The amount of times we try a request before abandoning it.
  var maxAttempts = 3; // The amount of time we wait between retries.

  var waitFor = 3000;
  var handler =
  /*#__PURE__*/
  regeneratorRuntime.mark(function handler(attemptsLeft) {
    var _len,
        args,
        _key,
        _args = arguments;

    return regeneratorRuntime.wrap(function handler$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            for (_len = _args.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              args[_key - 1] = _args[_key];
            }

            _context.prev = 1;
            attemptsLeft--;
            _context.next = 5;
            return call.apply(void 0, [worker].concat(args));

          case 5:
            _context.next = 27;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](1);

            if (!(_context.t0.code === 401)) {
              _context.next = 24;
              break;
            }

            if (!(attemptsLeft + 1 === maxAttempts)) {
              _context.next = 13;
              break;
            }

            _context.next = 13;
            return put(_objectSpread({
              type: 'AUTHENTICATION_REFRESH_REQUESTED'
            }, _context.t0));

          case 13:
            if (!(attemptsLeft > 0)) {
              _context.next = 20;
              break;
            }

            _context.next = 16;
            return delay(waitFor);

          case 16:
            _context.next = 18;
            return handler.apply(void 0, [attemptsLeft].concat(args));

          case 18:
            _context.next = 22;
            break;

          case 20:
            _context.next = 22;
            return put({
              type: 'REPEATED_REQUEST_ATTEMPTS_FAILED',
              message: "Error retrieving data (".concat(maxAttempts, " attempts). This can most likely be resolved by logging in again.")
            });

          case 22:
            _context.next = 27;
            break;

          case 24:
            console.warn(FAILED, _objectSpread({}, _context.t0));
            _context.next = 27;
            return put(_objectSpread({
              type: FAILED
            }, _context.t0));

          case 27:
            _context.prev = 27;
            _context.next = 30;
            return put({
              type: COMPLETED,
              args: args
            });

          case 30:
            return _context.finish(27);

          case 31:
          case "end":
            return _context.stop();
        }
      }
    }, handler, null, [[1, 7, 27, 31]]);
  }); // Returns a generator function for watcher sagas to consume.

  return (
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var _len2,
          args,
          _key2,
          _args2 = arguments;

      return regeneratorRuntime.wrap(function _callee$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              for (_len2 = _args2.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = _args2[_key2];
              }

              _context2.next = 3;
              return handler.apply(void 0, [maxAttempts].concat(args));

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee);
    })
  );
}