import assign from "lodash/assign";
import deParameterize from "./deParameterize";

/**
 * Converts an object to a parameter string, appropriate for URLs.
 *
 * @since 0.1.0
 * @category Object
 * @param {object} objPrimary The object to parameterize. If second argument is preset, this object will take precedence.
 * @param {string} [queryString=null] A query string to merge into the returned query string.
 * @returns {string} Returns the parameterized string.
 * @example
 *
 * parameterize({ page: 3, size: 12 });
 * #=> "?page=3&size=12"
 *
 * parameterize({ page: 3, size: 12 }, "name=rick&dimension=C-137");
 * #=> "?page=3&size=12&name=rick&dimension=C-137"
 *
 * parameterize({ page: 3, size: 12 }, "?name=rick&dimension=C-137");
 * #=> "?page=3&size=12&name=rick&dimension=C-137"
 *
 * parameterize({ page: 3, size: 12 }, "page=4&limit=20");
 * #=> "?page=3&size=12&limit=20"
 */
const parameterize = (objPrimary, queryString = null) => {
  let params = "?",
    objSecondary = {};
  if (queryString) {
    if (queryString.charAt(0) === "?") queryString = queryString.substring(1);
    objSecondary = deParameterize(queryString);
  }
  const obj = assign({}, objSecondary, objPrimary);
  for (let key in obj) {
    params.charAt(params.length - 1) === "?"
      ? (params = params + key + "=" + obj[key])
      : (params = params + "&" + key + "=" + obj[key]);
  }
  return params;
};

export default parameterize;
