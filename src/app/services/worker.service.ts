import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  constructor(
    private httpClient:HttpClient 
  ) { }

  createWorker(worker:FormGroup){
    return this.httpClient.post(environment.apiUrl+'/api/createWorker',worker)
  }

  editWorker(worker:FormGroup, id:number){
    return this.httpClient.post(environment.apiUrl+'/api/editWorker/'+id,worker,)
  }

  deleteWorker(id:number){
    return this.httpClient.get(environment.apiUrl+'/api/deleteWorker/'+id)
  }
}
