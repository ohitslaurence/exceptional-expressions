import ExpressionBuilder from '../../src/exceptional-expressions';
import { or, anythingBut } from '../../src/utils';
import Constants from '../../src/constants';
import Sequences from '../../src/sequences';

/**
 * builder outputs test
 */
describe('builder outputs test', () => {
  let builder: ExpressionBuilder = new ExpressionBuilder();

  beforeEach(() => {
    builder.reset();
  });

  it('matches first test sequence', () => {
    builder
      .beginsWith(or(['hello', 'goodbye']))
      .followedBy(' test ')
      .followedBy(Constants.word);

    expect(builder.matchesString('hello test word')).toBeTruthy();
    expect(builder.matchesString('goodbye test word')).toBeTruthy();
    expect(builder.matchesString('goodbye test anyword')).toBeTruthy();
    expect(builder.matchesString('yellow test anyword')).toBeFalsy();
  });

  it('matches second test sequence', () => {
    builder.beginsWith(anythingBut('test')).followedBy(' blue').endsWith(Constants.symbol);

    expect(builder.matchesString('test blue!')).toBeFalsy();
    expect(builder.matchesString('green blue!')).toBeTruthy();
    expect(builder.matchesString('yellow test anyword')).toBeFalsy();
  });

  it('matches third test sequence', () => {
    builder
      .beginsWith(
        Sequences.anything({
          max: 20,
        })
      )
      .followedBy('@')
      .followedBy(Constants.word)
      .followedBy('.')
      .endsWith(Constants.word);

    expect(builder.matchesString('test@test.com')).toBeTruthy();
    expect(builder.matchesString('!!!@blue.c')).toBeTruthy();
    expect(builder.matchesString('!!!@test anyword')).toBeFalsy();
  });

  it('matches fourth test sequence', () => {
    builder
      .beginsWith(anythingBut('@'))
      .followedBy(['@', Constants.word, '.'])
      .endsWith(or(['com', 'co', 'io', 'net']));

    expect(builder.matchesString('test@test.com')).toBeTruthy();
    expect(builder.matchesString('!!!@blue.co')).toBeTruthy();
    expect(builder.matchesString('!!!@test.ion')).toBeFalsy();
  });

  it('matches fifth test sequence', () => {
    builder.contains('hello');

    expect(builder.matchesString('test string hello')).toBeTruthy();
    expect(builder.matchesString('hello hello hello')).toBeTruthy();
    expect(builder.matchesString('strings to test')).toBeFalsy();
  });

  it('matches sixth test sequence', () => {
    builder.contains('hello').orContains('blue');

    expect(builder.matchesString('test string hello')).toBeTruthy();
    expect(builder.matchesString('blue blue blue')).toBeTruthy();
    expect(builder.matchesString('strings to test')).toBeFalsy();
  });

  it('matches seventh test sequence', () => {
    builder
      .beginsWith(or(['Hello', 'Goodbye']))
      .followedBy(Constants.whitespace)
      .endsWith(anythingBut('world'));

    expect(builder.matchesString('Hello world')).toBeFalsy();
    expect(builder.matchesString('Goodbye Earth')).toBeTruthy();
    expect(builder.matchesString('hello world')).toBeFalsy();
    expect(builder.matchesString('helloearth')).toBeFalsy();
  });
});
