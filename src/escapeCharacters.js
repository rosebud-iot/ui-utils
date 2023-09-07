import map from 'lodash/map';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import isEmpty from 'lodash/isEmpty';
import forOwn from 'lodash/forOwn';
import isFunction from 'lodash/isFunction';
import some from 'lodash/some';

/**
 * Escapes apostrophies in a string, alternatively reverses the escape.
 * Escaped characters are (&apos;): ´`'
 * @func escChars
 * @param {string} string - The string to escape.
 * @param {boolean} reverse - Whether or not to reverse escaping.
 * @return {string} - The adjusted string.
 * @example
 * escChars('Thomas O'Malley');
 * #=> 'Thomas O&apos;Malley'
 *
 * escChars('Thomas O&apos;Malley', true);
 * #=> 'Thomas O'Malley'
 *
 * escChars("They'd tell me: ´This is for you!´");
 * #=> "They&apos;d tell me: &apos;This is for you!&apos;"
 */
export const escChars = (str, reverse = false) =>
  reverse ? String(str).replace(/&apos;/g, "'") : String(str).replace(/[`'´]/g, '&apos;');

/**
 * Takes an object, an array or a string and returns a version where each string value is escaped.
 * @func escapeCharacters
 * @param {object|array|string} val - The object/array/string to travers and escape.
 * @param {boolean} reverse - Whether or not to reverse escaping.
 * @param {array} exclude - An array of strings, the name of fields to leave unchanged.
 * @returns {object|array|string} A new object/array/string with (un/)escaped values at given fields.
 * @example
 *
 * escapeCharacters({ name: 'Thomas O'Malley', friends: ['John O'Reiley', 'Jack's Farm'] });
 * #=> { name: 'Thomas O&apos;Malley', friends: ['John O&apos;Reiley', 'Jack&apos;s Farm'] }
 *
 * escapeCharacters(['Thomas O'Malley', { name: 'Thomas O'Malley' }]);
 * #=> ['Thomas O&apos;Malley', { name: 'Thomas O&apos;Malley' }]
 *
 * escapeCharacters('Thomas O'Malley');
 * #=> 'Thomas O&apos;Malley'
 *
 * escapeCharacters({ username: "Laurel O'Sullivan", password: "e3m@PmgA'mLrY9Ds8" }, false, ['password']);
 * #=> { username: "Laurel O&apos;Sullivan", password: "e3m@PmgA'mLrY9Ds8" }
 *
 * escapeCharacters({ username: "Laurel O&apos;Sullivan", password: "e3m@PmgA'mLrY9Ds8" }, true, ['password']);
 * #=> { username: "Laurel O'Sullivan", password: "e3m@PmgA'mLrY9Ds8" }
 */
export const escapeCharacters = (val, reverse = false, exclude = []) => {
  if (isFunction(val) || (!isObject(val) && !isString(val))) {
    return undefined;
  }

  const escAry = (a) =>
    map(a, (itm) =>
      isArray(itm)
        ? escAry(itm)
        : isObject(itm)
        ? escObj(itm)
        : isString(itm)
        ? escChars(itm, reverse)
        : itm
    );

    const escObj = (o) => {
      return isEmpty(o)
        ? o
        : (() => {
            let _o = {};
            forOwn(o, (v, k) => {
              _o[k] = some(exclude, (field) => field === k)
                ? v
                : isArray(v)
                ? escAry(v)
                : v instanceof Date
                ? new Date(v)
                : isObject(v)
                ? escObj(v)
                : isString(v)
                ? escChars(v, reverse)
                : v;
            });
            return _o;
          })();
    };  

  return isArray(val)
    ? escAry(val)
    : isObject(val)
    ? escObj(val)
    : isString(val)
    ? escChars(val, reverse)
    : val;
};

export default escapeCharacters;
