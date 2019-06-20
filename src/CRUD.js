import map from "lodash/map";
import every from "lodash/every";
import find from "lodash/find";

export class RequestError extends Error {
  constructor({ name = "XHR request error", message, code, devMessage }) {
    super();
    this.name = name;
    this.message = message;
    this.code = code;
    this.devMessage = devMessage;
  }
}

export class CRUD {
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

  async xhr(url, body, verb) {
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
        data: body || null
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
            return response.data;

          default:
            throw new RangeError(
              `Unhandled response ${response.status}, not within accepted range`
            );
        }
      })
      .catch(error => {
        if (error.response && error.response.data && error.request) {
          throw new RequestError({
            message: error.response.data.error,
            devMessage: error.response.data.error_description,
            code: error.request.status
          });
        } else {
          console.warn(
            "Request response format invalid (could not create readable error)",
            {
              ...error
            }
          );
        }
      });
  }
}
