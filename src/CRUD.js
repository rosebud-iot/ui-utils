class RequestError extends Error {
  constructor({
    name = "XHR request error",
    error,
    message,
    data,
    status,
    headers,
    request,
    config,
  }) {
    super();
    this.name = name;
    this.error = error;
    this.message = message;
    this.data = data;
    this.status = status;
    this.headers = headers;
    this.request = request;
    this.config = config;
  }
}

exports.RequestError = RequestError;

exports.CRUD = class CRUD {
  constructor({ axiosInstance }) {
    this.axiosInstance = axiosInstance;
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
    return this.axiosInstance
      .request({
        method: verb,
        url,
        data: body || null,
        ...requestConfig,
      })
      .then((response) => {
        switch (response.status) {
          case 200: // OK
          case 201: // Created
          case 202: // Accepted
          case 203: // Non-Authoritative Information
          case 204: // No content
            // TODO: handle in interceptor instead
            if (requestConfig.responseType === "blob") return response;
            return response.data;

          default:
            throw new RangeError(
              `Unhandled response ${response.status}, not within accepted range`
            );
        }
      })
      .catch((error) => {
        let config = { data: error.data, error: error.error };
        if (error.response) {
          config = Object.assign(config, {
            message: `Request error, server responded with a status code that falls out of range of 2xx (${error.response.status})`,
            data: error.response.data,
            status: error.response.status,
            headers: error.response.headers,
          });
        } else if (error.request) {
          config = Object.assign(config, {
            message: `Request error, no response was received`,
            request: error.request,
          });
        } else {
          config = Object.assign(config, {
            message: `Request error, error was triggered when setting up the request`,
            message2: error.message,
          });
        }
        const errResp = JSON.stringify(new RequestError(config));
        throw JSON.parse(errResp);
      });
  }
};
