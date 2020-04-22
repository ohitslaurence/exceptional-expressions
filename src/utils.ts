export const formatInternalExpression = (string: string): string => {
  return string.substring(2);
};

/**
 * Handle escaping of string characters
 *
 * @param {string} string The string to be escaped
 *
 * @return {string}
 */
export const escapeString = (string: string): string => {
  return string.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\u002d');
};

/**
 * Test the regex against the string, more accurate than regex.test()
 *
 * @param {string} string The string to test
 * @param {RegExp} regex The regex to be tested against
 *
 * @return {boolean}
 */
export const matches: (string: string, regex: RegExp) => boolean = (
  string: string,
  regex: RegExp
): boolean => {
  const match: RegExpMatchArray | null = string.match(regex);

  return match && match.length > 0 ? true : false;
};
