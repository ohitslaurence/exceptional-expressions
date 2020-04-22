import Constants from '../../src/constants';

/**
 * number constant test
 */
describe('number constant test', () => {
  it('correctly matches a global digit', () => {
    const regex: RegExp = new RegExp(Constants.number);

    expect(regex.test('this is a test string 6')).toBeTruthy();
    expect(regex.test('this is a test string')).toBeFalsy();
  });
  it('correctly matches a digit in a sequence', () => {
    const regex: RegExp = new RegExp(`test${Constants.number}test`);

    expect(regex.test('test4test')).toBeTruthy();
    expect(regex.test('4test')).toBeFalsy();
  });
  it('has the correct number of matches in a sequence', () => {
    const regex: RegExp = new RegExp(`${Constants.number}`, 'g');

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
