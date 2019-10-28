import isEmpty from "lodash/isEmpty";

/**
 * Converts a query string an object.
 *
 * @since 0.1.0
 * @category String
 * @param {string} queryString The string to convert.
 * @returns {object} Returns an object.
 * @example
 *
 * deParameterize('category=music&artist=B.Dylan&instrument=guitar')
 * #=> { category: 'music', artist: 'B.Dylan', instrument: 'guitar' }
 *
 * deParameterize('')
 * #=> {}
 *
 * deParameterize('?')
 * #=> {}
 */
const deParameterize = queryString => {
  if (
    isEmpty(queryString) ||
    (queryString.length === 1 && queryString.charAt(0) === "?")
  ) {
    return {};
  }

  if (queryString && queryString.charAt(0) === "?") {
    queryString = queryString.substring(1);
  }

  const ary = queryString.split("&");
  let paramObj = {};
  for (let keyPair in ary) {
    paramObj[ary[keyPair].split("=")[0]] = ary[keyPair].split("=")[1];
  }
  return paramObj;
};

export default deParameterize;
