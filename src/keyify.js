import every from "lodash/every";
import isString from "lodash/isString";
import isNumber from "lodash/isNumber";
import map from "lodash/map";
import assign from "lodash/assign";
import at from "lodash/at";

/** Keyify
 * Iterates through an array with IDs, adds a new property 'key' to each item.
 * Each item in ary must be an object.
 * Each item object in ary must have ID property or an identifier path or string.
 * ID value must be appendable to a String (string, number etc.)
 * @param {array} ary Array of objects to keyify.
 * @param {string} [identifier] Path to identifier.
 * @returns {array} New array with 'key' fields.
 * @example
 *
 * const a = [{ id: 1, name: 'Summer' }, { id: 2, name: 'Snuffles' }];
 * keyify(a)
 * // => [{ id: 1, name: 'Summer', key: 'key-1' }, { id: 2, name: 'Snuffles', key: 'key-2' }]
 *
 * const a = [{ data: { n: 192 } }, { data: { n: b290 } }];
 * keyify(a, 'data.n')
 * // => [{ data: { n: 192 }, key: 'key-192' }, { data: { n: b290 }, key: 'key-b290' }]
 */

const keyify = (ary, identifier) => {
  const aryMissingIDs = (ary) => !every(ary, (item) => item.id);
  const aryIDsInvalid = (ary) =>
    !every(ary, (item) => isString(item.id) || isNumber(item.id));
  const aryError = () => {
    console.warn(
      "keyify: Missing or invalid ID or identifier attribute in Array items",
      ary
    );
    return ary;
  };

  // Sanitises input.
  if (
    (!identifier && aryMissingIDs(ary)) ||
    (!identifier && aryIDsInvalid(ary))
  )
    return aryError();

  identifier = identifier ? identifier : "id";

  return map(ary, (item) => {
    switch (typeof identifier) {
      case "string":
        return identifier === "id"
          ? assign({}, item, { key: `key-${item[identifier]}` })
          : assign({}, item, { key: `key-${at(item, identifier)[0]}` });

      default:
        aryError();
    }
  });
};

export default keyify;
