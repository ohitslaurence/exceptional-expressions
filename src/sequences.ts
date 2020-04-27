import Constants from './constants';
import { formatInternalExpression } from './helpers';

const validateParameters: (params: ISequenceParams | any) => void = (params: ISequenceParams) => {
  if (!isSequenceParam(params) && !Number.isInteger(<any>params)) {
    throw new Error('If you pass a primitive as a sequence parameter, it must be of type integer');
  }

  if (params.hasOwnProperty('length') && !Number.isInteger(<any>params.length)) {
    throw new Error('Length must be an integer');
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
    typeof params === 'object' &&
    (params.hasOwnProperty('length') ||
      params.hasOwnProperty('min') ||
      params.hasOwnProperty('max'))
  );
};

const lengthFromParams = (params: ISequenceParams | any) => {
  return params.hasOwnProperty('length') || Number.isInteger(params);
};

const sequenceOfSize = (
  params: ISequenceParams | any,
  expression: string,
  brackets: boolean = true
): string => {
  const length: number = params.length || params;
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
  length?: number;
}

export default {
  whitespace(params: ISequenceParams | any) {
    validateParameters(params);

    const expression: string = formatInternalExpression(Constants.whitespace);

    if (lengthFromParams(params)) {
      return sequenceOfSize(params, expression);
    }

    return sequenceByBounds(params, expression);
  },
  newlines(params: ISequenceParams | any) {
    validateParameters(params);

    const expression: string = formatInternalExpression(Constants.newline);

    if (lengthFromParams(params)) {
      return sequenceOfSize(params, expression);
    }

    return sequenceByBounds(params, expression);
  },
  numbers(params: ISequenceParams | any) {
    validateParameters(params);

    const expression: string = formatInternalExpression(Constants.number);

    if (lengthFromParams(params)) {
      return sequenceOfSize(params, expression);
    }

    return sequenceByBounds(params, expression);
  },
  symbols(params: ISequenceParams | any) {
    validateParameters(params);

    const expression: string = formatInternalExpression(Constants.symbol);

    if (lengthFromParams(params)) {
      return sequenceOfSize(params, expression, false);
    }

    return sequenceByBounds(params, expression, false);
  },
  // words(params: ISequenceParams) {
  //   validateParameters(params, 'Minimum number of words cannot be greater than the max');

  //   if (min === 0 && max === 0) {
  //     return '(?:[\\w\']+\\s)+[\\w\']+\\b';
  //   }
  //   return `(?:[\\w\']+\\s){${min - 1 >= 0 ? min - 1 : 0},${
  //     max - 1 >= 0 ? max - 1 : 0
  //   }}[\\w\']+\\b`;
  // },
  anything(params: ISequenceParams | any) {
    validateParameters(params);

    const expression: string = formatInternalExpression(Constants.anything);

    if (lengthFromParams(params)) {
      return sequenceOfSize(params, expression, false);
    }

    return sequenceByBounds(params, expression, false);
  },
};
