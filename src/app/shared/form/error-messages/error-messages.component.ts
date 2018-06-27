import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { FormService } from '../form.service';

@Component({
  selector: 'bf-error-messages',
  template: `
    <small class="text-danger" *ngIf="errorMessage">{{errorMessage}}</small>
  `
})
export class ErrorMessagesComponent implements OnInit {

  @Input() group: FormGroup;
  @Input() controlName: string;

  private control: AbstractControl;

  constructor(
    private formService: FormService
  ) {}

  /**
   * OnInit life-cycle method.
   */
  ngOnInit() {
    this.control = this.group.controls[this.controlName];
  }

  /**
   * Gets the correct form error message from the `FormService`.
   * @readonly
   * @type {string}
   */
  get errorMessage(): string {
    const isControlInvalid = this.control.touched && this.control.dirty && this.control.invalid;

    if (this.control && this.control.errors) {
      for (const key in this.control.errors) {
        if (this.control.errors[key] && isControlInvalid) {
          return this.formService.getErrorMessage(key, this.control.errors[key]).message;
        }
      }
    }

    return null;
  }

}
