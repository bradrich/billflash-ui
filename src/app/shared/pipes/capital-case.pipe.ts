import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalCase'
})
export class CapitalCasePipe implements PipeTransform {

  transform(value: string): string {
    if (value !== null) {
      value = value.toLowerCase();
    }

    return value.substring(0, 1).toUpperCase() + value.substring(1);
  }

}
