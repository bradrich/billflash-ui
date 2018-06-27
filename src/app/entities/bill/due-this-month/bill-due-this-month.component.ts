import { Component, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment-timezone';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { Bill } from '../bill.model';
import { BillService } from '../bill.service';

@Component({
  selector: 'bf-bill-due-this-month',
  templateUrl: './bill-due-this-month.component.html',
  styleUrls: ['./bill-due-this-month.component.scss']
})
export class BillDueThisMonthComponent implements OnInit, OnDestroy {

  totalCount: number;
  dueThisMonthCount: number;
  dueThisMonthPercentage: number;
  dueThisMonthAmount: string;

  private onDestroy = new Subject();

  constructor(
    private billService: BillService
  ) {}

  /**
   * OnInit life-cycle method.
   */
  ngOnInit() {
    this.getBillCounts();
  }

  /**
   * OnDestroy life-cycle method.
   */
  ngOnDestroy() {
    this.onDestroy.next();
  }

  /**
   * Gets the bill counts for `total` and `dueThisMonthCount`.
   */
  getBillCounts() {
    this.billService.getBills()
        .pipe(
          distinctUntilChanged(),
          takeUntil(this.onDestroy)
        )
        .subscribe((bills: Bill[]) => {
          // Number due of total.
          this.totalCount = bills.length;
          const date = moment().toDate();
          const dueThisMonthBills = bills
              .filter((bill: Bill) => this.billService.isDueDuringMonth(bill.nextDueDate, date));
          this.dueThisMonthCount = dueThisMonthBills.length;
          this.dueThisMonthPercentage = (this.dueThisMonthCount / this.totalCount) * 100 || 0;

          // Amount due.
          let dueThisMonthAmount = 0;
          dueThisMonthBills.forEach((bill: Bill) => {
            dueThisMonthAmount += bill.amountDue;
          });
          this.dueThisMonthAmount = dueThisMonthAmount.toFixed(2);
        });
  }

}
