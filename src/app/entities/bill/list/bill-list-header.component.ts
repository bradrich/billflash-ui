import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { Bill } from '../bill.model';
import { BillService } from '../bill.service';
import { BillEditDialogComponent } from '../edit/bill-edit-dialog.component';

@Component({
  selector: 'bf-bill-list-header',
  template: `
    <h5 class="m-0">Your Bills</h5>

    <bf-bill-search class="form-group mb-0"></bf-bill-search>

    <button
      class="btn btn-icon btn-mini-fab btn-raised ml-4"
      [ngClass]="{ 'active btn-danger': (isCreating | async), 'btn-primary': !(isCreating | async) }"
      (click)="createBill()">
      <mat-icon>add</mat-icon>
    </button>
  `,
  styleUrls: ['./bill-list-header.component.scss']
})
export class BillListHeaderComponent {

  isCreating: Observable<boolean> = this.billService.getIsCreating();

  constructor(
    private matDialog: MatDialog,
    private billService: BillService
  ) {}

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

}
