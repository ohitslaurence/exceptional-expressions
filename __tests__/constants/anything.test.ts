import Constants from '../../src/constants';
import { formatInternalExpression } from '../../src/helpers';

/**
 * anything constant test
 */
describe('anything constant test', () => {
  const expression: string = formatInternalExpression(Constants.anything);

  it('correctly matches global anything', () => {
    const regex: RegExp = new RegExp(expression);

    expect(regex.test('test string')).toBeTruthy();
    expect(regex.test('ThisIsATestString')).toBeTruthy();
    expect(regex.test('')).toBeFalsy();
  });

  it('correctly matches anything in a sequence', () => {
    const regex: RegExp = new RegExp(`Hello${expression}Test`);

    expect(regex.test('Hello Test')).toBeTruthy();
    expect(regex.test('Hello$Test')).toBeTruthy();
    expect(regex.test('Hello4Test')).toBeTruthy();
    expect(regex.test('HelloATest')).toBeTruthy();
    expect(regex.test('HelloTest')).toBeFalsy();
  });

  it('has the correct number of matches in a sequence', () => {
    const regex: RegExp = new RegExp(`${expression}`, 'g');

    let match: Array<string> = 'This is a test 912 string'.match(regex) as Array<string>;
    expect(match.length).toEqual(25);

    match = '876*&^$'.match(regex) as Array<string>;
    expect(match.length).toEqual(7);

    match = 'Thi'.match(regex) as Array<string>;
    expect(match.length).toEqual(3);

    match = ''.match(regex) || [];
    expect(match.length).toEqual(0);
  });
});
