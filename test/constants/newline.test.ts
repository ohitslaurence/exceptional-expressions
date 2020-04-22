import Constants from '../../src/constants';

/**
 * newline constant test
 */
describe('newline constant test', () => {
  it('correctly matches a global newline', () => {
    const regex: RegExp = new RegExp(Constants.newline);

    expect(regex.test('this is a test\nstring')).toBeTruthy();
    expect(regex.test('this is\ra test string')).toBeTruthy();
    expect(regex.test('this is a test string')).toBeFalsy();
  });
  it('correctly matches a newline in a sequence', () => {
    const regex: RegExp = new RegExp(`test${Constants.newline}test`);

    expect(regex.test('test\ntest')).toBeTruthy();
    expect(regex.test('test\rtest')).toBeTruthy();
    expect(regex.test('test test')).toBeFalsy();
  });
  it('has the correct number of matches in a sequence', () => {
    const regex: RegExp = new RegExp(`${Constants.newline}`, 'g');

    let match: Array<string> = 'This is a\r test 912 string\n'.match(regex) as Array<string>;
    expect(match.length).toEqual(2);

    match = 'This is a test 2 string\n'.match(regex) as Array<string>;
    expect(match.length).toEqual(1);

    match = 'This\n is2'.match(regex) as Array<string>;
    expect(match.length).toEqual(1);

    match = 'Hello'.match(regex) || [];
    expect(match.length).toEqual(0);
  });
});
