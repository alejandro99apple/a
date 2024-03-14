import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hideNull'
})
export class HideNullPipe implements PipeTransform {

  transform(value: any): unknown {
    if(value===null){
      return ''
    }
    else return value
  }
}
