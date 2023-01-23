
/**
 * Returns the type of the given object in lowercase.
 * @function
 * @param {any} obj - The object to check the type of.
 * @returns {string} - The type of the object in lowercase.
 */
const type = (obj) => {
  if (typeof obj === 'function') return 'function';
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}

export default type;