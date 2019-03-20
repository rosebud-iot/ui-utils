/** withTokenCheckFactory
 * @desc A function that adds a token check to a generator function (returned)
 * @param {function} worker A generator function (worker).
 * @param {object} actions An object containing completed and failed actions to fire at appropriate times.
 * @param {object} functions An object containing redux-saga functions used in the returned generator.
 * @returns {function} Returns a generator function that is well prepared for using in redux-saga.
 * @example Redux-saga example:
   yield takeLatest(
     'FETCH_DATA_REQUESTED',
     withTokenCheckFactory(fetchData, {
       FAILED: 'FETCH_DATA_FAILED',
       COMPLETED: 'FETCH_DATA_COMPLETED'
     },
     { put, call })
   );
*/
export function withTokenCheckFactory(worker, { FAILED, COMPLETED }, { put, call }) {
  return function* withTokenCheck(...args) {
    try {
      yield call(worker, ...args);
    } catch (e) {
      if (e.code === 401) {
        yield put({ type: 'AUTHENTICATION_REFRESH_REQUESTED', ...e });
        // TODO:
        // Should save the call that resulted in 401 and attempt it again
        // after the token has been refreshed.
      } else {
        console.warn(FAILED, { ...e });
        yield put({ type: FAILED, ...e });
      }
    } finally {
      yield put({ type: COMPLETED, args });
    }
  };
}
