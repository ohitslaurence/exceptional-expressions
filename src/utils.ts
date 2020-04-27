import { validateExpression, chainOrExpression, randomString } from './helpers';

/**
 * Groups an array of expressions into an anyOf statement
 *
 * @param {Array<any>} expressions The array of expressions
 *
 * @return {string}
 */
export const anyOf: (expressions: Array<any>) => string = (expressions: Array<any>): string => {
  if (!Array.isArray(expressions)) {
    throw new Error('argument for anyOf method must be an array');
  }
  if (expressions.length < 2) {
    throw new Error('array given to anyOf must have at least 2 items');
  }

  return `~~(?:[${validateExpression(expressions)}])`;
};

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
