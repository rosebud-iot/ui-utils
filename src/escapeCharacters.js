import map from 'lodash/map';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import forOwn from 'lodash/forOwn';
import isFunction from 'lodash/isFunction';

/**
 * @descr Takes a string and returns a new escaped string.
 *        Escaped characters are (&apos;): ´`'
 * @param {string} string The string to escape.
 * @return {string} The escaped string.
 * @example
 * escChars('Thomas O'Malley');
 * #=> 'Thomas O&apos;Malley'
 *
 * escChars("They'd tell me: ´This is for you!´");
 * #=> "They&apos;d tell me: &apos;This is for you!&apos;"
 */
export const escChars = (str, reverse) =>
  reverse ? String(str).replace(/&apos;/g, "'") : String(str).replace(/[`'´]/g, '&apos;');

/**
 * @descr Takes an object, an array or a string and returns a version where each string value is escaped.
 * @param {object|array|string} val The object/array/string to travers and escape.
 * @return {object|array|string} A new object/array/string with escaped values.
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
 */
export const escapeCharacters = (val, reverse) => {
  if (isFunction(val) || (!isObject(val) && !isString(val))) {
    //console.warn('Unsupported data structure (escapeCharacters)');
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
    let _o = {};
    forOwn(o, (v, k) => {
      _o[k] = isArray(v)
        ? escAry(v)
        : isObject(v)
        ? escObj(v)
        : isString(v)
        ? escChars(v, reverse)
        : v;
    });
    return _o;
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
