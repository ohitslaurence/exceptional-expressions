import Sequences from '../../src/sequences';
import Constants from '../../src/constants';
import { formatInternalExpression } from '../../src/utils';

/**
 * anything sequence test
 */
describe('anything sequence test', () => {
  const expression: string = Constants.anything;

  it('return correct expression given size as integer', () => {
    const sequence = Sequences.anything(3);
    const sequence2 = Sequences.anything(6);
    const sequence3 = Sequences.anything(12);
    const sequence4 = Sequences.anything(0);

    expect(sequence).toEqual(`~~${expression}{3}`);
    expect(sequence2).toEqual(`~~${expression}{6}`);
    expect(sequence3).toEqual(`~~${expression}{12}`);
    expect(sequence4).toEqual(`~~${expression}{0}`);
  });

  it('returns correct regex given size', () => {
    const sequence = Sequences.anything(3);
    const sequence2 = Sequences.anything(6);

    expect(new RegExp(formatInternalExpression(sequence)).test('4'.repeat(3))).toBeTruthy();
    expect(new RegExp(formatInternalExpression(sequence)).test('$'.repeat(2))).toBeFalsy();
    expect(new RegExp(formatInternalExpression(sequence2)).test('t'.repeat(6))).toBeTruthy();
    expect(new RegExp(formatInternalExpression(sequence2)).test('F'.repeat(2))).toBeFalsy();
  });

  it('returns correct expression given size as property', () => {
    const sequence = Sequences.anything({ size: 3 });

    expect(sequence).toEqual(`~~${expression}{3}`);
  });

  it('returns correct regex given size as property', () => {
    const sequence = Sequences.anything({ size: 3 });

    expect(new RegExp(formatInternalExpression(sequence)).test('2F$')).toBeTruthy();
  });

  it('size overrides min/max', () => {
    const sequence = Sequences.anything({ size: 3, min: 2, max: 6 });

    expect(sequence).toEqual(`~~${expression}{3}`);
  });

  it('defaults min to 1', () => {
    const sequence = Sequences.anything({ max: 3 });

    expect(sequence).toEqual(`~~${expression}{1,3}`);
  });

  it('returns correct regex given only max', () => {
    const sequence = Sequences.anything({ max: 6 });

    expect(new RegExp(formatInternalExpression(sequence)).test('')).toBeFalsy();
    expect(new RegExp(formatInternalExpression(sequence)).test('R'.repeat(2))).toBeTruthy();
    expect(new RegExp(formatInternalExpression(sequence)).test('5'.repeat(3))).toBeTruthy();
    expect(
      new RegExp('test' + formatInternalExpression(sequence) + 'test').test(
        'test' + 'R'.repeat(20) + 'test'
      )
    ).toBeFalsy();
  });

  it('defaults max to unlimited', () => {
    const sequence = Sequences.anything({ min: 3 });

    expect(sequence).toEqual(`~~${expression}{3,}`);
  });

  it('returns correct regex given only min', () => {
    const sequence = Sequences.anything({ min: 3 });

    expect(new RegExp(formatInternalExpression(sequence)).test('$'.repeat(2))).toBeFalsy();
    expect(new RegExp(formatInternalExpression(sequence)).test('T'.repeat(3))).toBeTruthy();
    expect(new RegExp(formatInternalExpression(sequence)).test('2'.repeat(20))).toBeTruthy();
  });

  it('bounds the expression if min and max provided', () => {
    const sequence = Sequences.anything({ min: 3, max: 6 });

    expect(sequence).toEqual(`~~${expression}{3,6}`);
  });

  it('returns correct regex given bounds', () => {
    const sequence = Sequences.anything({ min: 3, max: 6 });

    expect(new RegExp(formatInternalExpression(sequence)).test('6'.repeat(3))).toBeTruthy();
    expect(new RegExp(formatInternalExpression(sequence)).test('#'.repeat(6))).toBeTruthy();
    expect(new RegExp(formatInternalExpression(sequence)).test('W'.repeat(4))).toBeTruthy();
    expect(new RegExp(formatInternalExpression(sequence)).test('9'.repeat(2))).toBeFalsy();
    expect(
      new RegExp('test' + formatInternalExpression(sequence) + 'test').test(
        'test' + ' '.repeat(7) + 'test'
      )
    ).toBeFalsy();
  });

  it('returns correct regex given min as 0', () => {
    const sequence = Sequences.anything({ min: 0, max: 6 });
    expect(new RegExp(formatInternalExpression(sequence)).test('')).toBeTruthy();
  });
});
