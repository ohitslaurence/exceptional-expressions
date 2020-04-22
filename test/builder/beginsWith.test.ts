import ExpressionBuilder from '../../src/exceptional-expressions';
import Constants from '../../src/constants';
import Sequences from '../../src/sequences';

/**
 * beginsWith test
 */
describe('beginsWith test', () => {
  let builder: ExpressionBuilder = new ExpressionBuilder();

  beforeEach(() => {
    builder.restore();
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
    const regex: RegExp = builder.toRegex();

    expect(builder.matchesString('$$$$')).toBeTruthy();
    expect(builder.matchesString('!@#$ And some more strings')).toBeTruthy();
    expect(builder.matchesString('!ThisIsATestString')).toBeFalsy();
  });
});
