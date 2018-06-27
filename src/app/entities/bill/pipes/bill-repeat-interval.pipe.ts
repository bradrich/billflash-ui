import { Pipe, PipeTransform } from '@angular/core';

import { billRepeatIntervalsMap } from '../bill.constants';

@Pipe({
  name: 'billRepeatInterval'
})
export class BillRepeatIntervalPipe implements PipeTransform {

  private billRepeatIntervals = billRepeatIntervalsMap;

  transform(value: string): string {
    return this.billRepeatIntervals.get(value) || 'Monthly';
  }

}
