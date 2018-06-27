import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: Array<any>, filter: any, field: any): any {
    const type = typeof filter;

    if (!value) {
      return value;
    }

    if (type === 'boolean') {
      if (field) {
        return value.filter(this.filterByBooleanAndField(filter, field));
      }

      return value.filter(this.filterByBoolean(filter));
    }

    if (type === 'string') {
      if (this.isNumber(filter)) {
        return value.filter(this.filterDefault(filter));
      }

      if (field) {
        return value.filter(this.filterByStringAndField(filter, field));
      }

      return value.filter(this.filterByObject(filter));
    }

    if (type === 'object') {
      return value.filter(this.filterByObject(filter));
    }

    return value.filter(this.filterDefault(filter));
  }

  /**
   * Determines if a value is a number.
   * @private
   * @param {*} value
   * @returns {boolean}
   */
  private isNumber(value: any): boolean {
    return !isNaN(parseInt(value, 10)) && isFinite(value);
  }

  /**
   * Processes the value if the value is a function.
   * @private
   * @param {*} value
   * @returns {*}
   */
  private getValue(value: any): any {
    return typeof value === 'function' ? value() : value;
  }

  private filterByString(filter: string) {
    if (filter) {
      filter = filter.toLowerCase();
    }

    return (value) => {
      return !filter || (value ? value.toLowerCase().indexOf(filter) !== -1 : false);
    };
  }

  private filterByStringAndField(filter: string, field: string) {
    return (value) => {
      return (
        !filter || (value[field] && value[field].toLowerCase().indexOf(filter.toLowerCase()) !== -1)
      );
    };
  }

  private filterByBoolean(filter: boolean) {
    return (value) => {
      return Boolean(value) === filter;
    };
  }

  private filterByBooleanAndField(filter: boolean, field: string) {
    return (value) => {
      return value[field] === filter;
    };
  }

  private filterByObject(filter: any) {
    return (value) => {
      for (const key in filter) {
        if (
          key &&
          value[key] &&
          !Object.getOwnPropertyDescriptor(Object.getPrototypeOf(value), key)
        ) {
          const val = this.getValue(value[key]);
          const type = typeof filter[key];
          let isMatching;

          if (type === 'boolean') {
            isMatching = this.filterByBoolean(filter[key])(val);
          } else if (type === 'string') {
            isMatching = this.filterByString(filter[key])(val);
          } else if (type === 'object') {
            isMatching = this.filterByObject(filter[key])(val);
          } else {
            isMatching = this.filterDefault(filter[key])(val);
          }

          if (!isMatching) {
            return false;
          }
        } else {
          return false;
        }
      }

      return true;
    };
  }

  private filterDefault(filter: string) {
    return (value) => {
      return !filter || filter === value;
    };
  }

}
