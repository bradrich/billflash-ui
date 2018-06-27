import { ChangeDetectorRef, NgZone, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'naturalTyping',
  pure: false
})
export class NaturalTypingPipe implements PipeTransform {

  private typed = '';
  private target = '';
  private currentIndex = -1;
  private timeoutHandle;

  constructor(private changeDetectorRef: ChangeDetectorRef, private ngZone: NgZone) {}

  transform(value: any, minTypingSpeed: number = 30): any {
    if (this.target !== value) {
      clearTimeout(this.timeoutHandle);
      this.typed = '';
      this.target = value;
      this.currentIndex = -1;
      this.typeNextCharacter(minTypingSpeed);
    }
    return this.typed;
  }

  private typeNextCharacter(minTypingSpeed: number) {
    this.currentIndex++;
    this.typed = this.target.substr(0, this.currentIndex);
    this.changeDetectorRef.markForCheck();
    if (this.typed !== this.target) {
      const time = Math.round(Math.random() * 70) + minTypingSpeed;
      this.timeoutHandle = setTimeout(() => {
        this.ngZone.run(() => this.typeNextCharacter(minTypingSpeed));
      }, time);
    }
  }

}
