import ExpressionBuilder from '../src/exceptional-expressions';

/**
 * ExpressionBuilder test
 */
describe('ExpressionBuilder test', () => {
  it('works if true is truthy', () => {
    expect(true).toBeTruthy();
  });

  it('ExpressionBuilder is instantiable', () => {
    expect(new ExpressionBuilder()).toBeInstanceOf(ExpressionBuilder);
  });
});
