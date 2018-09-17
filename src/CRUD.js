import map from 'lodash/map';
import every from 'lodash/every';
import find from 'lodash/find';

export class CRUD {
  constructor({ axiosInstance, sideEffects }) {
    this.axiosInstance = axiosInstance;
    this.sideEffects = sideEffects;
  }

  create(url, payload) {
    return this.xhr(url, payload, 'POST');
  }

  read(url) {
    return this.xhr(url, null, 'GET');
  }

  update(url, payload) {
    return this.xhr(url, payload, 'PUT');
  }

  delete(url) {
    return this.xhr(url, null, 'DELETE');
  }

  async xhr(url, body, verb) {
    // TODO: handle these checks in an interceptor instead.
    const auth = /\/register|\/login/gi.test(url);
    const conditionsResult = map(this.sideEffects.conditions, (fn) => {
      return fn({ auth, token: this.axiosInstance.defaults.headers.common['SWEEPR-TOKEN'] });
    });
    const allConditionsMet = every(conditionsResult, (res) => res.response);

    if(!allConditionsMet) {
      const unmetCondition = find(conditionsResult, ['response', false]);
      throw new Error(`Condition unmet ${unmetCondition.msg}`);
    }

    return this.axiosInstance.request({
      method: verb,
      url,
      data: body || null
    }).then((response) => {
      console.info(`${verb}:`, response.request.status, `-> ${response.request.responseURL}`);
      switch(response.status) {

        case 200: // OK
        case 201: // Created
        case 202: // Accepted
        case 203: // Non-Authoritative Information
        case 204: // No content
          return response.data;

        default:
          throw new RangeError(`Unhandled response ${response.status}, not within accepted range`);

      }
    }).catch((error) => {
      console.info(error);
      return error.response.data;
    });
  }
}
