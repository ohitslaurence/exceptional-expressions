import ExpressionBuilder from '../../src/exceptional-expressions';
import Constants from '../../src/constants';
import Sequences from '../../src/sequences';

/**
 * contains test
 */
describe('contains test', () => {
  let builder: ExpressionBuilder = new ExpressionBuilder();

  beforeEach(() => {
    builder.reset();
  });

  it('doesnt output regex if nothing provided', () => {
    builder.contains('');
    const regex: RegExp = builder.toRegex();

    expect(regex).toEqual(/(?:)/g);
  });

  it('throws an error if not the first expression', () => {
    expect(() => {
      builder.contains('something').contains('another');
    }).toThrowError('contains can only be used as the first internal expression');
  });

  it('correctly outputs const with beginning matcher', () => {
    builder.contains(Constants.number);

    expect(builder.matchesString('hello 2')).toBeTruthy();
    expect(builder.matchesString('yes 2 and some strings')).toBeTruthy();
    expect(builder.matchesString('ThisIsATestString')).toBeFalsy();
  });

  it('correctly outputs sequence with matcher', () => {
    builder.contains(Sequences.symbols(4));

    expect(builder.matchesString('test $$$$ test')).toBeTruthy();
    expect(builder.matchesString('!@#$ And some more strings')).toBeTruthy();
    expect(builder.matchesString('ThisIsATestString!')).toBeFalsy();
  });

  it('orContains throws error if no preceeding internal expression with', () => {
    expect(() => {
      builder.orContains('something');
    }).toThrowError('orContains by must be preceeded by a contains expression');
  });

  it('orContains wraps prvious expression statements', () => {
    builder.contains(Sequences.numbers(4)).orContains('hello');

    expect(builder.matchesString('test 1234 test')).toBeTruthy();
    expect(builder.matchesString('test hello test')).toBeTruthy();
    expect(builder.matchesString('1')).toBeFalsy();
  });
});
