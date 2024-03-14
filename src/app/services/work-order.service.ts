import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { WorkOrder } from '../models/work-order.model';

@Injectable({
  providedIn: 'root'
})
export class WorkOrderService {

  constructor(
    private httpClient:HttpClient 
  ) { }

  editWord(OT:any,id_maintenance:number){
    return this.httpClient.post(environment.apiUrl+'/api/word/editWord/'+id_maintenance,OT)
  }

  createWorkOrder(OT:any){
    return this.httpClient.post(environment.apiUrl+'/api/word/createWorkOrder/',OT)
  }

  findWorkOrder(id_workOrder:number){
    return this.httpClient.get<WorkOrder>(environment.apiUrl+'/api/findWorkOrder/'+id_workOrder)
  }
  filterWorkOrdersPerMonth(month:FormGroup){
    return this.httpClient.post<WorkOrder[]>(environment.apiUrl+'/api/filterWorkOrdersPerMonth/',month)
  }
}
