import Constants from '../../src/constants';
import { formatInternalExpression } from '../../src/utils';

/**
 * word constant test
 */
describe('word constant test', () => {
  const expression: string = formatInternalExpression(Constants.word);

  it('correctly matches a global word', () => {
    const regex: RegExp = new RegExp(expression);

    expect(regex.test('this is a sentence')).toBeTruthy();
    expect(regex.test('this')).toBeTruthy();
    expect(regex.test('this.')).toBeTruthy();
    expect(regex.test('12345')).toBeFalsy();
  });

  it('correctly matches a word in a sequence', () => {
    const regex: RegExp = new RegExp(`${expression}\\s1234`);

    expect(regex.test('test 1234')).toBeTruthy();
    expect(regex.test('hello 1234')).toBeTruthy();
    expect(regex.test('test1234')).toBeFalsy();
  });

  it('has the correct number of matches in a sequence', () => {
    const regex: RegExp = new RegExp(`${expression}`, 'g');

    let match: Array<string> = 'This is a test string'.match(regex) as Array<string>;
    expect(match.length).toEqual(5);

    match = 'This is a test string.'.match(regex) as Array<string>;
    expect(match.length).toEqual(5);

    match = 'This is'.match(regex) as Array<string>;
    expect(match.length).toEqual(2);

    match = ''.match(regex) || [];
    expect(match.length).toEqual(0);
  });
});
