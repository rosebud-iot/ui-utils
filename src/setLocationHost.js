/**
 * Sets the host property of the window.location object.
 * @param {string} [host='localhost'] - The host value to set. Defaults to 'localhost'.
 * @returns {void}
 * @example
 * setLocationHost('sweepr.com');
 */
const setLocationHost = (host = "localhost") => {
  Object.defineProperty(window, "location", {
    value: { host },
    writable: true,
  });
};

export default setLocationHost;
