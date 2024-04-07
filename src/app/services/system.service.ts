import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  constructor(
    private httpClient:HttpClient ,
  ) { }


  editSubSystem(subSystemsForm:FormGroup,id:number){
    return this.httpClient.post(environment.apiUrl+'/api/editSubSystem/'+id,subSystemsForm)
  }

  createSubSystem(subSystemsForm:FormGroup){
    return this.httpClient.post(environment.apiUrl+'/api/createSubSystem/',subSystemsForm)
  }

  deleteSubSystem(id:number){
    return this.httpClient.get(environment.apiUrl+'/api/deleteSubSystem/'+id)
  }


  editSystem(systemsForm:FormGroup,id:number){
    return this.httpClient.post(environment.apiUrl+'/api/editSystem/'+id,systemsForm)
  }

  createSystem(systemsForm:FormGroup){
    return this.httpClient.post(environment.apiUrl+'/api/createSystem/',systemsForm)
  }

  deleteSystem(id:number){
    return this.httpClient.get(environment.apiUrl+'/api/deleteSystem/'+id)
  }
}
