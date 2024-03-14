import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'workToDo'
})
export class WorkToDoPipe implements PipeTransform {

  transform(value: string): unknown {
    return null;
  }

}
