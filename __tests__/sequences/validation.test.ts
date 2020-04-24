import Sequences from '../../src/sequences';

/**
 * sequence parameter validation test
 */
describe('sequence parameter validation test', () => {
  it('throws error if not given integer or sequence param', () => {
    expect(() => {
      Sequences.numbers('test string');
    }).toThrowError('If you pass a primitive as a sequence parameter, it must be of type integer');
  });

  it('throws error if not given integer for length param', () => {
    expect(() => {
      Sequences.numbers({ length: 'test string' });
    }).toThrowError('Length must be an integer');
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
