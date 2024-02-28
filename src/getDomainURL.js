import getAPIDomain from "./getAPIDomain";

/**
 * getDomainURL
 * @since 2.4.5
 * @category URL
 * @description Creates the domain URL using a custom protocol.
 * @param {boolean} options.protocol - The protocol.
 * @param {Function} options.host - The URL host.
 * @param {number} options.prefix - The desired prefix for the domain URL.
 * @returns {string} Returns the domain URL.
 * @example
 * getAPIDomain({protocol: 'http', host: 'admin.sweepr.com', prefix: 'api'});
 * #=> 'http://api.sweepr.com'
 *
 * getAPIDomain({protocol: 'https', host: 'admin.sweepr.com', prefix: 'api'});
 * #=> 'https://api.sweepr.com'
 */
export const getDomainURL = ({ protocol, host, prefix, dev }) =>
  `${protocol}://${getAPIDomain(host, prefix, dev)}`;

export default getDomainURL;
