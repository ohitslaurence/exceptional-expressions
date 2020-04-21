import ExpressionBuilder from '../src/exceptional-expressions';
import Sequences from '../src/sequences';

/**
 * Dummy test
 */
describe('Dummy test', () => {
  it('works if true is truthy', () => {
    expect(true).toBeTruthy();
  });

  it('DummyClass is instantiable', () => {
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
