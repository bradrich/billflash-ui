import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { Bill } from '../bill.model';
import { BillService } from '../bill.service';

@Component({
  selector: 'bf-bill-due-soon',
  templateUrl: './bill-due-soon.component.html',
  styleUrls: ['./bill-due-soon.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BillDueSoonComponent implements OnInit, OnDestroy {

  totalCount: number;
  dueSoonCount: number;
  dueSoonPercentage: number;
  dueSoonAmount: string;

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
   * Gets the bill counts for `totalCount`, `dueSoonCount`, `dueSoonPercentage`, and
   * `dueSoonAmount`.
   */
  getBillCounts() {
    this.billService.getBills()
        .pipe(
          distinctUntilChanged(),
          takeUntil(this.onDestroy)
        )
        .subscribe((bills: Bill[]) => {
          // Number due of total count.
          this.totalCount = bills.length;
          const dueSoonBills = bills
              .filter((bill: Bill) => this.billService.isDueSoon(bill.nextDueDate));
          this.dueSoonCount = dueSoonBills.length;
          this.dueSoonPercentage = (this.dueSoonCount / this.totalCount) * 100 || 0;

          // Amount due.
          let dueSoonAmount = 0;
          dueSoonBills.forEach((bill: Bill) => {
            dueSoonAmount += bill.amountDue;
          });
          this.dueSoonAmount = dueSoonAmount.toFixed(2);
        });
  }

}
