import Constants from '../../src/constants';

/**
 * symbol constant test
 */
describe('symbol constant test', () => {
  it('correctly matches global symbol', () => {
    const regex: RegExp = new RegExp(Constants.symbol);

    expect(regex.test('test%string')).toBeTruthy();
    expect(regex.test('ThisIsATestString')).toBeFalsy();
  });
  it('correctly matches symbol in a sequence', () => {
    const regex: RegExp = new RegExp(`Hello${Constants.symbol}Test`);

    expect(regex.test('Hello$Test')).toBeTruthy();
    expect(regex.test('HelloTest')).toBeFalsy();
  });
  it('has the correct number of matches in a sequence', () => {
    const regex: RegExp = new RegExp(`${Constants.symbol}`, 'g');

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
