import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { UpdateBillMutation } from '../bill.graphql';
import { Bill } from '../bill.model';
import { BillService } from '../bill.service';

@Component({
  selector: 'bf-bill-notes',
  templateUrl: './bill-notes.component.html',
  styleUrls: ['./bill-notes.component.scss']
})
export class BillNotesComponent implements OnInit, OnDestroy {

  currentBill: Bill;
  isEdit = false;
  form: FormGroup;
  isSaving = false;

  private onDestroy = new Subject();

  constructor(
    private formBuilder: FormBuilder,
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

            this.setForm();
          }
        });
  }

  /**
   * Set `form`.
   */
  setForm() {
    this.form = this.formBuilder.group({
      notes: new FormControl(this.currentBill.notes)
    });
  }

  /**
   * Saves the bill updates.
   */
  save() {
    this.isSaving = true;

    const bill = {
      notes: this.form.get('notes').value
    };
    const variables = {
      data: bill,
      where: { id: this.currentBill.id }
    };

    this.billService.edit(bill, variables, UpdateBillMutation)
        .pipe(takeUntil(this.onDestroy))
        .subscribe(() => {
          this.isSaving = false;

          this.currentBill = Object.assign(this.currentBill, bill);

          this.cancel();
        }, (err) => {
          console.error(err);
          this.isSaving = false;
        });
  }

  /**
   * Cancels the updates.
   */
  cancel() {
    this.form.reset(this.currentBill);
    this.isEdit = false;
  }

}
