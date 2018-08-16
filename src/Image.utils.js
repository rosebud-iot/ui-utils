
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
    * @param {string} serviceName The name of the service.
    * @param {string} imageName The filename of the service image.
    * @returns {string} Returns URL to service image resource (all lower case).
    */
  service(category, serviceName, imageName) {
    return `${this.url('images')}/services/${category}/${serviceName}/${imageName}`.toLowerCase();
  }
}
