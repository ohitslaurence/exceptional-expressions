import Constants from './constants';

const validateParameters: (params: ISequenceParams | any) => void = (params: ISequenceParams) => {
  if (!isSequenceParam(params) && !Number.isInteger(<any>params)) {
    throw new Error('If you pass a primitive as a sequence parameter, it must be of type integer');
  }

  if (params.hasOwnProperty('size') && !Number.isInteger(<any>params.size)) {
    throw new Error('Size must be an integer');
  }

  if (params.min || params.max) {
    if (params.min && !Number.isInteger(params.min)) {
      throw new Error('Minimum must be an integer');
    }

    if (params.max && !Number.isInteger(params.max)) {
      throw new Error('Maximum must be an integer');
    }

    if (params.min && params.max && params.min > params.max)
      throw new Error('Minimum cannot be greater than the maximum');
  }
};

const isSequenceParam: (params: any) => boolean = (params: any): boolean => {
  return (
    params.hasOwnProperty('size') || params.hasOwnProperty('min') || params.hasOwnProperty('max')
  );
};

const lengthFromParams = (params: ISequenceParams | any) => {
  return params.hasOwnProperty('size') || Number.isInteger(params);
};

const sequenceOfSize = (
  params: ISequenceParams | any,
  expression: string,
  brackets: boolean = true
): string => {
  const length: number = params.size || params;
  if (!brackets) {
    return `~~${expression}{${length}}`;
  }
  return `~~[${expression}]{${length}}`;
};

const sequenceByBounds = (
  params: ISequenceParams | any,
  expression: string,
  brackets: boolean = true
) => {
  const min: number = params.min === undefined ? 1 : params.min;
  const max: number | string = params.max === undefined ? '' : params.max;

  if (!brackets) {
    return `~~${expression}{${min},${max}}`;
  }
  return `~~[${expression}]{${min},${max}}`;
};

interface ISequenceParams {
  min?: number;
  max?: number;
  size?: number;
}

export default {
  whitespace(params: ISequenceParams | any) {
    validateParameters(params);

    const expression: string = Constants.whitespace;

    if (lengthFromParams(params)) {
      return sequenceOfSize(params, expression);
    }

    return sequenceByBounds(params, expression);
  },
  newlines(params: ISequenceParams | any) {
    validateParameters(params);

    const expression: string = Constants.newline;

    if (lengthFromParams(params)) {
      return sequenceOfSize(params, expression);
    }

    return sequenceByBounds(params, expression);
  },
  numbers(params: ISequenceParams | any) {
    validateParameters(params);

    const expression: string = '\\d';

    if (lengthFromParams(params)) {
      return sequenceOfSize(params, expression);
    }

    return sequenceByBounds(params, expression);
  },
  symbols(params: ISequenceParams | any) {
    validateParameters(params);

    const expression: string = Constants.symbol;

    if (lengthFromParams(params)) {
      return sequenceOfSize(params, expression, false);
    }

    return sequenceByBounds(params, expression, false);
  },
  // words(params: ISequenceParams) {
  //   validateParameters(params, 'Minimum number of words cannot be greater than the max');

  //   if (min === 0 && max === 0) {
  //     return '~~(?:[\\w\']+\\s)+[\\w\']+\\b';
  //   }
  //   return `~~(?:[\\w\']+\\s){${min - 1 >= 0 ? min - 1 : 0},${
  //     max - 1 >= 0 ? max - 1 : 0
  //   }}[\\w\']+\\b`;
  // },
  anything(params: ISequenceParams | any) {
    validateParameters(params);

    const expression: string = Constants.anything;

    if (lengthFromParams(params)) {
      return sequenceOfSize(params, expression, false);
    }

    return sequenceByBounds(params, expression, false);
  }
};
