import Sequences from '../../src/sequences';
import Constants from '../../src/constants';
import { or, anyOf } from '../../src/utils';
import {
  escapeString,
  matches,
  wrapOptionalExpression,
  wrapOrExpression,
  validateExpression,
  validateFlags,
  getGroupsByIndex,
} from '../../src/helpers';

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

  it('wrapOptionalExpression correctly wraps expression', () => {
    const string: string = '[a-z]+';

    expect(wrapOptionalExpression(string)).toEqual(`(?:${string})?`);
  });

  it('wrapOrExpression correctly wraps expression with or statement', () => {
    const expression1: string = '[a-z]+';
    const expression2: string = '\\d';

    expect(wrapOrExpression(expression1, expression2)).toEqual(
      `(?:(?:${expression1})|(?:${expression2}))`
    );
  });

  it('validateExpression escapes a string', () => {
    const expression: string = '(hello)';

    expect(validateExpression(expression)).toEqual('\\(hello\\)');
  });

  it('validateExpression formats internal function', () => {
    const expression: string = Sequences.numbers(4);

    expect(validateExpression(expression)).toEqual('[\\d]{4}');
  });

  it('validateExpression formats array', () => {
    const expression: Array<string | number> = [Sequences.numbers(4), 'hello', 6];

    expect(validateExpression(expression)).toEqual('[\\d]{4}hello6');
  });

  it('validateExpression accepts integer', () => {
    const expression: number = 6;

    expect(validateExpression(expression)).toEqual('6');
  });

  it('validateExpression throws error with invalid parameter', () => {
    const expression: null = null;

    expect(() => {
      validateExpression(expression);
    }).toThrowError('null is not a valid expression');
  });

  it('or throws error if not given array', () => {
    expect(() => {
      // @ts-ignore
      or('hello');
    }).toThrowError('argument for or method must be an array');
  });

  it('or throws error if length less than 2', () => {
    expect(() => {
      or(['hello']);
    }).toThrowError('array given to or must have at least 2 items');
  });

  it('or wraps expressions in or statement', () => {
    const orStatement: string = or(['hello', Sequences.numbers(4), 'goodbye']);
    expect(orStatement).toEqual('~~(?:(?:hello)|(?:[\\d]{4})|(?:goodbye))');
  });

  it('correctly validates flasgs', () => {
    expect(validateFlags('ig')).toEqual('ig');
    expect(validateFlags('igxd')).toEqual('ig');
    expect(validateFlags('iGxd')).toEqual('ig');
  });

  it('getGroupsByIndex correctly extracts groups by index', () => {
    const string: string = 'test hello and goodbye and yes I am a test hello and goodbye and yes';
    const regex: RegExp = /test (hello) and (goodbye) and (yes)/g;

    expect(getGroupsByIndex(string, regex)).toEqual(['hello', 'hello']);
    expect(getGroupsByIndex(string, regex, 2)).toEqual(['goodbye', 'goodbye']);
    expect(getGroupsByIndex(string, regex, 3)).toEqual(['yes', 'yes']);
  });

  it('getGroupsByIndex extracts single group for multiple matches', () => {
    const string: string =
      'something underscore_blue something underscore_green something underscore_yellow';
    const regex: RegExp = /(?:^|\s)underscore_(.*?)(?:\s|$)/g;

    expect(getGroupsByIndex(string, regex)).toEqual(['blue', 'green', 'yellow']);
  });

  it('anyOf throws error if not given array', () => {
    expect(() => {
      // @ts-ignore
      anyOf('hello');
    }).toThrowError('argument for anyOf method must be an array');
  });

  it('anyOf throws error if length less than 2', () => {
    expect(() => {
      anyOf(['hello']);
    }).toThrowError('array given to anyOf must have at least 2 items');
  });

  it('anyOf wraps expressions in anyOf statement', () => {
    const orStatement: string = anyOf(['H', Constants.number, 'W']);
    expect(orStatement).toEqual('~~(?:[H\\dW])');
  });
});
