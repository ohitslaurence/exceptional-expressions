import ExpressionBuilder from '../../src/exceptional-expressions';
import { group } from '../../src/utils';
import Sequences from '../../src/sequences';

describe('getMatches test', () => {
  let builder: ExpressionBuilder = new ExpressionBuilder('g');
  let match: string | any[];

  beforeEach(() => {
    builder.reset();
  });

  it('extracts single group match', () => {
    builder
      .contains('hello')
      .followedBy(Sequences.whitespace({ min: 1 }))
      .followedBy(group(Sequences.numbers(4), 'numbers'));

    match = builder.getMatchesWithGroups('hello 1234');
    expect(match.length).toEqual(1);
    expect(match[0].match).toEqual('hello 1234');
    expect(match[0].groups['numbers']).toEqual('1234');
  });

  it('extracts multi group match', () => {
    builder
      .contains('hello')
      .followedBy(Sequences.whitespace({ min: 1 }))
      .followedBy(group(Sequences.numbers(4), 'numbers'));

    match = builder.getMatchesWithGroups('hello 1234 hello 4567');

    expect(match.length).toEqual(2);
    expect(match[0].match).toEqual('hello 1234');
    expect(match[1].match).toEqual('hello 4567');
    expect(match[0].groups['numbers']).toEqual('1234');
    expect(match[1].groups['numbers']).toEqual('4567');
  });

  it('extracts nested groups match', () => {
    builder
      .contains('hello')
      .followedBy(Sequences.whitespace({ min: 1 }))
      .followedBy(group(['(', group(Sequences.numbers(4), 'numbers'), ')'], 'container'));

    match = builder.getMatchesWithGroups('hello (1234) hello (4567)');

    expect(match.length).toEqual(2);
    expect(match[0].match).toEqual('hello (1234)');
    expect(match[1].match).toEqual('hello (4567)');
    expect(match[0].groups['numbers']).toEqual('1234');
    expect(match[1].groups['numbers']).toEqual('4567');
    expect(match[0].groups['container']).toEqual('(1234)');
    expect(match[1].groups['container']).toEqual('(4567)');
  });
});
