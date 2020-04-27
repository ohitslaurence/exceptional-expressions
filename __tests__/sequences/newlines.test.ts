import Sequences from '../../src/sequences';
import Constants from '../../src/constants';
import { formatInternalExpression } from '../../src/helpers';

/**
 * newlines sequence test
 */
describe('newlines sequence test', () => {
  const expression: string = formatInternalExpression(Constants.newline);

  it('return correct expression given length as integer', () => {
    const sequence = Sequences.newlines(3);
    const sequence2 = Sequences.newlines(6);
    const sequence3 = Sequences.newlines(12);
    const sequence4 = Sequences.newlines(0);

    expect(sequence).toEqual(`~~[${expression}]{3}`);
    expect(sequence2).toEqual(`~~[${expression}]{6}`);
    expect(sequence3).toEqual(`~~[${expression}]{12}`);
    expect(sequence4).toEqual(`~~[${expression}]{0}`);
  });

  it('returns correct regex given length', () => {
    const sequence = Sequences.newlines(3);
    const sequence2 = Sequences.newlines(6);

    expect(new RegExp(formatInternalExpression(sequence)).test('\n'.repeat(3))).toBeTruthy();
    expect(new RegExp(formatInternalExpression(sequence)).test('\n'.repeat(2))).toBeFalsy();
    expect(new RegExp(formatInternalExpression(sequence2)).test('\n'.repeat(6))).toBeTruthy();
    expect(new RegExp(formatInternalExpression(sequence2)).test('\n'.repeat(2))).toBeFalsy();
  });

  it('returns correct expression given length as property', () => {
    const sequence = Sequences.newlines({ length: 3 });

    expect(sequence).toEqual(`~~[${expression}]{3}`);
  });

  it('returns correct regex given length as property', () => {
    const sequence = Sequences.newlines({ length: 3 });

    expect(new RegExp(formatInternalExpression(sequence)).test('\n\n\n')).toBeTruthy();
  });

  it('length overrides min/max', () => {
    const sequence = Sequences.newlines({ length: 3, min: 2, max: 6 });

    expect(sequence).toEqual(`~~[${expression}]{3}`);
  });

  it('defaults min to 1', () => {
    const sequence = Sequences.newlines({ max: 3 });

    expect(sequence).toEqual(`~~[${expression}]{1,3}`);
  });

  it('returns correct regex given only max', () => {
    const sequence = Sequences.newlines({ max: 6 });

    expect(new RegExp(formatInternalExpression(sequence)).test('')).toBeFalsy();
    expect(new RegExp(formatInternalExpression(sequence)).test('\n'.repeat(2))).toBeTruthy();
    expect(new RegExp(formatInternalExpression(sequence)).test('\n'.repeat(3))).toBeTruthy();
    expect(
      new RegExp('test' + sequence + 'test').test('test' + '\n'.repeat(20) + 'test')
    ).toBeFalsy();
  });

  it('defaults max to unlimited', () => {
    const sequence = Sequences.newlines({ min: 3 });

    expect(sequence).toEqual(`~~[${expression}]{3,}`);
  });

  it('returns correct regex given only min', () => {
    const sequence = Sequences.newlines({ min: 3 });

    expect(new RegExp(formatInternalExpression(sequence)).test('\n'.repeat(2))).toBeFalsy();
    expect(new RegExp(formatInternalExpression(sequence)).test('\n'.repeat(3))).toBeTruthy();
    expect(new RegExp(formatInternalExpression(sequence)).test('\n'.repeat(20))).toBeTruthy();
  });

  it('bounds the expression if min and max provided', () => {
    const sequence = Sequences.newlines({ min: 3, max: 6 });

    expect(sequence).toEqual(`~~[${expression}]{3,6}`);
  });

  it('returns correct regex given bounds', () => {
    const sequence = Sequences.newlines({ min: 3, max: 6 });

    expect(new RegExp(formatInternalExpression(sequence)).test('\n'.repeat(3))).toBeTruthy();
    expect(new RegExp(formatInternalExpression(sequence)).test('\r'.repeat(6))).toBeTruthy();
    expect(new RegExp(formatInternalExpression(sequence)).test('\n'.repeat(4))).toBeTruthy();
    expect(new RegExp(formatInternalExpression(sequence)).test('\n'.repeat(2))).toBeFalsy();
    expect(
      new RegExp('test' + sequence + 'test').test('test' + '\n'.repeat(7) + 'test')
    ).toBeFalsy();
  });

  it('returns correct regex given min as 0', () => {
    const sequence = Sequences.newlines({ min: 0, max: 6 });
    expect(new RegExp(formatInternalExpression(sequence)).test('')).toBeTruthy();
  });
});
