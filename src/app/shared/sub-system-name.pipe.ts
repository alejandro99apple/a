import { Pipe, PipeTransform } from '@angular/core';
import { GeneralService } from '../services/general.service';

@Pipe({
  name: 'subSytemName'
})
export class SubSystemNamePipe implements PipeTransform {

  constructor(
    private generalService:GeneralService
  ){}


  transform(id:number): unknown {
    let subSys = this.generalService.getSubSystems();
    for(let subSystem of subSys){
      if(id === subSystem.id){
        return subSystem.name
      }
    }
  

    return null;
  }
}
