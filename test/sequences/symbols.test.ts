import Sequences from '../../src/sequences';
import { formatInternalExpression } from '../../src/utils';

/**
 * symbols sequence test
 */
describe('symbols sequence test', () => {
  const expression: string = '\\W';

  it('return correct expression given size as integer', () => {
    const sequence = Sequences.symbols(3);
    const sequence2 = Sequences.symbols(6);
    const sequence3 = Sequences.symbols(12);
    const sequence4 = Sequences.symbols(0);

    expect(sequence).toEqual(`~~[${expression}]{3}`);
    expect(sequence2).toEqual(`~~[${expression}]{6}`);
    expect(sequence3).toEqual(`~~[${expression}]{12}`);
    expect(sequence4).toEqual(`~~[${expression}]{0}`);
  });

  it('returns correct regex given size', () => {
    const sequence = Sequences.symbols(3);
    const sequence2 = Sequences.symbols(6);

    expect(new RegExp(formatInternalExpression(sequence)).test('!'.repeat(3))).toBeTruthy();
    expect(new RegExp(formatInternalExpression(sequence)).test('@'.repeat(2))).toBeFalsy();
    expect(new RegExp(formatInternalExpression(sequence2)).test('#'.repeat(6))).toBeTruthy();
    expect(new RegExp(formatInternalExpression(sequence2)).test('&'.repeat(2))).toBeFalsy();
  });

  it('returns correct expression given size as property', () => {
    const sequence = Sequences.symbols({ size: 3 });

    expect(sequence).toEqual(`~~[${expression}]{3}`);
  });

  it('returns correct regex given size as property', () => {
    const sequence = Sequences.symbols({ size: 3 });

    expect(new RegExp(formatInternalExpression(sequence)).test('!)#')).toBeTruthy();
  });

  it('size overrides min/max', () => {
    const sequence = Sequences.symbols({ size: 3, min: 2, max: 6 });

    expect(sequence).toEqual(`~~[${expression}]{3}`);
  });

  it('defaults min to 1', () => {
    const sequence = Sequences.symbols({ max: 3 });

    expect(sequence).toEqual(`~~[${expression}]{1,3}`);
  });

  it('returns correct regex given only max', () => {
    const sequence = Sequences.symbols({ max: 6 });

    expect(new RegExp(formatInternalExpression(sequence)).test('')).toBeFalsy();
    expect(new RegExp(formatInternalExpression(sequence)).test('#'.repeat(2))).toBeTruthy();
    expect(new RegExp(formatInternalExpression(sequence)).test('$'.repeat(3))).toBeTruthy();
    expect(
      new RegExp('test' + formatInternalExpression(sequence) + 'test').test(
        'test' + '$'.repeat(20) + 'test'
      )
    ).toBeFalsy();
  });

  it('defaults max to unlimited', () => {
    const sequence = Sequences.symbols({ min: 3 });

    expect(sequence).toEqual(`~~[${expression}]{3,}`);
  });

  it('returns correct regex given only min', () => {
    const sequence = Sequences.symbols({ min: 3 });

    expect(new RegExp(formatInternalExpression(sequence)).test('$'.repeat(2))).toBeFalsy();
    expect(new RegExp(formatInternalExpression(sequence)).test('%'.repeat(3))).toBeTruthy();
    expect(new RegExp(formatInternalExpression(sequence)).test('@'.repeat(20))).toBeTruthy();
  });

  it('bounds the expression if min and max provided', () => {
    const sequence = Sequences.symbols({ min: 3, max: 6 });

    expect(sequence).toEqual(`~~[${expression}]{3,6}`);
  });

  it('returns correct regex given bounds', () => {
    const sequence = Sequences.symbols({ min: 3, max: 6 });

    expect(new RegExp(formatInternalExpression(sequence)).test('#'.repeat(3))).toBeTruthy();
    expect(new RegExp(formatInternalExpression(sequence)).test('@'.repeat(6))).toBeTruthy();
    expect(new RegExp(formatInternalExpression(sequence)).test('('.repeat(4))).toBeTruthy();
    expect(new RegExp(formatInternalExpression(sequence)).test('*'.repeat(2))).toBeFalsy();
    expect(
      new RegExp('test' + formatInternalExpression(sequence) + 'test').test(
        'test' + '&'.repeat(7) + 'test'
      )
    ).toBeFalsy();
  });

  it('returns correct regex given min as 0', () => {
    const sequence = Sequences.symbols({ min: 0, max: 6 });
    expect(new RegExp(formatInternalExpression(sequence)).test('')).toBeTruthy();
  });

  it('throws error if not given integer or sequence param', () => {
    expect(() => {
      Sequences.symbols('test string');
    }).toThrowError('If you pass a primitive as a sequence parameter, it must be of type integer');
  });

  it('throws error if not given integer for size param', () => {
    expect(() => {
      Sequences.symbols({ size: 'test string' });
    }).toThrowError('Size must be an integer');
  });

  it('throws error if not given integer for min param', () => {
    expect(() => {
      Sequences.symbols({ min: 'test string' });
    }).toThrowError('Minimum must be an integer');
  });

  it('throws error if not given integer for max param', () => {
    expect(() => {
      Sequences.symbols({ max: 'test string' });
    }).toThrowError('Maximum must be an integer');
  });

  it('throws min error if not given integer for either max or min', () => {
    expect(() => {
      Sequences.symbols({ max: 'test string', min: 'Another string' });
    }).toThrowError('Minimum must be an integer');
  });

  it('throws error if min is greater than max', () => {
    expect(() => {
      Sequences.symbols({ max: 2, min: 4 });
    }).toThrowError('Minimum cannot be greater than the maximum');
  });
});
