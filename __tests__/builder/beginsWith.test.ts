import ExpressionBuilder from '../../src/exceptional-expressions';
import Constants from '../../src/constants';
import Sequences from '../../src/sequences';

/**
 * beginsWith test
 */
describe('beginsWith test', () => {
  let builder: ExpressionBuilder = new ExpressionBuilder('g');

  beforeEach(() => {
    builder.reset();
  });

  it('doesnt output regex if nothing provided', () => {
    builder.beginsWith('');
    const regex: RegExp = builder.toRegex();

    expect(regex).toEqual(/(?:)/g);
  });

  it('correctly outputs const with beginning matcher', () => {
    builder.beginsWith(Constants.number);

    expect(builder.matchesString('2')).toBeTruthy();
    expect(builder.matchesString('2 and some strings')).toBeTruthy();
    expect(builder.matchesString('ThisIsATestString')).toBeFalsy();
  });

  it('correctly outputs sequence with beginning matcher', () => {
    builder.beginsWith(Sequences.symbols(4));

    expect(builder.matchesString('$$$$')).toBeTruthy();
    expect(builder.matchesString('!@#$ And some more strings')).toBeTruthy();
    expect(builder.matchesString('!ThisIsATestString')).toBeFalsy();
  });

  it('correctly outputs sequence with optional beginning matcher', () => {
    builder.beginsWith(Sequences.numbers(4), true);

    expect(builder.matchesString('1234')).toBeTruthy();
    expect(builder.matchesString('nd some more strings')).toBeTruthy();
  });

  it('optionallyBeginsWith returns beginsWith with optional = true', () => {
    builder.optionallyBeginsWith(Sequences.numbers(4));

    expect(builder.matchesString('1234')).toBeTruthy();
    expect(builder.matchesString('nd some more strings')).toBeTruthy();
    expect(builder.toRegex()).toEqual(/^(?:[\d]{4})?/g);
  });

  it('orBeginsWith throws error if no begins with', () => {
    expect(() => {
      builder.orBeginsWith('something');
    }).toThrowError('orBeginsWith must be preceeded by a beginsWith statement');
  });

  it('orBeginsWith wraps begin statements', () => {
    builder.beginsWith(Sequences.numbers(4)).orBeginsWith('hello');

    expect(builder.matchesString('1234')).toBeTruthy();
    expect(builder.matchesString('hello')).toBeTruthy();
    expect(builder.matchesString('1')).toBeFalsy();
  });
});
