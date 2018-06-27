import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'elementPosition',
  pure: true
})
export class ElementPositionPipe implements PipeTransform {

  transform(value: HTMLElement, xLerp: number, yLerp: number): any {
    if (value !== null) {
      const boundingRect = value.getBoundingClientRect();
      return {
        x: boundingRect.left + xLerp * boundingRect.width,
        y: boundingRect.top + yLerp * boundingRect.height
      };
    } else {
      return null;
    }
  }
  
}
