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

exports.RequestHandler = function RequestHandler(
  worker,
  { FAILED, COMPLETED },
  { call, put, delay }
) {
  // The amount of times we try a request before abandoning it.
  const maxAttempts = 3;
  // The amount of time we wait between retries.
  const waitFor = 3000;

  const handler = function*(attemptsLeft, ...args) {
    try {
      attemptsLeft--;
      yield call(worker, ...args);
    } catch (e) {
      if (e.code === 401) {
        // First time we perform a request that results in 401 -> request a new auth token
        if (attemptsLeft + 1 === maxAttempts) {
          yield put({ type: "AUTHENTICATION_REFRESH_REQUESTED", ...e });
        }

        // Try request again after a delay.
        // This time we might have a valid token.
        if (attemptsLeft > 0) {
          yield delay(waitFor);
          yield handler(attemptsLeft, ...args);
        } else {
          yield put({
            type: "REPEATED_REQUEST_ATTEMPTS_FAILED",
            message: `Error retrieving data (${maxAttempts} attempts). This can most likely be resolved by logging in again.`
          });
        }
      } else {
        console.warn(FAILED, { ...e });
        yield put({ type: FAILED, ...e });
      }
    } finally {
      yield put({ type: COMPLETED, args });
    }
  };

  // Returns a generator function for watcher sagas to consume.
  return function*(...args) {
    yield handler(maxAttempts, ...args);
  };
};
