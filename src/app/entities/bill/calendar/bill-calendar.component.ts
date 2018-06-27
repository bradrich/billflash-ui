import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment-timezone';
import { Subject } from 'rxjs';
import { distinctUntilChanged, first, map, takeUntil } from 'rxjs/operators';

import { Bill } from '../bill.model';
import { BillService } from '../bill.service';

@Component({
  selector: 'bf-bill-calendar',
  templateUrl: './bill-calendar.component.html',
  styleUrls: ['./bill-calendar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BillCalendarComponent implements OnInit, OnDestroy {

  billsDates: Map<string, any>;
  selectedBillsDates: Map<string, any>;
  hoveredDate: NgbDateStruct;

  private onDestroy = new Subject();

  constructor(
    private ngbDateParserFormatter: NgbDateParserFormatter,
    private billService: BillService
  ) {}

  ngOnInit() {
    this.getBillsDates();
    this.getSelectedBillsDates();
  }

  /**
   * OnDestroy life-cycle method.
   */
  ngOnDestroy() {
    this.onDestroy.next();
  }

  /**
   * Gets `billsDates` from `BillService`.
   */
  getBillsDates() {
    this.billService.getBillsDates()
        .pipe(
          distinctUntilChanged(),
          takeUntil(this.onDestroy)
        )
        .subscribe((billsDates: Map<string, any>) => {
          this.billsDates = billsDates;
        });
  }

  /**
   * Gets `selectedBillsDates` from `BillService`.
   */
  getSelectedBillsDates() {
    this.billService.getSelectedBillsDates()
        .pipe(
          distinctUntilChanged(),
          takeUntil(this.onDestroy)
        )
        .subscribe((selectedBillsDates: Map<string, any>) => {
          this.selectedBillsDates = selectedBillsDates;
        });
  }

  /**
   * Selects a bill from the date selected in the calendar.
   * @param {NgbDateStruct} date
   */
  selectBillFromDate(date: NgbDateStruct) {
    this.billService.setSelectedBills([]);

    const d = moment(new Date(date.year, date.month - 1, date.day)).format('MM/DD/YYYY');

    this.billService.getBills()
        .pipe(
          first(),
          map((bills: Bill[]) =>
            bills.filter((bill: Bill) => moment(bill.nextDueDate).format('MM/DD/YYYY') === d
          ))
        )
        .subscribe((bills: Bill[]) => {
          this.billService.setSelectedBills(bills);
        });
  }

  /**
   * Gets the date background color of a date passed in from the bill calendar.
   * @param {NgbDateStruct} date
   * @returns {string}
   */
  setDateColor(date: NgbDateStruct): string {
    const d = moment(new Date(date.year, date.month - 1, date.day)).format('MM/DD/YYYY');

    if (this.selectedBillsDates.get(d)) {
      return 'bg-info';
    } else if (this.billsDates.get(d)) {
      return this.billsDates.get(d).colorClass;
    } else if (this.isTodayDate(date)) {
      return 'bg-primary';
    } else if (this.isHoveredDate(date)) {
      return 'bg-dark';
    }
  }

  /**
   * Determines if the current date is today.
   * @param {NgbDateStruct} date
   * @returns {boolean}
   */
  isTodayDate(date: NgbDateStruct): boolean {
    const todayDate = this.ngbDateParserFormatter.parse(moment().toISOString());

    return date.year === todayDate.year &&
        date.day === todayDate.day &&
        date.month === todayDate.month;
  }

  /**
   * Determines if the current date is hovered.
   * @param {NgbDateStruct} date
   * @returns {boolean}
   */
  isHoveredDate(date: NgbDateStruct): boolean {
    return this.hoveredDate &&
        date.year === this.hoveredDate.year &&
        date.day === this.hoveredDate.day &&
        date.month === this.hoveredDate.month;
  }

}
