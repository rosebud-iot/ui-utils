import type from './type';

/**
 * Throws an error explaining that received type is not in the list of white-listed types.
 * @function
 * @param {[]} typesWhiteList - An array of white-listed types.
 * @param {any} received - The received value to check against the white-listed types.
 * @throws {Error} - A generic custom Error explaining expected and received types.
 */

const typeErrorHandler = (typesWhiteList, received) => {
  throw new Error(`Invalid type. Expected ${typesWhiteList.join(' or ')} but received ${type(received)}`);
};

export default typeErrorHandler;