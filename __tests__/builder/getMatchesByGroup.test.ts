import ExpressionBuilder from '../../src/exceptional-expressions';
import { group } from '../../src/utils';
// import Sequences from '../../src/sequences';
import Constants from '../../src/constants';

describe('getMatches test', () => {
  let builder: ExpressionBuilder = new ExpressionBuilder('g');
  let match: string | any[];

  beforeEach(() => {
    builder.reset();
  });

  it('extracts all groups by name', () => {
    builder
      .contains(group([Constants.word, '.', Constants.word], 'username'))
      .followedBy('@')
      .followedBy(
        group([group(Constants.word, 'company'), '.', group(Constants.word, 'tld')], 'domain')
      );

    match = builder.getMatchesByGroup('test.person@example.com, another.guy@test.io', 'username');
    expect(match.length).toEqual(2);
    expect(match).toEqual(['test.person', 'another.guy']);

    match = builder.getMatchesByGroup('test.person@example.com, another.guy@test.io', 'company');
    expect(match.length).toEqual(2);
    expect(match).toEqual(['example', 'test']);

    match = builder.getMatchesByGroup('test.person@example.com, another.guy@test.io', 'domain');
    expect(match.length).toEqual(2);
    expect(match).toEqual(['example.com', 'test.io']);

    match = builder.getMatchesByGroup('test.person@example.com, another.guy@test.io', 'tld');
    expect(match.length).toEqual(2);
    expect(match).toEqual(['com', 'io']);
  });

  it('extracts all groups by index', () => {
    builder
      .contains(group([Constants.word, '.', Constants.word]))
      .followedBy('@')
      .followedBy(group([group(Constants.word), '.', group(Constants.word)]));

    match = builder.getMatchesByGroup('test.person@example.com, another.guy@test.io', 1);
    expect(match.length).toEqual(2);
    expect(match).toEqual(['test.person', 'another.guy']);

    match = builder.getMatchesByGroup('test.person@example.com, another.guy@test.io', 3);
    expect(match.length).toEqual(2);
    expect(match).toEqual(['example', 'test']);

    match = builder.getMatchesByGroup('test.person@example.com, another.guy@test.io', 2);
    expect(match.length).toEqual(2);
    expect(match).toEqual(['example.com', 'test.io']);

    match = builder.getMatchesByGroup('test.person@example.com, another.guy@test.io', 4);
    expect(match.length).toEqual(2);
    expect(match).toEqual(['com', 'io']);
  });

  it('extracts exmpty array where invalid group given', () => {
    builder
      .contains(group([Constants.word, '.', Constants.word]))
      .followedBy('@')
      .followedBy(group([group(Constants.word), '.', group(Constants.word)]));

    match = builder.getMatchesByGroup('test.person@example.com, another.guy@test.io', 'test');
    expect(match.length).toEqual(0);
  });
});
