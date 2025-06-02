/**
 * Opens a new browser window or tab with the specified URL path, target, and feature options.
 *
 * @param {string} path - The URL or path to open. Can be relative (e.g., '/#/home') or absolute (e.g., 'https://example.com').
 * @param {string} [target='_blank'] - The target context in which to open the URL. Common values: '_blank', '_self', '_parent', '_top'.
 * @param {string} [features='noopener,noreferrer'] - A comma-separated list of window features such as size, toolbars, or security flags.
 *
 * @example
 * openWindow('/#/dashboard');
 * openWindow('https://example.com', '_self');
 * openWindow('/popup', '_blank', 'width=600,height=400');
 */
export const openWindow = (
  path,
  target = "_blank",
  features = "noopener,noreferrer",
  windowRef = window
) => {
  if (!path) {
    console.error("Path is required to open a new window.");
    return;
  }
  windowRef.open(path, target, features);
};
