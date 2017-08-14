// @flow

import invariant from 'invariant';

import type { ValidatedValue } from '../types/validated-value';

export const notEmpty = (value: string) => {
  return value.replace(/\s/g, '').length > 0;
};

export const validateInput = ({
  value,
  minLength = 1,
  maxLength = 9999999,
  validator,
}: {
  value: string,
  minLength?: number,
  maxLength?: number,
  validator?: (value: string) => boolean,
}) => {
  const validations = [
    () => value.length >= minLength,
    () => value.length <= maxLength,
    () => {
      return validator ? validator(value) : true;
    },
    () => notEmpty(value),
  ];
  return validations.every(test => test());
};

export const validateForm = (state: {
  [key: string]: ValidatedValue | any,
}) => {
  const validatedInputs = Object.keys(state).filter(key => {
    const val = state[key];
    return val !== null && typeof val === 'object' && 'isValid' in val;
  });
  invariant(
    validatedInputs.length > 0,
    'validators.validateForm must be used with ValidatedValues'
  );
  return validatedInputs.every(key => state[key].isValid);
};
