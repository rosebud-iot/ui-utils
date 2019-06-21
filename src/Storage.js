const { host } = window.location;

/** CookieStorage
 * @description Utility library for using cookies both in development and prod.
 */
exports.CookieStorage = class CookieStorage {
  /**
   * setup
   * @description Prepares given cookies library for usage.
   * - Sets default path
   * - Sets default domain
   */
  static setup(cookies) {
    try {
      cookies.defaults = { path: "/", domain: this.domain };
    } catch (e) {
      console.warn("Cookie setup error", e);
    }
  }

  /**
   * domain
   * @returns {string} Returns current domain, usable when managing cookies.
   */
  static get domain() {
    if (/localhost/g.test(host)) return "localhost";
    return host;
  }
};
