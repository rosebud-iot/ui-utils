import map from "lodash/map";
import every from "lodash/every";
import find from "lodash/find";

class RequestError extends Error {
  constructor({ name = "XHR request error", code, message }) {
    super();
    this.name = name;
    this.code = code;
    this.message = message;
  }
}

exports.RequestError = RequestError;

exports.CRUD = class CRUD {
  constructor({ axiosInstance, sideEffects }) {
    this.axiosInstance = axiosInstance;
    this.sideEffects = sideEffects;
  }

  create(url, payload) {
    return this.xhr(url, payload, "POST");
  }

  read(url) {
    return this.xhr(url, null, "GET");
  }

  update(url, payload) {
    return this.xhr(url, payload, "PUT");
  }

  delete(url) {
    return this.xhr(url, null, "DELETE");
  }

  async xhr(url, body, verb, requestConfig = {}) {
    const conditionsResult = map(this.sideEffects.conditions, fn => {
      return fn({
        auth_token: this.axiosInstance.defaults.headers.common["Authorization"]
      });
    });

    const allConditionsMet = every(conditionsResult, res => res.response);
    if (!allConditionsMet) {
      const unmetCondition = find(conditionsResult, r => !r.response);
      throw new Error(`Condition unmet ${unmetCondition.msg}`);
    }

    return this.axiosInstance
      .request({
        method: verb,
        url,
        data: body || null,
        ...requestConfig
      })
      .then(response => {
        console.info(
          `${verb}:`,
          response.request.status,
          `-> ${response.request.responseURL}`
        );
        switch (response.status) {
          case 200: // OK
          case 201: // Created
          case 202: // Accepted
          case 203: // Non-Authoritative Information
          case 204: // No content
            if (requestConfig.responseType === "blob") {
              return response;
            } else {
              return response.data;
            }

          default:
            throw new RangeError(
              `Unhandled response ${response.status}, not within accepted range`
            );
        }
      })
      .catch(error => {
        if (error.response && error.response.data) {
          throw new RequestError({
            code: error.response.data.code,
            message: error.response.data.message
          });
        } else {
          console.warn("Error format invalid", { ...error });
          throw new RequestError({
            code: error.request.status,
            message: "Failed request"
          });
        }
      });
  }
};
