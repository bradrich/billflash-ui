import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

const isEmptyInputValue = (value: any): boolean => {
  return value === null || value.length === 0;
};

const isPresent = (value: any): boolean => {
  return value !== undefined && value !== null;
};

const isDate = (value: any): boolean => {
  return !/Invalid|NaN/.test(new Date(value).toString());
};

const hasNoPunctuation = (value: string): boolean => {
  const punc = ['.', '?', '!', ';'];
  const lastChar = value.charAt(value.length - 1);
  return punc.indexOf(lastChar) === -1;
};

/**
 * @description
 * Provides a set of custom validators used by form controls.
 * Note: A validator is a function that processes a `FormControl` or collection of controls and
 * returns a map of errors. A null map means that validation has passed.
 * @example
 * ```typescript
 * const loginControl = new FormControl('', CustomValidators.min);
 * ```
 */
export class CustomValidators {

  /**
   * Validator that requires controls to have a value that has a length in a specific range.
   * @static
   * @param {Array<number>} rangeLength
   * @returns {ValidatorFn}
   */
  static rangeLength(rangeLength: Array<number>): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      if (!isPresent(rangeLength)) {
        return null;
      }
      if (isPresent(Validators.required(control))) {
        return null;
      }
      const v: string = control.value;
      return v.length >= rangeLength[0] && v.length <= rangeLength[1] ? null : {
        rangeLength: {
          requiredMin: rangeLength[0],
          requiredMax: rangeLength[1]
        }
      };
    };
  }

  /**
   * Validator that requires controls to have a value greater than or equal to a numeric value.
   * @static
   * @param {number} min
   * @returns {ValidatorFn}
   */
  static min(min: number): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      if (!isPresent(min)) {
        return null;
      }
      if (isPresent(Validators.required(control))) {
        return null;
      }
      const v: number = control.value;
      return v >= min ? null : { min: { requiredMin: min } };
    };
  }

  /**
   * Validator that requires controls to have a value less than or equal to a numeric value.
   * @static
   * @param {number} max
   * @returns {ValidatorFn}
   */
  static max(max: number): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      if (!isPresent(max)) {
        return null;
      }
      if (isPresent(Validators.required(control))) {
        return null;
      }
      const v: number = control.value;
      return v <= max ? null : { max: { requiredMax: max } };
    };
  }

  /**
   * Validator that requires controls to have a value within a specific numeric range.
   * @static
   * @param {Array<number>} range
   * @returns {ValidatorFn}
   */
  static range(range: Array<number>): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      if (!isPresent(range)) {
        return null;
      }
      if (isPresent(Validators.required(control))) {
        return null;
      }
      const v: number = control.value;
      return v >= range[0] && v <= range[1] ? null : {
        range: {
          requiredMin: range[0],
          requiredMax: range[1]
        }
      };
    };
  }

  /**
   * Validator that requires controls to have a value that matches a regular expression.
   * @static
   * @param {(string | RegExp)} pattern
   * @param {string} [patternDescription]
   * @returns {ValidatorFn}
   */
  static pattern(pattern: string | RegExp, patternDescription?: string): ValidatorFn {
    if (!pattern) {
      return Validators.nullValidator;
    }

    let regExp: RegExp;
    let regExpString: string;
    if (typeof pattern === 'string') {
      regExpString = `^${pattern}$`;
      regExp = new RegExp(regExpString);
    } else {
      regExpString = pattern.toString();
      regExp = pattern;
    }

    return (control: AbstractControl): {[key: string]: any} => {
      if (isEmptyInputValue(control.value)) {
        return null; // Don't validate empty values to allow for optional controls.
      }
      const v: string = control.value;
      return regExp.test(v) ? null : {
        pattern: {
          requiredPattern: regExpString,
          actualValue: v,
          patternDescription: patternDescription || regExpString
        }
      };
    };
  }

  /**
   * Validator that requires controls to have a value that is a number.
   * @static
   * @param {AbstractControl} control
   * @returns {<{[key: string]: boolean}>}
   */
  static number(control: AbstractControl): {[key: string]: boolean} {
    if (isPresent(Validators.required(control))) {
      return null;
    }
    const v: any = control.value;
    return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(v) ? null : { number: true };
  }

  /**
   * Validator that requires controls to have a value that is an integer.
   * @static
   * @param {AbstractControl} control
   * @returns {<{[key: string]: boolean}>}
   */
  static integer(control: AbstractControl): {[key: string]: boolean} {
    if (isPresent(Validators.required(control))) {
      return null;
    }
    const v: any = control.value;
    return Number.isInteger(v) ? null : { integer: true };
  }

  /**
   * Validator that requires controls to have a value that is a URL.
   * @static
   * @param {AbstractControl} control
   * @returns {<{[key: string]: boolean}>}
   */
  static url(control: AbstractControl): {[key: string]: boolean} {
    if (isPresent(Validators.required(control))) {
      return null;
    }
    const v: string = control.value;
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i
        .test(v) ? null : { url: true };
  }

  /**
   * Validator that requires controls to have a value that is an email.
   * @static
   * @param {AbstractControl} control
   * @returns {<{[key: string]: boolean}>}
   */
  static email(control: AbstractControl): {[key: string]: boolean} {
    if (isPresent(Validators.required(control))) {
      return null;
    }
    const v: string = control.value;
    return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        .test(v) ? null : { email: true };
  }

  /**
   * Validator that requires controls to have a value that is a date.
   * @static
   * @param {AbstractControl} control
   * @returns {<{[key: string]: boolean}>}
   */
  static date(control: AbstractControl): {[key: string]: boolean} {
    if (isPresent(Validators.required(control))) {
      return null;
    }
    const v: string = control.value;
    return !/Invalid|NaN/.test(new Date(v).toString()) ? null : { date: true };
  }

  /**
   * Validator that requires controls to have a value that is a date after a specific date.
   * @static
   * @param {*} minDate
   * @returns {ValidatorFn}
   */
  static minDate(minDate: any): ValidatorFn {
    if (!isDate(minDate)) {
      throw new Error(`
        FormValidation: minDate value must be a formatted date greater than or equal to ${minDate}.
      `);
    }
    return (control: AbstractControl): {[key: string]: any} => {
      if (isPresent(Validators.required(control))) {
        return null;
      }
      const d: Date = new Date(control.value);
      if (!isDate(d)) {
        return { minDate: true };
      }
      return d >= new Date(minDate) ? null : { minDate: { requiredMinDate: minDate } };
    };
  }

  /**
   * Validator that requires controls to have a date that is before a specific date.
   * @static
   * @param {*} maxDate
   * @returns {ValidatorFn}
   */
  static maxDate(maxDate: any): ValidatorFn {
    if (!isDate(maxDate)) {
      throw new Error(`
        FormValidation: maxDate value must be a formatted date less than or equal to ${maxDate}.
      `);
    }
    return (control: AbstractControl): {[key: string]: any} => {
      if (isPresent(Validators.required(control))) {
        return null;
      }
      const d: Date = new Date(control.value);
      if (!isDate(d)) {
        return { maxDate: true };
      }
      return d <= new Date(maxDate) ? null : { maxDate: { requiredMaxDate: maxDate } };
    };
  }

  /**
   * Validator that requires controls to have a value that is equal to a specific value.
   * @static
   * @param {*} val
   * @returns {ValidatorFn}
   */
  static equal(val: any): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      if (isPresent(Validators.required(control))) {
        return null;
      }
      const v: any = control.value;
      return val === v ? null : { equal: { requiredValue: val } };
    };
  }

  /**
   * Validator that requires controls to have a value that is not equal to a specific value.
   * @static
   * @param {*} val
   * @returns {ValidatorFn}
   */
  static notEqual(val: any): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      if (isPresent(Validators.required(control))) {
        return null;
      }
      const v: any = control.value;
      return val !== v ? null : { notEqual: { requiredValue: val } };
    };
  }

  /**
   * Validator that requires controls to have a value that equals the value of another specific
   * control.
   * @static
   * @param {AbstractControl} equalControl
   * @param {string} equalName
   * @returns {ValidatorFn}
   */
  static equalTo(equalControl: AbstractControl, equalName: string): ValidatorFn {
    let subscribe = false;
    return (control: AbstractControl): {[key: string]: any} => {
      if (isPresent(Validators.required(control))) {
        return null;
      }

      if (!subscribe) {
        subscribe = true;
        equalControl.valueChanges.subscribe(() => {
          control.updateValueAndValidity();
        });
      }

      const v: string = control.value;

      return equalControl.value === v ? null : { equalTo: { requiredToEqual: equalName } };
    };
  }

  /**
   * Validator that requires controls to have a value that does not equal the value of another
   * specific control.
   * @static
   * @param {AbstractControl} equalControl
   * @param {string} equalName
   * @returns {ValidatorFn}
   */
  static notEqualTo(equalControl: AbstractControl, equalName: string): ValidatorFn {
    let subscribe = false;
    return (control: AbstractControl): {[key: string]: any} => {
      if (isPresent(Validators.required(control))) {
        return null;
      }

      if (!subscribe) {
        subscribe = true;
        equalControl.valueChanges.subscribe(() => {
          control.updateValueAndValidity();
        });
      }

      const v: string = control.value;

      return equalControl.value !== v ? null : { notEqualTo: { requiredNotToEqual: equalName } };
    };
  }

}
