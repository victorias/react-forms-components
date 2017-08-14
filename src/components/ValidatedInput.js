// @flow

import cx from 'classnames';
import React, { Component } from 'react';

import * as validators from '../lib/validators';

import type { ValidatedValue } from '../types/validated-value';

type FunctionComponent<P> = (props: P) => ?React$Element<any>;
type ClassComponent<D, P, S> = Class<React$Component<D, P, S>>;

type Props = {
  inputClassName: ClassComponent<*, *, *> | FunctionComponent<*>,
  maxLength?: number,
  minLength?: number,
  onChange: (value: ValidatedValue) => void,
  validator?: (value: string) => boolean,
  value: ValidatedValue,
  invalidClassName?: string,
  validClassName?: string,
  className?: string,
};

type State = {
  focused: boolean,
  touched: boolean,
};

const HTMLInput = props => <input {...props} />;

class ValidatedInput extends Component {
  props: Props;
  state: State;

  static defaultProps = {
    inputClassName: HTMLInput,
  };

  state: State = {
    touched: false,
    focused: false,
  };

  validator = (changeValue?: string) => {
    const { props } = this;
    const value = changeValue !== undefined ? changeValue : props.value.value;

    return validators.validateInput({
      value,
      minLength: props.minLength,
      maxLength: props.maxLength,
      validator: props.validator,
    });
  };

  onChange = (value: string) => {
    const { props } = this;
    const validatedValue = {
      value,
      isValid: this.validator(value),
    };
    props.onChange(validatedValue);
  };

  onFocus = () => {
    this.setState({
      focused: true,
      touched: true,
    });
  };

  onBlur = () => {
    this.setState({
      focused: false,
    });
  };

  getInputStyle = () => {
    const { props, state } = this;

    if (state.touched) {
      if (!state.focused && !this.validator(props.value.value)) {
        return props.invalidClassName;
      }
    }

    return props.validClassName;
  };

  render() {
    const { props } = this;
    const InputClass = props.inputClassName;

    return (
      <InputClass
        onChange={this.onChange}
        className={cx(props.className, this.getInputStyle())}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
      />
    );
  }
}

export default ValidatedInput;
