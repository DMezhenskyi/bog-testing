/**
 * Trim slashes from the beginning and the end of the string.
 * 'https://test.com///' => 'https://test.com'
 * '//https://test.com///' => 'https://test.com'
 * ... etc
 *
 * Throws an error if the argument is not a string.
 */
export function trimSlashes(str: any) {
  if (typeof str === 'string') {
    return str.replace(/^\/+|\/+$/g, '');
  }
  throw new Error(`Invalid argument type. Expected string, got ${typeof str}`);
}
