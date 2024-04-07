import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Worker } from 'src/app/models/worker.model';
import { GeneralService } from 'src/app/services/general.service';
import { WorkerService } from 'src/app/services/worker.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.css']
})
export class WorkerComponent {

  workersList!:Worker[];
  newWorkerForm!:FormGroup;
  workerID!:number;
  showAddWorker = false;
  showEditWorker = false;

  constructor(
    private generalService:GeneralService,
    private workerService:WorkerService,
    private toastr:ToastrService,
  ){

  }

  ngOnInit(){
    this.workersList = this.generalService.getWorkers();
    this.newWorkerForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'phoneNumber': new FormControl(null, [Validators.required]),
      'address': new FormControl(null, [Validators.required]),
      'level': new FormControl(null, [Validators.required]),

    })
  }

  onSubmit(){
    console.log(this.newWorkerForm.value)

    if(this.showAddWorker){

      this.workerService.createWorker(this.newWorkerForm.value).subscribe(
        (response)=>{

          let data:{message:string,status:number, code:number}=<any>response

          if(data.status==0){
            this.toastr.warning(
              data.message,
              'WARNING',
              { timeOut: 1500, progressBar: true }
            );
          }

          else if(data.status==1){
            this.toastr.success(
              data.message,
              'EXITO',
              { timeOut: 1500, progressBar: true }
            );
            this.generalService.generateWorkers()
            setTimeout(()=>{;this.workersList = this.generalService.getWorkers();},1500)
            this.newWorkerForm.reset();
            this.onToggleNewworker();
          }
        },
        (error)=>{
          console.log(error);
          this.toastr.error(
            'El email ya esta en uso',
            'ERROR',
            { timeOut: 1500, progressBar: true }
          );
        }
      )
    }
    else{
      this.workerService.editWorker(this.newWorkerForm.value, this.workerID ).subscribe(
        (response)=>{
          let responseData:{status:number,message:string,code:number} = <any>response
          if(responseData.status==1){
            this.toastr.success(
              'Trabajador actualizado',
              'EXITO',
              { timeOut: 1500, progressBar: true }
            );
            this.generalService.generateWorkers()
            setTimeout(()=>{;this.workersList = this.generalService.getWorkers();},1500)
          }
        },
        (error)=>{
          console.log(error);
          this.toastr.error(
            'Error inesperado',
            'ERROR',
            { timeOut: 1500, progressBar: true }
          );
        }
      )
      this.showEditWorker = false;
    }
  }

  onToggleNewworker(){
    this.showAddWorker = !this.showAddWorker
    this.showEditWorker = false;
  }

  onCancelNewWorker(){
    this.newWorkerForm.reset();
    this.onToggleNewworker();
  }


  onDeleteWorker(worker_id:number){

    if(confirm("¿Desea Eliminar a este trabajador?")==true){

      this.showEditWorker = false;
      this.showAddWorker = false;
  
      this.workerService.deleteWorker(worker_id).subscribe(
        (response)=>{
          let responseData:{status:number,message:string,code:number} = <any>response
          if(responseData.status==1){
            this.toastr.success(
              'Trabajador eliminado',
              'EXITO',
              { timeOut: 1500, progressBar: true }
            );
            this.generalService.generateWorkers()
            setTimeout(()=>{;this.workersList = this.generalService.getWorkers();},1500)
          }
        },
        (error)=>{
          console.log(error);
          this.toastr.error(
            'Error inesperado',
            'ERROR',
            { timeOut: 1500, progressBar: true }
          );
        }
      )
    }
    else{
      return
    }

  }

  onEditWorker(id:number){
    let worker = this.generalService.getWorker(id)
    this.workerID = id;

    this.newWorkerForm = new FormGroup({
      'name': new FormControl(worker.name, [Validators.required]),
      'email': new FormControl(worker.email, [Validators.required, Validators.email]),
      'phoneNumber': new FormControl(worker.phoneNumber, [Validators.required]),
      'address': new FormControl(worker.address, [Validators.required]),
      'level': new FormControl(worker.level, [Validators.required]),
    })
    this.showEditWorker = true;
    this.showAddWorker = false;
  }

}
