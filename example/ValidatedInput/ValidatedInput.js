// @flow

import React from 'react';

import { ValidatedInput as ReactValidatedInput } from '../../src/';
import './ValidatedInput.css';

import type { ValidatedValue } from '../../src';

const ValidatedInput = ({
  value,
  onChange,
}: {
  value: ValidatedValue,
  onChange: (value: ValidatedValue) => void,
}) =>
  <ReactValidatedInput
    value={value}
    onChange={onChange}
    className="input"
    invalidClassName="invalid"
    validClassName="valid"
  />;

export default ValidatedInput;
