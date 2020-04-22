import ExpressionBuilder from '../src/exceptional-expressions';
import Sequences from '../src/sequences';

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

  // it('DummyClass is instantiable', () => {
  //   const builder = new ExpressionBuilder();
  //   builder.beginsWith(Sequences.whitespace({ length: 3 }));
  //   console.log(builder.getRegularExpression());
  //   console.log(builder.getRegularExpression().test('  '));
  //   expect(builder).toBeInstanceOf(ExpressionBuilder);
  // });
});
