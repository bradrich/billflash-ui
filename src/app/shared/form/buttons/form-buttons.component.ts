import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'bf-form-buttons',
  templateUrl: './form-buttons.component.html'
})
export class FormButtonsComponent {
  @Input() group: FormGroup;

  @Input()
  get useIcons(): boolean {
    return this._useIcons;
  }
  set useIcons(v) {
    this._useIcons = coerceBooleanProperty(v);
  }

  @Input()
  get isSaving(): boolean {
    return this._isSaving;
  }
  set isSaving(v) {
    this._isSaving = coerceBooleanProperty(v);
  }
  @Input()
  get isSaveDisabled(): boolean {
    return this._isSaveDisabled;
  }
  set isSaveDisabled(v) {
    this._isSaveDisabled = coerceBooleanProperty(v);
  }
  @Output() save = new EventEmitter<any>();

  @Output() cancel = new EventEmitter<any>();

  private _useIcons = false;
  private _isSaving = false;
  private _isSaveDisabled = false;
}
