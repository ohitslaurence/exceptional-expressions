const FLAGS: string[] = ['i', 'g', 'm', 's', 'u', 'y'];

/**
 * Groups an array of expressions into an OR statement
 *
 * @param {Array<any>} expressions The array of expressions
 *
 * @return {string}
 */
export const or: (expressions: Array<any>) => string = (expressions: Array<any>): string => {
  if (!Array.isArray(expressions)) {
    throw new Error('argument for or method must be an array');
  }
  if (expressions.length < 2) {
    throw new Error('array given to or must have at least 2 items');
  }

  return chainOrExpression(expressions);
};

/**
 * Wraps the expression with a regex grouping
 *
 * @param {any} expression The expression to be wrapped
 * @param {string} group The optional name of the group
 *
 * @return {string}
 */
export const group: (expression: any, group?: string) => string = (
  expression: any,
  group: string = `__${randomString()}`
): string => {
  return `~~[|${group}|](${validateExpression(expression)})[|${group}|]`;
};

const randomString = (): string => {
  return Math.random().toString(36).substring(2, 4) + Math.random().toString(36).substring(2, 4);
};

/**
 * Validate that flags passed match the valid javascript regex flags
 *
 * @param {string} flags
 *
 * @return {string}
 */
export const validateFlags: (flags: string) => string = (flags: string): string => {
  return flags.split('').reduce((acc: string, curr: string) => {
    if (FLAGS.includes(curr.toLowerCase())) {
      return `${acc}${curr.toLowerCase()}`;
    }
    return acc;
  }, '');
};

/**
 * Groups an array of expressions into an OR statement
 *
 * @param {Array<any>} expressions The array of expressions
 *
 * @return {string}
 */
export const anythingBut: (expression: any) => string = (expression: any): string => {
  return `~~(?:(?:(?!${validateExpression(expression)}).)*)`;
};

export const assertDoesntExist: (val: any, message?: string) => asserts val is null | undefined = (
  val: any,
  message?: string
): asserts val is null | undefined => {
  if (!(val === undefined || val === null)) {
    throw new Error(message);
  }
};

/**
 * Asser that the value passed is not null or undefined
 *
 * @param {T} val
 * @param {string} message
 */
export const assertExists: <T>(val: T, message?: string) => asserts val is NonNullable<T> = <T>(
  val: T,
  message?: string
): asserts val is NonNullable<T> => {
  if (val === undefined || val === null) {
    throw new Error(message);
  }
};

/**
 * Assert that at least one of the values passed is not null or undefined
 *
 * @param {Array<T>} val
 * @param {string} message
 */
export const assertOneExists: <T>(val: Array<T>, message?: string) => asserts val is T[] = <T>(
  val: Array<T>,
  message?: string
): asserts val is T[] => {
  for (const item of val) {
    if (item !== undefined && item !== null) {
      return;
    }
  }
  throw new Error(message);
};

/**
 * Chains an array of expressions into a single OR expression
 *
 * @param {Array<any>} expressions The expressions to chain
 *
 * @return {string}
 */
const chainOrExpression: (expressions: Array<any>) => string = (
  expressions: Array<any>
): string => {
  const orChain: string = expressions.reduce(
    (accumulator: string, current: string, index: number) => {
      if (index === expressions.length - 1) {
        return `${accumulator}(?:${validateExpression(current)})`;
      }
      return `${accumulator}(?:${validateExpression(current)})|`;
    },
    ''
  );

  return `~~(?:${orChain})`;
};

/**
 * Handles remove the internal expression indicator
 *
 * @param {string} string
 *
 * @return {string}
 */
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
 * Extract an array of matches from the string
 *
 * @param {string} string
 * @param {RegExp} regex
 *
 * @return {Array<string>}
 */
export const extractMatches: (string: string, regex: RegExp) => Array<string> = (
  string: string,
  regex: RegExp
): Array<string> => {
  return getGroupsByIndex(string, regex, 0);
};

export const getGroupsByIndex = (
  string: string,
  regex: RegExp,
  index: number = 1
): Array<string> => {
  const matches: Array<string> = [];
  let match: RegExpExecArray | null;
  while ((match = regex.exec(string))) {
    matches.push(match[index]);
  }
  return matches;
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

  throw new TypeError(`${expression} is not a valid expression`);
};
