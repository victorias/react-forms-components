// @flow

import * as validators from '../validators';

describe('validators', () => {
  it('exists', () => {
    expect(validators).not.toBe(null);
    expect(validators).not.toBe(undefined);
  });

  describe('.notEmpty', () => {
    it('validates that strings are not empty', () => {
      expect(validators.notEmpty('1')).toBe(true);
      expect(validators.notEmpty('a')).toBe(true);
      expect(validators.notEmpty('a1')).toBe(true);
    });

    it('fails on empty strings', () => {
      expect(validators.notEmpty('')).toBe(false);
      expect(validators.notEmpty('      ')).toBe(false);
    });
  });

  describe('.validateInput', () => {
    it('validates that a value exists', () => {
      expect(validators.validateInput({ value: 'value' })).toBe(true);
      expect(validators.validateInput({ value: 'v' })).toBe(true);
      expect(validators.validateInput({ value: '' })).toBe(false);
      expect(validators.validateInput({ value: '    ' })).toBe(false);
    });

    it('validates a value is greater than or equal to a minLength', () => {
      expect(validators.validateInput({ value: '1', minLength: 2 })).toBe(
        false
      );
      expect(validators.validateInput({ value: '11', minLength: 2 })).toBe(
        true
      );
      expect(validators.validateInput({ value: '1111', minLength: 2 })).toBe(
        true
      );
    });

    it('validates a value is less than or equal to a maxLength', () => {
      expect(validators.validateInput({ value: '1', maxLength: 2 })).toBe(true);
      expect(validators.validateInput({ value: '11', maxLength: 2 })).toBe(
        true
      );
      expect(validators.validateInput({ value: '111', maxLength: 2 })).toBe(
        false
      );
    });

    it('validates a value with a validator function', () => {
      const validator = value => value.includes('a');
      expect(validators.validateInput({ value: '1', validator })).toBe(false);
      expect(validators.validateInput({ value: 'a', validator })).toBe(true);
      expect(validators.validateInput({ value: '1a', validator })).toBe(true);
    });
  });

  describe('.validateForm', () => {
    it('validates form state trees with no other state information', () => {
      expect(
        validators.validateForm({
          validated: { isValid: true, value: '' },
        })
      ).toBe(true);

      expect(
        validators.validateForm({
          validated: { isValid: true, value: '' },
          validated2: { isValid: true, value: '' },
        })
      ).toBe(true);

      expect(
        validators.validateForm({
          validated: { isValid: true, value: '' },
          validated2: { isValid: true, value: '' },
          validated3: { isValid: true, value: '', explanation: '' },
        })
      ).toBe(true);
    });

    it('validates complex form state trees', () => {
      expect(
        validators.validateForm({
          validated: { isValid: true, value: '' },
          validated2: { isValid: true, value: '' },
          notValidated: false,
        })
      ).toBe(true);
    });

    it('fails validation when one or many input fails', () => {
      expect(
        validators.validateForm({
          validated: { isValid: false },
        })
      ).toBe(false);

      expect(
        validators.validateForm({
          validated: { isValid: true },
          validated2: { isValid: false },
        })
      ).toBe(false);
    });
  });
});
