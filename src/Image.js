import every from "lodash/every";
import isString from "lodash/isString";
import pickBy from "lodash/pickBy";
import assign from "lodash/assign";

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
    this.parameterize = this.parameterize.bind(this);
    this.imageUrlBuilder = this.imageUrlBuilder.bind(this);
    this.service = this.service.bind(this);
    this.device = this.device.bind(this);
    this.imageURLWithParams = this.imageURLWithParams.bind(this);
  }

  /** url
   * @param {string} [path] Path to be appended to URL.
   * @returns {string} Returns image URL, based on CMS configuration.
   */
  url(path = "") {
    let o = this.profile;
    return o.protocol + "://" + o.domain + o.port + o[path];
  }

  /** parameterize, duplicated from API.utils
   * Parameterizes an object into a string suitable for URLs.
   * @param {object} obj The object to parameterize.
   * @returns {string} Returns the parameterized string.
   */
  parameterize(obj) {
    let params = "?";
    for (let key in obj) {
      params.charAt(params.length - 1) === "?"
        ? (params = params + key + "=" + obj[key])
        : (params = params + "&" + key + "=" + obj[key]);
    }
    return params;
  }

  /** deParameterize
   * @param {string} queryString A string query to structure.
   * @example
   * deParameterize('category=music&artist=B.Dylan&instrument=guitar')
   * #=> { category: 'music', artist: 'B.Dylan', instrument: 'guitar' }
   * @returns {object} Returns the structured JS object.
   */
  deParameterize(queryString) {
    const ary = queryString.split("&");
    let paramObj = {};
    for (let keyPair in ary) {
      paramObj[ary[keyPair].split("=")[0]] = ary[keyPair].split("=")[1];
    }
    return paramObj;
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
      const p = this.parameterize(
        assign({ domain: imageDomain }, stringParams)
      );
      return `${this.url("images")}${p}`.replace(/\s/gi, "-").toLowerCase();
    } catch (e) {
      console.warn(e);
    }
  }

  /** service
   * @param {object} params Service params used to fetch the corresponding image.
   * @returns {string} Returns URL to service image resource.
   */
  service(params) {
    return this.imageUrlBuilder("service", "category", params);
  }

  /** device
   * @param {object} params Device params used to fetch the corresponding image.
   * @returns {string} Returns URL to service image resource.
   */
  device(params) {
    return this.imageUrlBuilder("device", "manufacturer", params);
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
