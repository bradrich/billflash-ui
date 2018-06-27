import { Pipe, PipeTransform } from '@angular/core';

import { billTypeIcons } from '../bill.constants';

@Pipe({
  name: 'billTypeIcon'
})
export class BillTypeIconPipe implements PipeTransform {

  transform(billType: string): string {
    return billTypeIcons.get(billType) || 'home';
  }

}
