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
    if (category === '' || service === '' || type === '') {
      console.warn('Service image params: Missing or invalid parameters: ', { category, service, type })
    }
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
    model = model.replace(/\s/gi, '-');
    if (manufacturer === '', family === '', model === '', type === '') {
      console.warn('Device image params: Missing or invalid parameters: ', { manufacturer, family, model, type })
    }
    return `${this.url('images')}?domain=device&manufacturer=${manufacturer}&family=${family}&model=${model}&type=${type}`.toLowerCase();
  }
}
