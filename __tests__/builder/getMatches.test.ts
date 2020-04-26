import ExpressionBuilder from '../../src/exceptional-expressions';
import { group } from '../../src/utils';
import Sequences from '../../src/sequences';

describe('getMatches test', () => {
  let builder: ExpressionBuilder = new ExpressionBuilder();

  beforeEach(() => {
    builder.reset();
  });

  it('extracts single word match', () => {
    builder.contains('hello');

    expect(builder.getMatches('hello I am a test string')).toEqual(['hello']);
    expect(builder.getMatches('hello I am a test hello')).toEqual(['hello', 'hello']);
  });

  it('extracts sequence match', () => {
    builder.contains(Sequences.symbols(4));

    expect(builder.getMatches('I am a test string!!!!')).toEqual(['!!!!']);
    expect(builder.getMatches('##hello I $$$$ a test hello****')).toEqual(['$$$$', '****']);
    expect(builder.getMatches('##hello I $$$ a test hello***')).toEqual([]);
  });

  it('duplicated functionality given groups', () => {
    builder.contains(group(Sequences.symbols(4)));

    expect(builder.getMatches('I am a test string!!!!')).toEqual(['!!!!']);
    expect(builder.getMatches('##hello I $$$$ a test hello****')).toEqual(['$$$$', '****']);
    expect(builder.getMatches('##hello I $$$ a test hello***')).toEqual([]);
  });
});
