import Constants from '../../src/constants';
import { formatInternalExpression } from '../../src/helpers';

/**
 * symbol constant test
 */
describe('symbol constant test', () => {
  const expression: string = formatInternalExpression(Constants.symbol);

  it('correctly matches global symbol', () => {
    const regex: RegExp = new RegExp(expression);

    expect(regex.test('test%string')).toBeTruthy();
    expect(regex.test('ThisIsATestString')).toBeFalsy();
  });

  it('correctly matches symbol in a sequence', () => {
    const regex: RegExp = new RegExp(`Hello${expression}Test`);

    expect(regex.test('Hello$Test')).toBeTruthy();
    expect(regex.test('HelloTest')).toBeFalsy();
  });

  it('has the correct number of matches in a sequence', () => {
    const regex: RegExp = new RegExp(`${expression}`, 'g');

    let match: Array<string> = 'This# is a test$ string'.match(regex) as Array<string>;
    expect(match.length).toEqual(2);

    match = 'This is a test string!'.match(regex) as Array<string>;
    expect(match.length).toEqual(1);

    match = 'This is.'.match(regex) as Array<string>;
    expect(match.length).toEqual(1);

    match = 'Hello'.match(regex) || [];
    expect(match.length).toEqual(0);
  });
});
