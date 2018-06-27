import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { Bill } from '../bill.model';
import { BillService } from '../bill.service';

@Component({
  selector: 'bf-bill-snapshot',
  template: `
    <div class="mb-4 d-flex flex-column bf-detail" [ngClass]="currentBill?.backgroundColor">

      <h4 class="mt-0 mb-2 ml-1">Due {{currentBill?.nextDueDate | amTimeAgo}}</h4>
      <p class="mb-3 ml-1">{{currentBill?.nextDueDate | date:'fullDate'}}</p>
      <p class="mb-3 ml-1">
        Repeats: <strong>{{currentBill?.repeatInterval | billRepeatInterval}}</strong>
      </p>
      <p class="mb-0 ml-1">Amount due: <strong>{{currentBill?.amountDue | currency}}</strong></p>

    </div>
  `,
  styleUrls: ['./bill-snapshot.component.scss']
})
export class BillSnapshotComponent implements OnInit, OnDestroy {

  currentBill: Bill;

  private onDestroy = new Subject();

  constructor(
    private billService: BillService
  ) {}

  /**
   * OnInit life-cycle method.
   */
  ngOnInit() {
    this.getCurrentBill();
  }

  /**
   * OnDestroy life-cycle method.
   */
  ngOnDestroy() {
    this.onDestroy.next();
  }

  /**
   * Gets `currentBill` from `BillService`.
   */
  getCurrentBill() {
    this.billService.getCurrentBill()
        .pipe(
          distinctUntilChanged(),
          takeUntil(this.onDestroy)
        )
        .subscribe((bill: Bill) => {
          if (bill) {
            this.currentBill = bill;

            this.currentBill.backgroundColor = this.billService.getColorClasses(bill, 'bg');
            this.currentBill.textColor = this.billService.getColorClasses(bill, 'text');
          }
        });
  }

}
