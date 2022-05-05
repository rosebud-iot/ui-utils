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
export const extractFileName = (payload, filename = "download") => {
  try {
    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    const disposition = payload.headers["content-disposition"];
    const matches = filenameRegex.exec(disposition);
    filename = matches[1].replace(/['"]/g, "");
  } catch (e) {
    console.warn("Could not retrieve filename from payload", payload);
  }
  return filename;
};

export default extractFileName;
