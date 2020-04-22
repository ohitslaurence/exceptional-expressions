import { escapeString, matches } from '../../src/utils';

/**
 * beginsWith test
 */
describe('utils test', () => {
  it('escapeString correctly escapes strings', () => {
    const string: string = '(Test$^ingString)';

    expect(escapeString(string)).toEqual('\\(Test\\$\\^ingString\\)');
  });

  it('matches correctly matches strings and regex', () => {
    const regex: RegExp = /^[0-9]{3}/g;

    expect(matches('(Test$^ingString)', regex)).toBeFalsy();
    expect(matches('1234(Test$^ingString)', regex)).toBeTruthy();
  });
});
