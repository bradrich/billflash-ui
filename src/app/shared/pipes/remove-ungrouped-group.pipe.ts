import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeUngroupedGroup'
})
export class RemoveUngroupedGroupPipe implements PipeTransform {

  transform(value: Array<any>): Array<any> {
    if (value && value.length > 0) {
      const newArray = [];

      value.forEach((entity) => {
        if (entity.name.toLowerCase().indexOf('ungrouped') === -1) {
          newArray.push(entity);
        }
      });

      return newArray;
    }

    return value;
  }

}
