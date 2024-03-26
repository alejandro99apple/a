import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { WorkOrder } from '../models/work-order.model';
import { HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class WorkOrderService {


  headers= new HttpHeaders()
  .set('Access-Control-Allow-Headers', 'Content-Type')
  .set('Access-Control-Allow-Origin', '*')
  .set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');


  test(){
    return this.httpClient.get('https://httpbin.org/headers', {headers:this.headers})
  }

  constructor(
    private httpClient:HttpClient 
  ) { }

  editWord(OT:any,id_maintenance:number){
    return this.httpClient.post(environment.apiUrl+'/api/word/editWord/'+id_maintenance,OT)
  }

  createWorkOrder(OT:FormGroup){
    


    return this.httpClient.post(environment.apiUrl+'/api/word/createWorkOrder/',OT, {headers:this.headers})
  }

  findWorkOrder(id_workOrder:number){
    return this.httpClient.get<WorkOrder>(environment.apiUrl+'/api/findWorkOrder/'+id_workOrder)
  }
  filterWorkOrdersPerMonth(year:number,month:number){
    return this.httpClient.get<WorkOrder[]>(environment.apiUrl+'/api/filterWorkOrdersPerMonth/'+year+'/'+month)
  }
}
