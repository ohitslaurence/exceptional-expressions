import ExpressionBuilder from '../../src/exceptional-expressions';
import Constants from '../../src/constants';
import Sequences from '../../src/sequences';

/**
 * followedBy test
 */
describe('followedBy test', () => {
  let builder: ExpressionBuilder = new ExpressionBuilder();

  beforeEach(() => {
    builder.reset();
  });

  it('throws error if no begins with or contains statement', () => {
    expect(() => {
      builder.followedBy('something');
    }).toThrowError('followedBy by must be preceeded by beginsWith or a contains statement');
  });

  it('throws error if no begins with or contains statement but endsWith given', () => {
    expect(() => {
      builder.endsWith('hello').followedBy('something');
    }).toThrowError('followedBy by must be preceeded by beginsWith or a contains statement');
  });

  it('adds expression after begins statement', () => {
    builder.beginsWith(Constants.number).followedBy('hello');

    expect(builder.matchesString('2hello')).toBeTruthy();
    expect(builder.matchesString('hello')).toBeFalsy();
    expect(builder.toRegex()).toEqual(/^\dhello/g);
  });

  it('accepts constants and sequences', () => {
    builder.beginsWith(Constants.number).followedBy(Constants.symbol);

    expect(builder.matchesString('2)')).toBeTruthy();
    expect(builder.matchesString('2hello')).toBeFalsy();
    builder.reset();
    builder.beginsWith(Constants.symbol).followedBy(Sequences.numbers(4));

    expect(builder.matchesString('!1234')).toBeTruthy();
    expect(builder.matchesString('!23')).toBeFalsy();
  });

  it('chains multiple', () => {
    builder
      .beginsWith(Constants.number)
      .followedBy(['hello', Constants.number])
      .followedBy('goodbye');

    expect(builder.matchesString('2hello2goodbye')).toBeTruthy();
    expect(builder.matchesString('hellogoodbye')).toBeFalsy();
  });

  it('optional parameter returns optional statement', () => {
    builder
      .beginsWith(Constants.number)
      .followedBy(['hello', Constants.number], true)
      .followedBy('goodbye');

    expect(builder.matchesString('2hello2goodbye')).toBeTruthy();
    expect(builder.matchesString('2goodbye')).toBeTruthy();
    expect(builder.toRegex()).toEqual(/^\d(?:hello\d)?goodbye/g);
  });

  it('optionallyFollowedBy returns followed by with optional parameter', () => {
    builder
      .beginsWith(Constants.number)
      .optionallyFollowedBy(['hello', Constants.number])
      .followedBy('goodbye');

    expect(builder.matchesString('2hello2goodbye')).toBeTruthy();
    expect(builder.matchesString('2goodbye')).toBeTruthy();
    expect(builder.toRegex()).toEqual(/^\d(?:hello\d)?goodbye/g);
  });
});
