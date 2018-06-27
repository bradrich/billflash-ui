import { Component } from '@angular/core';

@Component({
  selector: 'bf-unsaved-changes-dialog',
  template: `
    <mat-toolbar>

      <h4 class="m-0">Confirm edit cancel</h4>

    </mat-toolbar>
    <mat-dialog-content>

      <p class="mb-2">Are you sure you want to cancel your changes?</p>

    </mat-dialog-content>
    <mat-dialog-actions class="d-flex flex-row align-items-center">

      <button class="btn" [mat-dialog-close]="false">Cancel</button>
      <button class="btn btn-danger ml-auto" [mat-dialog-close]="true">Confirm</button>

    </mat-dialog-actions>
  `
})
export class UnsavedChangesDialogComponent {}
