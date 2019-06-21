exports.Validation = class Validation {
  /** required
   * @param {*} value The value to determine.
   * @returns {boolean} Returns true if given value had a proper value.
   */
  static required(value) {
    return value && value.trim() !== "" ? true : false;
  }

  /** minChar
   * @param {string} value The string to check character length of.
   * @param {number} minCharCount The minimum character count that value is required to have for this method to return true. Defaults to 2.
   * @returns {boolean} Returns true if value.length was at least minCharCount.
   */
  static minChar(value, minCharCount = 2) {
    if (typeof value !== "string") throw new TypeError("Expected a string");
    if (typeof minCharCount !== "number")
      throw new TypeError("Expected a number");
    return value && value.length >= minCharCount ? true : false;
  }

  /** maxChar
   * @param {string} value The string to check character length of.
   * @param {number} maxCharCount The maximum character count allowed of value. Defaults to 100.
   * @returns {boolean} Returns true if value.length did not exceed maxCharCount.
   */
  static maxChar(value, maxCharCount = 100) {
    if (typeof value !== "string") throw new TypeError("Expected a string");
    if (typeof maxCharCount !== "number")
      throw new TypeError("Expected a number");
    return value && value.length <= maxCharCount ? true : false;
  }
};
