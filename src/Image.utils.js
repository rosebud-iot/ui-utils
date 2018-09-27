import every from 'lodash/every';
import isString from 'lodash/isString';
import pickBy from 'lodash/pickBy';
import assign from 'lodash/assign';

/** Image
  * Image class offers methods useful for retrieving relevant
  * URIs to graphical assets managed by a CMS.
  * Instantiate with the correct profile (endpoints map for chosen environment)
  * @param {object} profile Map of endpoints that suits your environment.
  */
export class Image {

  constructor(profile) {
    this.profile = profile;
    this.url = this.url.bind(this);
    this.parameterize = this.parameterize.bind(this);
    this.service = this.service.bind(this);
    this.device = this.device.bind(this);
  }

  /** url
    * @param {string} [path] Path to be appended to URL.
    * @returns {string} Returns image URL, based on CMS configuration.
    */
  url(path='') {
    let o = this.profile;
    return o.protocol + '://' +
           o.domain +
           o.port +
           o[path];
  }

  /** parameterize, duplicated from API.utils
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

  /** getLocalAsset
    * Provides a default image for devices that are missing manufacturer property
    */
  getLocalAsset() {
    return '../../../../images/brand/basic/sweeprlogo.png'
  }

  /** service
    * @param {string} category The category in which desired service image resides.
    * @param {string} service The name of the service.
    * @param {string} type The image file layout.
    * @returns {string} Returns URL to service image resource (all lower case).
    */
  service(params) {
    if (!params || !params.category) return;
    const existingParams = pickBy(params, isString);
    if (!existingParams.category && every(existingParams, isString)) throw new TypeError('Missing required params or wrong types');
    return `${this.url('images')}${this.parameterize(assign({}, { domain: 'service' }, existingParams))}`.replace(/\s/gi, '-').toLowerCase();
  }

  /** device
    * @param {string} manufacturer The category in which desired device image resides.
    * @param {string} family Device family.
    * @param {string} model Device model.
    * @param {string} type The image file layout.
    * @returns {string} Returns URL to service image resource (all lower case, all whitespaces replaced with dash).
    */
  device(params) {
    if (!params || !params.manufacturer) return;
    if (params.manufacturer === 'Other') return this.getLocalAsset();
    const existingParams = pickBy(params, isString);
    if (!existingParams.manufacturer && every(existingParams, isString)) throw new TypeError('Missing required params or wrong types');
    return `${this.url('images')}${this.parameterize(assign({}, { domain: 'device' }, existingParams))}`.replace(/\s/gi, '-').toLowerCase();
  }
}
