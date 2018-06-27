import { Injectable } from '@angular/core';

@Injectable()
export class FormService {

  getErrorMessage(name: string, value?: any): any {
    const config = {
      required: {
        message: `This field is required.`
      },
      minlength: {
        message: `This field is required to be at least ${value.requiredLength} characters.`
      },
      maxlength: {
        message: `This field cannot be longer than ${value.requiredLength} characters.`
      },
      rangeLength: {
        message: `This field is required to be greater than or equal to ${value.requiredMin} and
            less than or equal to ${value.requiredMax} in length.`
      },
      min: {
        message: `This field is required to be greater than or equal to ${value.requiredMin}.`
      },
      max: {
        message: `This field is required to be less than or equal to ${value.requiredMax}.`
      },
      range: {
        message: `This field is required to be greater than or equal to ${value.requiredMin} and
            less than or equal to ${value.requiredMax}.`
      },
      pattern: {
        message: `This field should follow this pattern: ${value.patternDescription}`
      },
      number: {
        message: `This field should be a number.`
      },
      integer: {
        message: `This field should be an integer.`
      },
      email: {
        message: `Your email is invalid.`
      },
      date: {
        message: `This field is required to be a date.`
      },
      minDate: {
        message: `This field is required to be a date that is greater than or equal to
            ${value.requiredMinDate}.`
      },
      maxDate: {
        message: `This field is required to be a date that is less than or equal to
            ${value.requiredMaxDate}.`
      },
      dateTimeLocal: {
        message: `This field is required to be a date and time.`
      },
      equal: {
        message: `This field is required to equal ${value.requiredValue}.`
      },
      notEqual: {
        message: `This field is required to not equal ${value.requiredValue}.`
      },
      equalTo: {
        message: `This field is required to equal to ${value.requiredToEqual}.`
      },
      notEqualTo: {
        message: `This field is required to not be equal to ${value.requiredNotToEqual}.`
      }
    };

    return config[name];
  }

}
