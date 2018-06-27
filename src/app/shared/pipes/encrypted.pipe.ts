import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'encrypted'
})
export class EncryptedPipe implements PipeTransform {

  transform(value: string, entity: any): string {
    if (!value || !entity) {
      return '';
    }

    if (!entity.encrypted) {
      return value;
    } else {
      return '**********';
    }
  }

}
