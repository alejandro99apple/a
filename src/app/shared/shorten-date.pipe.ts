import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenDate'
})
export class ShortenDatePipe implements PipeTransform {

  transform(value: Date): unknown {
    if(value!=null){
      return value.toString().substr(0,10)
    }
    else return
  }

}
