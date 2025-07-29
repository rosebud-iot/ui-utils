import { OEMBED_PROVIDERS } from "./constants";

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
const globToRegExp = (glob) =>
  new RegExp(
    `^${glob.replace(/[-/\\^$+?.()|[\]{}]/g, "\\$&").replace(/\*/g, "[^/]*")}$`,
    "i"
  );

/**
 * Returns true if `url` matches at least one glob in `schemes`.
 */
const doesURLMatch = (url, schemes) =>
  schemes.some((scheme) => globToRegExp(scheme).test(url));

/**
 * Normalizes an oEmbed base URL:
 * strips any trailing slash
 * swaps `{format}` - `json`
 */
const normalizeUrl = (url = "") =>
  url.replace(/\/+$/, "").replace(/\{format\}/gi, "json");

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
const getOembedEndpointURL = (url, providers = OEMBED_PROVIDERS) => {
  let endpointURL;

  providers.forEach((provider) => {
    provider.endpoints.forEach((endpoint) => {
      if (!endpointURL && doesURLMatch(url, endpoint.schemes)) {
        endpointURL = endpoint.url;
      }
    });
  });

  return normalizeUrl(endpointURL);
};

export default getOembedEndpointURL;
