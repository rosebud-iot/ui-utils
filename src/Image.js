import every from "lodash/every";
import isString from "lodash/isString";
import pickBy from "lodash/pickBy";
import assign from "lodash/assign";
import parameterize from "./parameterize";

/** Utils
 * Utils class offers methods useful for retrieving relevant
 * URIs to graphical assets managed by a CMS.
 * Instantiate with the correct profile (endpoints map for chosen environment)
 * @param {object} profile Map of endpoints that suits your environment.
 */
exports.Utils = class Utils {
  constructor(profile) {
    this.profile = profile;
    this.url = this.url.bind(this);
    this.imageUrlBuilder = this.imageUrlBuilder.bind(this);
    this.imageURLWithParams = this.imageURLWithParams.bind(this);
  }

  extend(profile) {
    if (!profile || typeof profile !== "object")
      throw new TypeError("Expected profile to be an object");
    this.profile = Object.assign({}, this.profile, profile);
  }

  /** url
   * @param {string} [path] Path to be appended to URL.
   * @returns {string} Returns image URL, based on CMS configuration.
   */
  url(path = "") {
    let o = this.profile;
    return o.protocol + "://" + o.domain + o.port + o[path];
  }

  /** imageUrlBuilder
   * @param {string} imageDomain The domain that corresponds to devices or services.
   * @param {string} requiredParam Critical param required to have the possibility to
   * retrieve a default image from the CSM (devices->manufacturer, service->category).
   * @param {object} paramsObject Params object provided to the Image instance.
   * @returns {string} Returns image URL.
   */
  imageUrlBuilder(imageDomain, requiredParam, paramsObject) {
    try {
      const stringParams = pickBy(paramsObject, isString);
      if (!stringParams[requiredParam] && every(stringParams, isString)) {
        throw new TypeError("Missing required params or wrong types");
      }
      const p = parameterize(assign({ domain: imageDomain }, stringParams));
      return `${this.url("images")}${p}`.replace(/\s/gi, "-").toLowerCase();
    } catch (e) {
      console.warn(e);
    }
  }

  /** imageURLWithParams
   * Retrieve both categories of images when the URL params string is already built.
   * @param {string} params string Image URL params string used to fetch the corresponding image.
   * @param {string} [type] Specifies the image type (thumbnail, square etc).
   * @returns {string} Returns URL to service image resource.
   */
  imageURLWithParams(paramsString, type = "thumbnail") {
    try {
      if (!paramsString || typeof paramsString !== "string") {
        throw new TypeError("Missing URL paramsString, empty or not a string");
      }
      return `${this.url("images")}?${paramsString}&type=${type}`;
    } catch (e) {
      console.warn(e);
    }
  }
};
