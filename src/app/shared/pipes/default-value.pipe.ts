import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaultValue',
  pure: true
})
export class DefaultValuePipe implements PipeTransform {

  transform(value: any, defaultValue: any): any {
    return value || defaultValue;
  }
  
}
