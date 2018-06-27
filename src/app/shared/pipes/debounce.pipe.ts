import { ChangeDetectorRef, NgZone, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'debounce',
  pure: false
})
export class DebouncePipe implements PipeTransform {

  private currentValue = null;
  private transformValue = null;
  private timeoutHandle;
  private debounceTimeDefault = 500;

  constructor(private changeDetectorRef: ChangeDetectorRef, private ngZone: NgZone) {}

  transform(value: any, debounceTime?: any): any {
    if (this.currentValue === null) {
      this.currentValue = value;
      return value;
    }
    if (this.currentValue === value) {
      // There is no value that needs debouncing at this point.
      clearTimeout(this.timeoutHandle);
      return value;
    }
    if (this.transformValue !== value) {
      // There is a new value that needs to be debounced.
      this.transformValue = value;
      clearTimeout(this.timeoutHandle);
      this.timeoutHandle = setTimeout(() => {
        this.ngZone.run(() => {
          this.currentValue = this.transformValue;
          this.transformValue = null;
          this.changeDetectorRef.markForCheck();
        });
      }, typeof debounceTime === 'number' ? debounceTime : this.debounceTimeDefault);
    }

    return this.currentValue;
  }

}
