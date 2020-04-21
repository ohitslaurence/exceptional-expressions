import Sequences from '../../src/sequences';
import { formatInternalExpression } from '../../src/utils';

/**
 * numbers sequence test
 */
describe('numbers sequence test', () => {
  const expression: string = '\\d';

  it('return correct expression given size as integer', () => {
    const sequence = Sequences.numbers(3);
    const sequence2 = Sequences.numbers(6);
    const sequence3 = Sequences.numbers(12);
    const sequence4 = Sequences.numbers(0);

    expect(sequence).toEqual(`~~[${expression}]{3}`);
    expect(sequence2).toEqual(`~~[${expression}]{6}`);
    expect(sequence3).toEqual(`~~[${expression}]{12}`);
    expect(sequence4).toEqual(`~~[${expression}]{0}`);
  });

  it('returns correct regex given size', () => {
    const sequence = Sequences.numbers(3);
    const sequence2 = Sequences.numbers(6);

    expect(new RegExp(formatInternalExpression(sequence)).test('4'.repeat(3))).toBeTruthy();
    expect(new RegExp(formatInternalExpression(sequence)).test('5'.repeat(2))).toBeFalsy();
    expect(new RegExp(formatInternalExpression(sequence2)).test('4'.repeat(6))).toBeTruthy();
    expect(new RegExp(formatInternalExpression(sequence2)).test('3'.repeat(2))).toBeFalsy();
  });

  it('returns correct expression given size as property', () => {
    const sequence = Sequences.numbers({ size: 3 });

    expect(sequence).toEqual(`~~[${expression}]{3}`);
  });

  it('returns correct regex given size as property', () => {
    const sequence = Sequences.numbers({ size: 3 });

    expect(new RegExp(formatInternalExpression(sequence)).test('234')).toBeTruthy();
  });

  it('size overrides min/max', () => {
    const sequence = Sequences.numbers({ size: 3, min: 2, max: 6 });

    expect(sequence).toEqual(`~~[${expression}]{3}`);
  });

  it('defaults min to 1', () => {
    const sequence = Sequences.numbers({ max: 3 });

    expect(sequence).toEqual(`~~[${expression}]{1,3}`);
  });

  it('returns correct regex given only max', () => {
    const sequence = Sequences.numbers({ max: 6 });

    expect(new RegExp(formatInternalExpression(sequence)).test('')).toBeFalsy();
    expect(new RegExp(formatInternalExpression(sequence)).test('4'.repeat(2))).toBeTruthy();
    expect(new RegExp(formatInternalExpression(sequence)).test('5'.repeat(3))).toBeTruthy();
    expect(
      new RegExp('test' + formatInternalExpression(sequence) + 'test').test(
        'test' + '4'.repeat(20) + 'test'
      )
    ).toBeFalsy();
  });

  it('defaults max to unlimited', () => {
    const sequence = Sequences.numbers({ min: 3 });

    expect(sequence).toEqual(`~~[${expression}]{3,}`);
  });

  it('returns correct regex given only min', () => {
    const sequence = Sequences.numbers({ min: 3 });

    expect(new RegExp(formatInternalExpression(sequence)).test('6'.repeat(2))).toBeFalsy();
    expect(new RegExp(formatInternalExpression(sequence)).test('3'.repeat(3))).toBeTruthy();
    expect(new RegExp(formatInternalExpression(sequence)).test('2'.repeat(20))).toBeTruthy();
  });

  it('bounds the expression if min and max provided', () => {
    const sequence = Sequences.numbers({ min: 3, max: 6 });

    expect(sequence).toEqual(`~~[${expression}]{3,6}`);
  });

  it('returns correct regex given bounds', () => {
    const sequence = Sequences.numbers({ min: 3, max: 6 });

    expect(new RegExp(formatInternalExpression(sequence)).test('6'.repeat(3))).toBeTruthy();
    expect(new RegExp(formatInternalExpression(sequence)).test('7'.repeat(6))).toBeTruthy();
    expect(new RegExp(formatInternalExpression(sequence)).test('8'.repeat(4))).toBeTruthy();
    expect(new RegExp(formatInternalExpression(sequence)).test('9'.repeat(2))).toBeFalsy();
    expect(
      new RegExp('test' + formatInternalExpression(sequence) + 'test').test(
        'test' + ' '.repeat(7) + 'test'
      )
    ).toBeFalsy();
  });

  it('returns correct regex given min as 0', () => {
    const sequence = Sequences.numbers({ min: 0, max: 6 });
    expect(new RegExp(formatInternalExpression(sequence)).test('')).toBeTruthy();
  });

  it('throws error if not given integer or sequence param', () => {
    expect(() => {
      Sequences.numbers('test string');
    }).toThrowError('If you pass a primitive as a sequence parameter, it must be of type integer');
  });

  it('throws error if not given integer for size param', () => {
    expect(() => {
      Sequences.numbers({ size: 'test string' });
    }).toThrowError('Size must be an integer');
  });

  it('throws error if not given integer for min param', () => {
    expect(() => {
      Sequences.numbers({ min: 'test string' });
    }).toThrowError('Minimum must be an integer');
  });

  it('throws error if not given integer for max param', () => {
    expect(() => {
      Sequences.numbers({ max: 'test string' });
    }).toThrowError('Maximum must be an integer');
  });

  it('throws min error if not given integer for either max or min', () => {
    expect(() => {
      Sequences.numbers({ max: 'test string', min: 'Another string' });
    }).toThrowError('Minimum must be an integer');
  });

  it('throws error if min is greater than max', () => {
    expect(() => {
      Sequences.numbers({ max: 2, min: 4 });
    }).toThrowError('Minimum cannot be greater than the maximum');
  });
});
