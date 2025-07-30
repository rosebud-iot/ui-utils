"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _constants = _interopRequireDefault(require("./constants"));
/**
 * Convert a simple glob pattern (with `*` wildcards) into a RegExp that
 * matches the entire string.
 *
 * @param {string} glob
 *   A glob pattern, e.g. `"https://*.youtube.com/watch*"`.
 * @returns {RegExp}
 *   A RegExp anchored at start/end, case‑insensitive, e.g.:
 *     globToRegExp('foo*.js') → /^foo[^/]*\.js$/i
 *
 * @example
 * const r = globToRegExp('https://*.youtube.com/watch*');
 * r.test('https://www.youtube.com/watch?v=abc'); // → true
 * r.test('https://youtu.be/abc');                // → false
 */
var globToRegExp = function globToRegExp(glob) {
  return new RegExp("^".concat(glob.replace(/[-/\\^$+?.()|[\]{}]/g, "\\$&").replace(/\*/g, "[^/]*"), "$"), "i");
};

/**
 * Returns true if `url` matches at least one glob in `schemes`.
 */
var doesURLMatch = function doesURLMatch(url, schemes) {
  return schemes.some(function (scheme) {
    return globToRegExp(scheme).test(url);
  });
};

/**
 * Normalizes an oEmbed base URL:
 * strips any trailing slash
 * swaps `{format}` - `json`
 */
var normalizeUrl = function normalizeUrl() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  return url.replace(/\/+$/, "").replace(/\{format\}/gi, "json");
};

/**
 * Finds the first endpoint whose schemes include this URL.
 *
 * @param {string} url - The media URL to match against provider schemes.
 * @param {Array<Object>} providers - Array of oEmbed provider definitions.
 * @returns {string | undefined }
 *
 * @example
 * console.log(getEndpoint('https://www.youtube.com/watch?v=dQw4w9WgXcQ')); // 'https://www.youtube.com/oembed'
 */
var getOembedEndpointURL = function getOembedEndpointURL(url) {
  var providers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _constants["default"];
  var endpointURL;
  providers.forEach(function (provider) {
    provider.endpoints.forEach(function (endpoint) {
      if (!endpointURL && doesURLMatch(url, endpoint.schemes)) {
        endpointURL = endpoint.url;
      }
    });
  });
  return normalizeUrl(endpointURL);
};
var _default = exports["default"] = getOembedEndpointURL;