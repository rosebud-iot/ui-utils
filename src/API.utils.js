
/** API
  * API class offers a set of methods to prepare various data
  * that you'd need when performing API calls.
  * Instantiate with the correct profile (endpoints map for chosen environment)
  * @param {object} profile Map of endpoints that suits your environment.
  */
export class API {

  constructor(profile) {
    if(!profile || typeof profile !== 'object') throw new TypeError('Expected profile to be an object');
    this.profile = profile;

    this.extend = this.extend.bind(this);
    this.URIBuilder = this.URIBuilder.bind(this);
    this.tokenStillValid = this.tokenStillValid.bind(this);
    this.getURL = this.getURL.bind(this);
  }

  extend(profile) {
    if(!profile || typeof profile !== 'object') throw new TypeError('Expected profile to be an object');
    this.profile = Object.assign({}, this.profile, profile);
  }

  /** URIBuilder
    * Builds up a URL based on path and config.
    * @param {string} resource Resource to request in call.
    * @param {object} config Configuration object to enable overriding.
    * @returns {string} Returns a URL.
    */
  URIBuilder(resource, config) {
    if(typeof resource !== 'string' || typeof config !== 'object') {
      throw new TypeError('Invalid parameters');
    }

    const o = Object.assign({}, this.profile, config)
    return o.protocol + '://' +
           o.domain +
           o.port +
           o[resource];
  }

  /** parseToken
    * Decodes token string from base64.
    * @param {string} token The token to decode.
    * @returns {object} Returns JSON.
    */
  parseToken(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

  /** tokenStillValid
    * Determines whether a token is valid.
    * @param {string} string Token to evaluate.
    * @returns {boolean} Returns boolean, token is valid or not.
    */
  tokenStillValid(token) {
    if(!token) return;
    const { exp } = this.parseToken(token);
    return ((exp * 1000) - Date.now()) > 0;
  }

  /** parameterize
    * Parameterizes an object into a string suitable for URLs.
    * @param {object} obj The object to parameterize.
    * @returns {string} Returns the parameterized string.
    */
  parameterize(obj) {
    let params = '?';
    for (let key in obj) {
      params.charAt(params.length -1) === '?'
        ? params = params +key +'=' +obj[key]
        : params = params +'&' +key +'=' +obj[key];
    }
    return params;
  }

  /** getURL
    * @param {string} resource The resource to request from API.
    * @param {object} [addendum] Configure the output in various ways.
    * @returns {string} Returns a URL based on input.
    * @example
    *
    * getURL('login')
    * // => 'https://bracelet-factory.com/login'
    *
    * getURL('bracelets', { path: '/green' })
    * // => 'https://bracelet-factory.com/bracelets/green'
    *
    * getURL('bracelets', { config: { protocol: 'ftp' } })
    * // => 'ftp://bracelet-factory.com/bracelets'
    */
  getURL(resource, addendum={}) {
    if(!resource) { throw ReferenceError('Missing resource') }
    const path = addendum.path ? addendum.path : '';
    const params = addendum.params ? this.parameterize(addendum.params) : '';
    const config = addendum.config || {};

    return this.URIBuilder(resource, config) +path +params;
  }
}
