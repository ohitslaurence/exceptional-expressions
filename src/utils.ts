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

/**
 * Helper function for determining whether or not to wrap an expression with an optional statement
 *
 * @param {string} expression The expresion to return
 * @param {boolean} optional Should wrap
 *
 * @return {string}
 */
export const handleOptionalWrapping: (expression: string, optional: boolean) => string = (
  expression: string,
  optional: boolean
): string => {
  return optional ? wrapOptionalExpression(expression) : expression;
};

/**
 * Wraps an expression with an optional non-capturing group
 *
 * @param {string} expression The expressions to wrap
 *
 * @return {string}
 */
export const wrapOptionalExpression: (expression: string) => string = (
  expression: string
): string => {
  return `(?:${expression})?`;
};

/**
 * Wraps two expressions with an or operator
 *
 * @param {string} expression The expressions to wrap
 *
 * @return {string}
 */
export const wrapOrExpression: (firstExpression: string, secondExpression: string) => string = (
  firstExpression: string,
  secondExpression: string
): string => {
  return `(?:(?:${firstExpression})|(?:${secondExpression}))`;
};

export const isInternalRegex = (string: string): boolean => {
  return (
    typeof string === 'string' &&
    string.length > 2 &&
    string.charAt(0) === '~' &&
    string.charAt(1) === '~'
  );
};

export const validateExpression = (expression: any): string => {
  if (isInternalRegex(expression)) {
    return formatInternalExpression(expression);
  } else if (typeof expression === 'string') {
    return escapeString(expression);
  } else if (Array.isArray(expression)) {
    return expression.reduce((accumulator, current) => {
      return `${accumulator}${validateExpression(current)}`;
    }, '');
  } else if (expression && typeof expression.toString !== undefined) {
    return escapeString(expression.toString());
  }

  throw new Error(`${expression} is not a valid expression`);
};
