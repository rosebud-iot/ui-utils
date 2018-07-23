
// Individual imports (without IndexOf) for smaller file size.
import every from 'lodash/every';
import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';
import map from 'lodash/map';
import assign from 'lodash/assign';
import at from 'lodash/at';

/** Collection is a utility library that offers a set of static methods that
  * may help with straightening out iteratable data models in common ways.
  * You do not need to instantiate this class, but rather use it as follows.
    import Collection from 'path/to/file.ext'
    const newAry = Collection.keyify(myArray);
  */

export class Collection {

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
  static keyify(ary, identifier) {

    const aryMissingIDs = (ary) => !_.every(ary, (item) => item.id);
    const aryIDsInvalid = (ary) => !_.every(ary, (item) => (_.isString(item.id) || _.isNumber(item.id)));
    const aryError      = () => {
      console.warn('Model.keyify: Missing or invalid ID or identifier attribute in Array items', ary)
      return ary;
    };

    // Sanitises input.
    if(!identifier && aryMissingIDs(ary)) return aryError();
    if(!identifier && aryIDsInvalid(ary)) return aryError();

    identifier = identifier ? identifier : 'id';

    return _.map(ary, (item) => {
      switch(typeof(identifier)) {
        case 'string':
          return identifier === 'id'
            ? _.assign({}, item, { key: `key-${item[identifier]}` })
            : _.assign({}, item, { key: `key-${_.at(item, identifier)[0]}` });

        default:
          aryError()
      }
    });
  }
}
