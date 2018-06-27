import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import * as _ from 'lodash';
import * as moment from 'moment-timezone';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { billDueSoonDaysBefore, billQueryVariablesInitial } from './bill.constants';
import {
  BillQueryVariables,
  BillsQuery,
  BillsQueryResponse,
  DeleteBillMutation,
  UpdateBillMutation
} from './bill.graphql';
import { Bill } from './bill.model';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  billDatesSelected = new Map();

  private bills = new BehaviorSubject<Bill[]>([]);
  private billsDates = new BehaviorSubject<Map<string, any>>(new Map());
  private currentBill = new BehaviorSubject<Bill>(null);
  private queryVariables = new BehaviorSubject<BillQueryVariables>(billQueryVariablesInitial);
  private selectedBills = new BehaviorSubject<Bill[]>([]);
  private selectedBillsDates = new BehaviorSubject<Map<string, any>>(new Map());
  private isCreating = new BehaviorSubject<boolean>(false);
  private isDetailPage = new BehaviorSubject<boolean>(false);

  constructor(
    private matDialog: MatDialog,
    private apollo: Apollo
  ) {}

  setBills(val: Bill[]) {
    this.bills.next(val);
    this.setBillsDates(val);
  }

  getBills(): Observable<Bill[]> {
    return this.bills.asObservable();
  }

  setBillsDates(val: Bill[]) {
    const colorMap = new Map();
    val.forEach((bill: Bill, index: number) => {
      colorMap.set(moment(bill.nextDueDate).format('MM/DD/YYYY'), {
        listIndex: index,
        colorClass: this.getColor(bill)
      });
    });

    this.billsDates.next(colorMap);
  }

  getBillsDates(): Observable<Map<string, any>> {
    return this.billsDates.asObservable();
  }

  setCurrentBill(val: Bill) {
    this.currentBill.next(val);
  }

  getCurrentBill(): Observable<Bill> {
    return this.currentBill.asObservable();
  }

  setQueryVariables(val: BillQueryVariables) {
    this.queryVariables.next(val);
  }

  getQueryVariables(): Observable<BillQueryVariables> {
    return this.queryVariables.asObservable();
  }

  setSelectedBills(val: Bill[]) {
    this.selectedBills.next(val);
    this.setSelectedBillsDates(val);
  }

  getSelectedBills(): Observable<Bill[]> {
    return this.selectedBills.asObservable();
  }

  setSelectedBillsDates(val: Bill[]) {
    const colorMap = new Map();
    val.forEach((bill: Bill, index: number) => {
      colorMap.set(moment(bill.nextDueDate).format('MM/DD/YYYY'), {
        listIndex: index,
        colorClass: 'bg-info'
      });
    });

    this.selectedBillsDates.next(colorMap);
  }

  getSelectedBillsDates(): Observable<Map<string, any>> {
    return this.selectedBillsDates.asObservable();
  }

  setIsCreating(val: boolean) {
    this.isCreating.next(val);
  }

  getIsCreating(): Observable<boolean> {
    return this.isCreating.asObservable();
  }

  setIsDetailPage(val: boolean) {
    this.isDetailPage.next(val);
  }

  getIsDetailPage(): Observable<boolean> {
    return this.isDetailPage.asObservable();
  }

  /**
   * Gets all `bills` from the API.
   * @param {BillQueryVariables} queryVariables
   * @returns {Observable<Bill[]>}
   */
  getAll(queryVariables: BillQueryVariables): Observable<Bill[]> {
    return this.apollo
        .watchQuery<BillsQueryResponse>({
          query: BillsQuery,
          variables: queryVariables
        })
        .valueChanges
        .pipe(
          map(({ data }: ApolloQueryResult<any>) => _.cloneDeep(data.bills)),
          catchError((err) => throwError(err))
        );
  }

  /**
   * Edits a `bill` through the API.
   * @param {Bill} bill
   * @param {BillQueryVariables} queryVariables
   * @param {*} mutation
   * @returns {Observable<any>}
   */
  edit(bill: Bill, queryVariables: BillQueryVariables, mutation: any): Observable<any> {
    return this.apollo
        .mutate({
          mutation: mutation,
          variables: { data: bill },
          refetchQueries: [{
            query: BillsQuery,
            variables: queryVariables
          }]
        })
        .pipe(
          // TODO: Handle error result returns.
          catchError((err) => throwError(err))
        );
  }

  /**
   * Archives a `bill` through the API.
   * @param {*} variables
   * @param {BillQueryVariables} queryVariables
   * @returns {Observable<any>}
   */
  archive(variables: any, queryVariables: BillQueryVariables): Observable<any> {
    return this.apollo
        .mutate({
          mutation: UpdateBillMutation,
          variables: variables,
          refetchQueries: [{
            query: BillsQuery,
            variables: queryVariables
          }]
        })
        .pipe(
          catchError((err) => throwError(err))
        );
  }

  /**
   * Deletes a `bill` through the API.
   * @param {*} variables
   * @param {BillQueryVariables} queryVariables
   * @returns {Observable<any>}
   */
  delete(variables: any, queryVariables: BillQueryVariables): Observable<any> {
    return this.apollo
        .mutate({
          mutation: DeleteBillMutation,
          variables: variables,
          refetchQueries: [{
            query: BillsQuery,
            variables: queryVariables
          }]
        })
        .pipe(
          catchError((err) => throwError(err))
        );
  }

  /**
   * Gets the `bill` color classes based on the bill's status.
   * @param {Bill} bill
   * @param {('bg' | 'text')} [target='bg']
   * @returns {*}
   */
  getColorClasses(bill: Bill, target: 'bg' | 'text' = 'bg'): any {
    const status = {
      danger: this.isOverdue(bill.nextDueDate),
      warning: this.isDueSoon(bill.nextDueDate),
      dark: bill.paymentMethod === 'AUTOMATIC'
    };

    const classes = {};
    classes[`${target}-danger`] = status.danger;
    classes[`${target}-warning`] = status.warning;
    classes[`${target}-dark`] = status.dark;
    classes[`${target}-success`] = !status.danger && !status.warning && !status.dark;

    return classes;
  }

  /**
   * Gets the `bill` color based off of the bill's status.
   * @param {Bill} bill
   * @returns {string}
   */
  getColor(bill: Bill): string {
    const status = {
      danger: this.isOverdue(bill.nextDueDate),
      warning: this.isDueSoon(bill.nextDueDate),
      dark: bill.paymentMethod === 'AUTOMATIC'
    };

    return status.danger
        ? 'bg-danger'
        : status.warning
            ? 'bg-warning'
            : status.dark
                ? 'bg-dark'
                : 'bg-success';
  }

  /**
   * Determines if the bill's `nextDueDate` is due soon, by comparing today's date plus the
   * `billDueSoonDaysBefore` days before the next due date.
   * @param {string} nextDueDate
   * @returns {boolean}
   */
  isDueSoon(nextDueDate: string): boolean {
    const dueDate = moment(nextDueDate);
    return moment().add(billDueSoonDaysBefore, 'days').isSameOrAfter(dueDate);
  }

  /**
   * Determines if the bill's `nextDueDate` is before today.
   * @param {string} nextDueDate
   * @returns {boolean}
   */
  isOverdue(nextDueDate: string): boolean {
    const today = moment();
    return moment(nextDueDate).isBefore(today);
  }

  /**
   * Determines if the bill `nextDueDate` is due during a requested month.
   * @param {string} nextDueDate
   * @param {Date} targetDate
   * @returns {boolean}
   */
  isDueDuringMonth(nextDueDate: string, targetDate: Date): boolean {
    const targetDateMoment = moment(targetDate);
    const nextDueDateMoment = moment(nextDueDate);
    return nextDueDateMoment.month() === targetDateMoment.month() &&
        nextDueDateMoment.year() === targetDateMoment.year();
  }

}
