import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleCase',
  pure: false
})
export class TitleCasePipe implements PipeTransform {

  /**
   * Transforms a string from any case to Title Case. Example: 'EVERY_OTHER_WEEK' becomes
   * 'Every Other Week'.
   * @param {string} value
   * @returns {string}
   */
  transform(value: string): string {
    return value.length === 0
      ? ''
      : value
          .replace('_', ' ')
          .replace('_', ' ')
          .replace(/\w\S*/g, (txt) => txt[0].toUpperCase() + txt.substr(1).toLowerCase())
          .replace('And', '&');
  }

}
