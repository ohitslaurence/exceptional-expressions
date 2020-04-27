import Constants from '../../src/constants';
import { formatInternalExpression } from '../../src/helpers';

/**
 * number constant test
 */
describe('number constant test', () => {
  const expression: string = formatInternalExpression(Constants.number);

  it('correctly matches a global digit', () => {
    const regex: RegExp = new RegExp(expression);

    expect(regex.test('this is a test string 6')).toBeTruthy();
    expect(regex.test('this is a test string')).toBeFalsy();
  });

  it('correctly matches a digit in a sequence', () => {
    const regex: RegExp = new RegExp(`test${expression}test`);

    expect(regex.test('test4test')).toBeTruthy();
    expect(regex.test('4test')).toBeFalsy();
  });

  it('has the correct number of matches in a sequence', () => {
    const regex: RegExp = new RegExp(`${expression}`, 'g');

    let match: Array<string> = 'This is a test 912 string'.match(regex) as Array<string>;
    expect(match.length).toEqual(3);

    match = 'This is a test 2 string'.match(regex) as Array<string>;
    expect(match.length).toEqual(1);

    match = 'This is2'.match(regex) as Array<string>;
    expect(match.length).toEqual(1);

    match = 'Hello'.match(regex) || [];
    expect(match.length).toEqual(0);
  });
});
