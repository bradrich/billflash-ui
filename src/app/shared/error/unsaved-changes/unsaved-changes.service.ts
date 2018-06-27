import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { first } from 'rxjs/operators';

import { UnsavedChangesDialogComponent } from './unsaved-changes-dialog.component';

@Injectable()
export class UnsavedChangesService {

  constructor(
    private matDialog: MatDialog
  ) {}

  /**
   * Handle the `canDeactivate` method requests from the associated components.
   * @param {*} entity
   * @param {FormGroup} formGroup
   * @returns {(Promise<boolean> | boolean)}
   */
  handle(entity: any, formGroup: FormGroup): Promise<boolean> | boolean {
    // Allow synchronous navigation (`true`) if no entity.
    if (!entity) {
      return true;
    }

    // Allow synchronous navigation (`true`) if entity is unchanged.
    let isChanged = false;
    Object.keys(entity).forEach((key: string) => {
      // Compare each parameter of the entity to its corresponding form control. If the form control
      // does not exist, then move on.
      if (formGroup.get(key) && formGroup.get(key).value !== entity[key]) {
        isChanged = true;
      }
    });
    if (!isChanged) {
      return true;
    }

    // Otherwise ask the user with the `UnsavedChangesDialogComponent` and return its promise when
    // it resolves to true or false when the user decides.
    return this.openDialog();
  }

  /**
   * Opens the "Do you want to leave unsaved changes?" dialog and returns the afterClosed
   * promise.
   * @returns {Promise<boolean>}
   */
  openDialog(): Promise<boolean> {
    const matDialogRef: MatDialogRef<UnsavedChangesDialogComponent> = this.matDialog
        .open(UnsavedChangesDialogComponent, { disableClose: true });
    return matDialogRef.afterClosed().pipe(first()).toPromise();
  }

}
