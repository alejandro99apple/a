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
  showAddWorker = false;

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
    this.workerService.createWorker(this.newWorkerForm.value).subscribe(
      (response)=>{
        this.toastr.success(
          'Trabajador añadido',
          'EXITO',
          { timeOut: 1500, progressBar: true }
        );
        this.generalService.generateWorkers()
        setTimeout(()=>{;this.workersList = this.generalService.getWorkers();},1500)
        this.newWorkerForm.reset();
        this.onToggleNewworker();
      },
      (error)=>{
        console.log(error);
        this.toastr.error(
          'El email ya esta en uso',
          'EXITO',
          { timeOut: 1500, progressBar: true }
        );
      }
    )
  }

  onToggleNewworker(){
    this.showAddWorker = !this.showAddWorker
  }

  onCancelNewWorker(){
    this.newWorkerForm.reset();
    this.onToggleNewworker();
  }
}
