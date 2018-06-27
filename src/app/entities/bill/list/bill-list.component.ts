import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable, Subject } from 'rxjs';
import { first, switchMap, takeUntil } from 'rxjs/operators';

import { BillQueryVariables } from '../bill.graphql';
import { Bill } from '../bill.model';
import { BillService } from '../bill.service';
import { BillEditDialogComponent } from '../edit/bill-edit-dialog.component';

@Component({
  selector: 'bf-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.scss']
})
export class BillListComponent implements OnInit, OnDestroy {

  isLoading = false;
  isRefreshing = false;
  isError = false;
  queryVariables: BillQueryVariables;
  bills: Observable<Bill[]> = this.billService.getBills();
  selectedBills: Observable<Bill[]> = this.billService.getSelectedBills();
  sorts: any[];

  private onDestroy = new Subject();

  constructor(
    private matDialog: MatDialog,
    private localStorage: LocalStorageService,
    private billService: BillService
  ) {}

  /**
   * OnInit life-cycle method.
   */
  ngOnInit() {
    this.isLoading = true;
    this.getBills();
  }

  /**
   * OnDestroy life-cycle method.
   */
  ngOnDestroy() {
    this.onDestroy.next();
  }

  /**
   * Gets the `bills` collection from `BillService`.
   */
  getBills() {
    this.billService.getQueryVariables()
        .pipe(
          switchMap((val: BillQueryVariables) => {
            this.queryVariables = val;
            this.setSorts();
            return this.billService.getAll(val);
          }),
          takeUntil(this.onDestroy)
        )
        .subscribe((bills: Bill[]) => {
          this.isLoading = false;
          this.billService.setBills(bills);
        }, (err) => {
          console.error(err);
          this.isLoading = false;
          this.isError = true;
        });
  }

  /**
   * Gets the `bill` color classes based on the bill's status.
   * @param {Bill} bill
   * @param {('bg' | 'text')} [target='bg']
   * @returns {*}
   */
  getColorClasses(bill: Bill, target: 'bg' | 'text' = 'bg'): any {
    return this.billService.getColorClasses(bill, target);
  }

  /**
   * Gets the action menu placement based on the index of the table row. This is implemented because
   * menus at the bottom of the table cause overflow issues.
   * @param {number} index
   * @param {number} bills
   * @returns {string}
   */
  getActionMenuPlacement(index: number, billsLength: number): string {
    if (index === billsLength - 1) {
      return 'top-right';
    } else if (index === billsLength - 2) {
      return 'left';
    } else {
      return 'bottom-right';
    }
  }

  /**
   * Sends the `selected` bills to the `store` through the `BillSelect` action.
   * @param {any} { selected }
   */
  selectBills({ selected }) {
    this.billService.setSelectedBills(selected);
  }

  /**
   * Sets `sorts` by parsing the current `queryVariables.orderBy`.
   */
  setSorts() {
    const data = this.queryVariables.orderBy.split('_');
    const sort = {
      prop: data[0],
      dir: data[1].toLowerCase()
    };
    this.sorts = [sort];
  }

  /**
   * Sorts the bill list by modifying the current `queryVariables.orderBy`.
   * @param {any} { sorts, column, prevValue, newValue }
   */
  sortBills({ sorts, column, prevValue, newValue }) {
    this.queryVariables.orderBy = `${sorts[0].prop}_${sorts[0].dir.toUpperCase()}`;
    this.billService.setQueryVariables(this.queryVariables);
  }

  /**
   * Opens the `BillEditDialogComponent`.
   */
  createBill() {
    this.billService.setIsCreating(true);

    let matDialogRef: MatDialogRef<BillEditDialogComponent>;
    matDialogRef = this.matDialog.open(BillEditDialogComponent);
    matDialogRef.componentInstance.bill = new Bill();
    matDialogRef.componentInstance.formType = 'create';

    matDialogRef.afterClosed()
        .pipe(first())
        .subscribe(() => {
          this.billService.setIsCreating(false);
        });
  }

  /**
   * Opens the `BillEditDialogComponent` in order to edit the requested bill.
   * @param {Bill} bill
   */
  editBill(bill: Bill) {
    let matDialogRef: MatDialogRef<BillEditDialogComponent>;
    matDialogRef = this.matDialog.open(BillEditDialogComponent);
    matDialogRef.componentInstance.bill = new Bill(bill);
    matDialogRef.componentInstance.formType = 'update';
  }

  /**
   * Archives the requested `bill`.
   * @param {Bill} bill
   */
  archiveBill(bill: Bill) {
    const variables = {
      data: { isArchived: bill.isArchived ? false : true },
      where: { id: bill.id }
    };

    this.billService.archive(variables, this.queryVariables);
  }

  /**
   * Deletes the requested `bill`.
   * @param {Bill} bill
   */
  deleteBill(bill: Bill) {
    const variables = {
      where: { id: bill.id }
    };

    this.billService.delete(variables, this.queryVariables);
  }

}
