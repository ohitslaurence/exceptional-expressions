import ExpressionBuilder from '../../src/exceptional-expressions';
import Constants from '../../src/constants';
import Sequences from '../../src/sequences';

/**
 * endsWith test
 */
describe('endsWith test', () => {
  let builder: ExpressionBuilder = new ExpressionBuilder();

  beforeEach(() => {
    builder.reset();
  });

  it('doesnt output regex if nothing provided', () => {
    builder.endsWith('');
    const regex: RegExp = builder.toRegex();

    expect(regex).toEqual(/(?:)/g);
  });

  it('correctly outputs const with ending matcher', () => {
    builder.endsWith(Constants.number);

    expect(builder.matchesString('2')).toBeTruthy();
    expect(builder.matchesString('2 and some strings2')).toBeTruthy();
    expect(builder.matchesString('ThisIsATestString')).toBeFalsy();
  });

  it('correctly outputs sequence with ending matcher', () => {
    builder.endsWith(Sequences.numbers(4));

    expect(builder.matchesString('1234')).toBeTruthy();
    expect(builder.matchesString('!@#$ And some more strings1234')).toBeTruthy();
    expect(builder.matchesString('!ThisIsATestString')).toBeFalsy();
  });

  it('correctly outputs sequence with optional ending matcher', () => {
    builder.endsWith(Sequences.numbers(4), true);

    expect(builder.matchesString('hello 1234')).toBeTruthy();
    expect(builder.matchesString('nd some more strings')).toBeTruthy();
  });

  it('optionallyBeginsWith returns endsWith with optional = true', () => {
    builder.optionallyEndsWith(Sequences.numbers(4));

    expect(builder.matchesString('hello 1234')).toBeTruthy();
    expect(builder.matchesString('nd some more strings')).toBeTruthy();
    expect(builder.toRegex()).toEqual(/(?:[\d]{4})?$/g);
  });
});
