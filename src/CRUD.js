class RequestError extends Error {
  constructor({
    name = "XHR request error",
    error,
    error_description,
    code,
    message,
    status,
  }) {
    super();
    this.name = name;
    this.error = error;
    this.error_description = error_description;
    this.code = code;
    this.message = message;
    this.status = status;
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
        // TODO: This kind of error handling should be done in an interceptor instead
        const _error =
          error.response && error.response.data && error.response.data.error
            ? error.response.data.error
            : null;

        const error_description =
          error.response &&
          error.response.data &&
          error.response.data.error_description
            ? error.response.data.error_description
            : null;

        const code =
          error.response && error.response.data && error.response.data.code
            ? error.response.data.code
            : null;

        const message =
          error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : null;

        const status =
          error.response && error.response.status
            ? error.response.status
            : null;

        throw new RequestError({
          error: _error,
          error_description,
          code,
          message,
          status,
        });
      });
  }
};
