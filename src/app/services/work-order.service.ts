import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { WorkOrder } from '../models/work-order.model';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class WorkOrderService {

  constructor(
    private httpClient:HttpClient 
  ) { }

  editWord(OT:any,id_workOrder:number){
    return this.httpClient.post(environment.apiUrl+'/api/editWord/'+id_workOrder,OT)
  }

  createWorkOrder(OT:FormGroup){
    return this.httpClient.post(environment.apiUrl+'/api/createWorkOrder/',OT,)
  }

  findWorkOrder(id_workOrder:number){
    return this.httpClient.get<WorkOrder>(environment.apiUrl+'/api/findWorkOrder/'+id_workOrder)
  }

  filterWorkOrdersPerMonth(year:number,month:number){
    return this.httpClient.get<WorkOrder[]>(environment.apiUrl+'/api/filterWorkOrdersPerMonth/'+year+'/'+month)
  }

  deleteWorker(id:number){
    return this.httpClient.get(environment.apiUrl+'/api/deleteWorkOrder/'+id)
  }
}
