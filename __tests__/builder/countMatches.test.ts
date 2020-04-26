import ExpressionBuilder from '../../src/exceptional-expressions';
import Sequences from '../../src/sequences';

describe('countMatches test', () => {
  let builder: ExpressionBuilder = new ExpressionBuilder();

  beforeEach(() => {
    builder.reset();
  });

  it('extracts single word match', () => {
    builder.contains('hello');

    expect(builder.countMatches('hello I am a test string')).toEqual(1);
    expect(builder.countMatches('hello I am a test hello')).toEqual(2);
  });

  it('extracts sequence match', () => {
    builder.contains(Sequences.symbols(4));

    expect(builder.countMatches('I am a test string!!!!')).toEqual(1);
    expect(builder.countMatches('##hello I $$$$ a test hello****')).toEqual(2);
    expect(builder.countMatches('##hello I $$$ a test hello***')).toEqual(0);
  });
});
