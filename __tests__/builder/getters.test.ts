import ExpressionBuilder from '../../src/exceptional-expressions';

describe('expression-builder getters test', () => {
  let builder: ExpressionBuilder = new ExpressionBuilder();
  it('returns modifiers', () => {
    expect(builder.getModifiers()).toEqual(['g']);
  });
});
