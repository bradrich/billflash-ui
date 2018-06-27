import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(value: string): string {
    let rawNumber: any;
    let country: number | string;
    let city: string;
    let number: string;

    if (!value) {
      return '';
    }

    rawNumber = value
      .toString()
      .trim()
      .replace(/^\+/, '');

    if (rawNumber.match(/[^0-9]/)) {
      return value;
    }

    switch (rawNumber.length) {
      case 10: // +!PPP####### -> C (PPP) ###-####
        country = 1;
        city = rawNumber.slice(0, 3);
        number = rawNumber.slice(3);
        break;
      case 11: // +CPPP####### -> CCC (PP) ###-####
        country = rawNumber[0];
        city = rawNumber.slice(1, 4);
        number = rawNumber.slice(4);
        break;
      case 12: // +CCCPP####### -> CCC (PP) ###-####
        country = rawNumber.slice(0, 3);
        city = rawNumber.slice(3, 5);
        number = rawNumber.slice(5);
        break;
      default:
        return value;
    }

    if (country === 1) {
      country = '';
    }

    number = `${number.slice(0, 3)}-${number.slice(3)}`;

    return `${country} (${city}) ${number}`.trim();
  }

}
