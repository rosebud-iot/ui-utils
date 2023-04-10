"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractFileName = exports["default"] = void 0;
/**
 * extractFileName
 * @since 1.9.2
 * @category File download
 * @description Gets the file name of a downloaded payload. This would be
 *              particularly useful after downloading a file from a server.
 * @param {Object} payload The response payload of a GET request, downloading a file.
 * @param {String} filename The default filename if no filename was found in payload.
 * @returns {string} Returns the name of the file found in the request payload.
 *                   If no filename was found, returns given default filename or
 *                   "download.zip".
 * @example
 * const payload = await getImageDirectoryFromAPI(path, id);
 * const fileName = extractFileName(payload);
 * fileName
 * #=> myFile.zip
 */
var extractFileName = function extractFileName(payload) {
  var filename = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "download";
  try {
    var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    var disposition = payload.headers["content-disposition"];
    var matches = filenameRegex.exec(disposition);
    filename = matches[1].replace(/['"]/g, "");
  } catch (e) {
    console.warn("Could not retrieve filename from payload", payload);
  }
  return filename;
};
exports.extractFileName = extractFileName;
var _default = extractFileName;
exports["default"] = _default;