import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { CustomValidators } from '@billflash/shared';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment-timezone';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
  billCategories,
  BillCategory,
  billCategoryTypes,
  billCustomRepeatIntervalTimeNames,
  billPaymentMethods,
  billRepeatIntervals,
  billRepeatIntervalsMap,
  billTypeCategories
} from '../bill.constants';
import { BillQueryVariables, CreateBillMutation, UpdateBillMutation } from '../bill.graphql';
import { Bill } from '../bill.model';
import { BillService } from '../bill.service';

@Component({
  selector: 'bf-bill-edit-dialog',
  templateUrl: './bill-edit-dialog.component.html'
})
export class BillEditDialogComponent implements OnInit, OnDestroy {

  bill: Bill;

  formType: 'update' | 'create' = 'create';
  form: FormGroup;
  queryVariables: BillQueryVariables;
  isSaving = false;
  isError = false;

  todayDate: NgbDateStruct;
  calendarStartDate: any;
  billCategories = billCategories;
  billCategoryTypes = billCategoryTypes;
  billRepeatIntervals = billRepeatIntervals;
  billRepeatIntervalsMap = billRepeatIntervalsMap;
  billCustomRepeatIntervalTimeNames = billCustomRepeatIntervalTimeNames;
  billPaymentMethods = billPaymentMethods;

  private onDestroy = new Subject();

  constructor(
    public matDialogRef: MatDialogRef<BillEditDialogComponent>,
    private formBuilder: FormBuilder,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    private billService: BillService
  ) {}

  /**
   * OnInit life-cycle method.
   */
  ngOnInit() {
    this.todayDate = this.ngbDateParserFormatter.parse(moment().toISOString());
    this.getQueryVariables();
    this.setForm();
  }

  /**
   * OnDestroy life-cycle method.
   */
  ngOnDestroy() {
    this.onDestroy.next();
  }

  /**
   * Gets the `queryVariables` from the `Store`.
   */
  getQueryVariables() {
    this.billService.getQueryVariables()
        .pipe(takeUntil(this.onDestroy))
        .subscribe((queryVariables: BillQueryVariables) => {
          this.queryVariables = queryVariables;
        }, (err) => {
          console.error(err);
          this.isError = true;
        });
  }

  /**
   * Sets `form` based off of `bill`.
   */
  setForm() {
    const nextDueDate = moment(this.bill.nextDueDate);
    this.calendarStartDate = {
      year: nextDueDate.year(),
      month: nextDueDate.month() + 1
    };

    this.form = this.formBuilder.group({
      name: new FormControl(this.bill.name, [Validators.required]),
      type: new FormControl(this.bill.type, [Validators.required]),
      nextDueDatePicker: new FormControl(
        this.ngbDateParserFormatter.parse(this.bill.nextDueDate),
        [Validators.required]
      ),
      remind: new FormControl(this.bill.remind, [Validators.required]),
      remindDaysBefore: new FormControl(this.bill.remindDaysBefore, [
        Validators.required,
        CustomValidators.number,
        CustomValidators.min(1)
      ]),
      amountDue: new FormControl(this.bill.amountDue, [CustomValidators.number]),
      amountVaries: new FormControl(this.bill.amountVaries, [Validators.required]),
      repeatInterval: new FormControl(this.bill.repeatInterval, [Validators.required]),
      customRepeatIntervalIncrement: new FormControl(this.bill.customRepeatIntervalIncrement, [
        CustomValidators.number
      ]),
      customRepeatIntervalTimeName: new FormControl(this.bill.customRepeatIntervalTimeName),
      paymentMethod: new FormControl(this.bill.paymentMethod, [Validators.required]),
      paymentUrl: new FormControl(this.bill.paymentUrl, [CustomValidators.url]),
      currentBalance: new FormControl(this.bill.currentBalance, [CustomValidators.number]),
      origBalance: new FormControl(this.bill.origBalance, [CustomValidators.number]),
      currentLoanPaymentNumber: new FormControl(this.bill.currentLoanPaymentNumber, [
        CustomValidators.number
      ]),
      origLoanTerm: new FormControl(this.bill.origLoanTerm, [CustomValidators.number]),
      origLoanTermUnit: new FormControl('months', [Validators.required]),
      interestRate: new FormControl(this.bill.interestRate, [CustomValidators.number]),
      escrowAmount: new FormControl(this.bill.escrowAmount, [CustomValidators.number])
    });
  }

  /**
   * Dispatches an event to the store with a bill constructed from the form value.
   */
  save() {
    this.isSaving = true;

    const nextDueDate = moment(
      this.ngbDateParserFormatter.format(this.form.get('nextDueDatePicker').value)
    ).toISOString();

    const bill: Bill = {
      name: this.form.get('name').value,
      type: this.form.get('type').value,
      category: <BillCategory>billTypeCategories.get(this.form.get('type').value),
      nextDueDate: nextDueDate,
      remindDate: this.form.get('remind').value && this.form.get('remindDaysBefore').value > 0
          ? moment(nextDueDate)
              .subtract(this.form.get('remindDaysBefore').value, 'days')
              .toISOString()
          : null,
      amountDue: this.form.get('amountDue').value || 0,
      repeatInterval: this.form.get('repeatInterval').value,
      customRepeatIntervalIncrement: this.form.get('customRepeatIntervalIncrement').value,
      customRepeatIntervalTimeName: this.form.get('customRepeatIntervalTimeName').value,
      paymentMethod: this.form.get('paymentMethod').value,
      paymentUrl: this.form.get('paymentUrl').value,
      currentBalance: this.form.get('currentBalance').value || 0,
      origBalance: this.form.get('origBalance').value || 0,
      currentLoanPaymentNumber: this.form.get('currentLoanPaymentNumber').value || 0,
      origLoanTerm: this.form.get('origLoanTermUnit').value === 'years'
          ? this.form.get('origLoanTerm').value * 12 || 0
          : this.form.get('origLoanTerm').value || 0,
      interestRate: this.form.get('interestRate').value || 0,
      escrowAmount: this.form.get('escrowAmount').value || 0
    };

    const mutation = this.formType === 'create' ? CreateBillMutation : UpdateBillMutation;

    this.billService.edit(bill, this.queryVariables, mutation)
        .pipe(takeUntil(this.onDestroy))
        .subscribe(() => {
          this.isSaving = false;
          this.cancel();
        }, (err) => {
          console.error(err);
          this.isSaving = false;
          this.isError = true;
        });
  }

  /**
   * Cancels the form submission.
   */
  cancel() {
    this.form.reset(this.bill);
    this.matDialogRef.close();
  }

}
