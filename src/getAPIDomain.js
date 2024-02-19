/**
 * getAPIDomain
 * @since 1.7.3
 * @category URL
 * @description Looks at the host and discards the first part and replaces it
 * with a given prefix. Special case for localhost.
 * @param {String} host
 * @param {String} prefix
 * @param {String} dev 'qa', 'mobile', 'dev' or any other environment.
 * @returns {string} Returns new string.
 * @example
 * getAPIDomain('admin.sweepr.com', 'api');
 * #=> 'api.sweepr.com'
 *
 * getAPIDomain('some-new.sub-domain.example.co.uk', 'cms');
 * #=> 'cms.sub-domain.example.co.uk'
 *
 * getAPIDomain('admin.dev-provider.sweepr.com', 'dev-api');
 * #=> 'dev-api.dev-provider.sweepr.com'
 *
 * getAPIDomain('localhost:3000', 'api', 'qa');
 * #=> 'api.qa.sweepr.com'
 */
const getAPIDomain = (host = window.location.host, prefix, dev = "mobile") => {
  if (/localhost/g.test(host)) return `${prefix}.${dev}.sweepr.com`;

  const [, ...segments] = host.split(".");

  return `${prefix}.${segments.join(".")}`;
};

export default getAPIDomain;
