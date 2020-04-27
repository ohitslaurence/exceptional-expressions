/**
 * Assert that a value passed equals either null or undefined
 *
 * @param {any} val
 * @param {string} message
 */
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
