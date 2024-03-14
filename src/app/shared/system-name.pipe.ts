import { Pipe, PipeTransform } from '@angular/core';
import { GeneralService } from '../services/general.service';

@Pipe({
  name: 'systemName'
})
export class SystemNamePipe implements PipeTransform {
  
  constructor(
    private generalService:GeneralService
  ){}


  transform(id:number): unknown {
    let sys = this.generalService.getSystems();
    for(let system of sys){
      if(id === system.id){
        return system.name
      }
    }
  

    return null;
  }

}
