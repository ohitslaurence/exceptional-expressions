import Constants from '../../src/constants';
import { formatInternalExpression } from '../../src/utils';

/**
 * whitespace constant test
 */
describe('whitespace constant test', () => {
  const expression: string = formatInternalExpression(Constants.whitespace);

  it('correctly matches global whitespace', () => {
    const regex: RegExp = new RegExp(expression);

    expect(regex.test('test string')).toBeTruthy();
    expect(regex.test('ThisIsATestString')).toBeFalsy();
  });

  it('correctly matches whitespace in a sequence', () => {
    const regex: RegExp = new RegExp(`Hello${expression}Test`);

    expect(regex.test('Hello Test')).toBeTruthy();
    expect(regex.test('HelloTest')).toBeFalsy();
  });

  it('has the correct number of matches in a sequence', () => {
    const regex: RegExp = new RegExp(`${expression}`, 'g');

    let match: Array<string> = 'This is a test string'.match(regex) as Array<string>;
    expect(match.length).toEqual(4);

    match = 'This is a test string.'.match(regex) as Array<string>;
    expect(match.length).toEqual(4);

    match = 'This is'.match(regex) as Array<string>;
    expect(match.length).toEqual(1);

    match = ''.match(regex) || [];
    expect(match.length).toEqual(0);
  });
});
