import every from 'lodash/every';
import isString from 'lodash/isString';

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

  /** service
    * @param {string} category The category in which desired service image resides.
    * @param {string} service The name of the service.
    * @param {string} type The image file layout.
    * @returns {string} Returns URL to service image resource (all lower case).
    */
  service(category = '', service = '', type = '') {
    if (!every(arguments, isString)) throw new TypeError(`Expected string, but got ${typeof arguments}`);
    return `${this.url('images')}?domain=service&category=${category}&service=${service}&type=${type}`.toLowerCase();
  }

  /** device
    * @param {string} manufacturer The category in which desired device image resides.
    * @param {string} family Device family.
    * @param {string} model Device model.
    * @param {string} type The image file layout.
    * @returns {string} Returns URL to service image resource (all lower case).
    */
  device(manufacturer = '', family = '', model = '', type = '') {
    if (!every(arguments, isString)) throw new TypeError(`Expected string, but got ${typeof arguments}`);
    return `${this.url('images')}?domain=device&manufacturer=${manufacturer}&family=${family}&model=${model.replace(/\s/gi, '-')}&type=${type}`.toLowerCase()
  }
}
