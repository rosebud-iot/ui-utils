/**
 * Checks if the current window location is on localhost.
 * @returns {boolean} True if the window location is localhost, false otherwise.
 * @example
 * isLocalHost() /// true;
 */
const isLocalHost = (host = window.location.host) => {
  return /localhost/g.test(host);
};

export default isLocalHost;
