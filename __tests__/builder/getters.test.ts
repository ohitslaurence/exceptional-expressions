import ExpressionBuilder from '../../src/exceptional-expressions';
import { group } from '../../src/utils';
import Constants from '../../src/constants';

describe('expression-builder getters test', () => {
  let builder: ExpressionBuilder = new ExpressionBuilder();

  beforeEach(() => {
    builder.reset();
  });

  it('returns modifiers', () => {
    expect(builder.getFlags()).toEqual(['g']);
  });

  it('returns capture groups', () => {
    builder
      .beginsWith(Constants.number)
      .followedBy(
        group(
          [
            group([group(['hello', 'yes'], 'third'), 'smile']),
            [group(Constants.number, 'fourth'), Constants.symbol],
          ],
          'first'
        )
      )
      .followedBy('goodbye');
    expect(builder.getCaptureGroups()).toEqual(['first', 2, 'third', 'fourth']);
  });
});
