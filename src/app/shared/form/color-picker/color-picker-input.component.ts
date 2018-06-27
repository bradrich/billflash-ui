import { Component, forwardRef, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'bf-color-picker',
  template: `
    <label>Color</label>
    <div class="d-flex flex-row align-items-center flex-wrap">

      <button
        *ngFor="let color of colors"
        class="btn p-3 bf-color"
        [class.bf-color-selected]="color.selected"
        [class.border-info]="color.selected"
        [ngClass]="color.name"
        (click)="selectColor(color.name)">
      </button>

    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColorPickerInputComponent),
      multi: true
    }
  ],
  styleUrls: ['./color-picker-input.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ColorPickerInputComponent implements ControlValueAccessor {

  colors = [
    { name: 'bg-primary', selected: false },
    { name: 'bg-secondary', selected: false },
    { name: 'bg-success', selected: false },
    { name: 'bg-info', selected: false },
    { name: 'bg-warning', selected: false },
    { name: 'bg-danger', selected: false },
    { name: 'bg-light', selected: false },
    { name: 'bg-dark', selected: false }
  ];

  private onChange: (_: any) => void = () => {};
  private onTouched: () => void = () => {};

  /**
   * Writes the initial value to `color`.
   * @param {string} v
   */
  writeValue(v: string) {
    this.selectColor(v);
  }

  /**
   * Registers the `onChange` event handler. This is a mandatory method of `ControlValueAccessor`.
   * @param {*} fn
   */
  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  /**
   * Registers the `onTouched` event handler. This is a mandatory method of `ControlValueAccessor`.
   * @param {*} fn
   */
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  /**
   * Deselects all colors except for the requested one.
   * @param {string} name
   */
  selectColor(name: string) {
    this.colors.forEach((color) => {
      color.selected = color.name === name ? true : false;
    });
    this.setValue(name);
  }

  /**
   * Sets the value of the `ControlValueAccessor`.
   * @param {string} color
   */
  setValue(color: string) {
    setTimeout(() => {
      this.onChange(color);
    });
  }

}
