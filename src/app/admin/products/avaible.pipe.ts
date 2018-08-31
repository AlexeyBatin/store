import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'avaible'
})
export class AvaiblePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      return 'Yes';
    }
    return 'No';
  }

}
