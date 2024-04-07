import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SubSystem } from 'src/app/models/sub-system.model';
import { System } from 'src/app/models/system.model';
import { GeneralService } from 'src/app/services/general.service';
import { SystemService } from 'src/app/services/system.service';

@Component({
  selector: 'app-systems',
  templateUrl: './systems.component.html',
  styleUrls: ['./systems.component.css']
})
export class SystemsComponent {

  // Variables de sub sistemas-----------
  subSystems: SubSystem[] = [];
  subSystemsForm!: FormGroup;
  subSystemIDEdited!: number
  editSubSystem = false;
  newSubSystem = false;
  
  //Variables de sistemas--------------
  systems: System[] = [];
  systemsForm!: FormGroup;
  systemIDEdited!: number
  editSystem = false;
  newSystem = false;


  constructor(
    private generalService: GeneralService,
    private systemService: SystemService,
    private toastr: ToastrService,
  ) { }


  ngOnInit() {
    this.systems = this.generalService.getSystems();
    this.subSystems = this.generalService.getSubSystems();
  }

  obtainSystemName(system_id: number) {
    return this.generalService.obtainSystemName(system_id)
  }


  //Sub sistemas  --------------------------------------------------------------------------
  onAddSubSystem() {
    this.subSystemsForm = new FormGroup({
      system_id: new FormControl(1),
      name: new FormControl(null),
      IT: new FormControl(null)
    })

    this.newSubSystem = true;
    this.editSubSystem = false;
    this.editSystem = false;
    this.newSystem = false;
  }


  changeSubSystems() {
    this.subSystems = this.generalService.obtainSubSystemsPerSystem(parseInt(this.subSystemsForm.value.system_id));
    this.subSystemsForm.value.subSystem_id = this.subSystems[0].id;
  }



  onStartEditingSubSystem(id: number) {
    this.subSystemIDEdited = id;
    this.editSubSystem = true;
    this.newSubSystem = false;
    this.editSystem = false;
    this.newSystem = false;

    this.subSystemsForm = new FormGroup({
      system_id: new FormControl(this.generalService.obtainSubSystemByID(id).system_id),
      name: new FormControl(this.generalService.obtainSubSystemByID(id).name),
      IT: new FormControl(this.generalService.obtainSubSystemByID(id).IT)
    })

  }

  onSubmit() {

    //--Si se esta creando un nuevo subsistema-------
    if (this.newSubSystem) {
      this.systemService.createSubSystem(this.subSystemsForm.value).subscribe(
        (response) => {
          let responseData:{status:number,message:string,code:number} = <any>response
          if(responseData.status==1){
            this.toastr.success(
              'Sub Sistema creado',
              'EXITO',
              { timeOut: 1500, progressBar: true }
            );
            this.refreshSystemsAndSubSystems();
            this.onCancel();
          }
        },
        (error) => {
          console.log(error);
          this.toastr.error(
            'Error inesperado',
            'ERROR',
            { timeOut: 1500, progressBar: true }
          );
        }
      )

      //--Si se esta editando un subsistema-------
    } else if (this.editSubSystem){
      this.systemService.editSubSystem(this.subSystemsForm.value, this.subSystemIDEdited).subscribe(
        (response) => {
          let responseData:{status:number,message:string,code:number} = <any>response
          if(responseData.status==1){
            this.toastr.success(
              'Sub Sistema actualizado',
              'EXITO',
              { timeOut: 1500, progressBar: true }
            );
            this.refreshSystemsAndSubSystems();
            this.onCancel();
          }
        },
        (error) => {
          console.log(error);
          this.toastr.error(
            'Error inesperado',
            'ERROR',
            { timeOut: 1500, progressBar: true }
          );
        }
      )
    }

      //--Si se esta creando un nuevo Sistema-------
    else if(this.newSystem){

      this.systemService.createSystem(this.systemsForm.value).subscribe(
        (response) => {
          let responseData:{status:number,message:string,code:number} = <any>response
          if(responseData.status==1){
            this.toastr.success(
              'Sistema creado',
              'EXITO',
              { timeOut: 1500, progressBar: true }
            );
            this.refreshSystemsAndSubSystems();
            this.onCancel();
          }
        },
        (error) => {
          console.log(error);
          this.toastr.error(
            'Error inesperado',
            'ERROR',
            { timeOut: 1500, progressBar: true }
          );
        }
      )

    }

      //--Si se esta editando un Sistema-------
    else if(this.editSystem){

      this.systemService.editSystem(this.systemsForm.value, this.systemIDEdited).subscribe(
        (response) => {
          let responseData:{status:number,message:string,code:number} = <any>response
          if(responseData.status==1){
            this.toastr.success(
              'Sistema actualizado',
              'EXITO',
              { timeOut: 1500, progressBar: true }
            );
            this.refreshSystemsAndSubSystems();
            this.onCancel();
          }
        },
        (error) => {
          console.log(error);
          this.toastr.error(
            'Error inesperado',
            'ERROR',
            { timeOut: 1500, progressBar: true }
          );
        }
      )
    }
  }



  onDeleteSubSystem(id: number) {
    this.onCancel();
    if (confirm("¿Desea Eliminar a este sub sistema?") == true) {
      this.systemService.deleteSubSystem(id).subscribe(
        (response) => {
          let responseData:{status:number,message:string,code:number} = <any>response
          if(responseData.status==1){
            this.toastr.success(
              'Sub Sistema eliminado',
              'EXITO',
              { timeOut: 1500, progressBar: true }
            );
            this.refreshSystemsAndSubSystems();
          }
        },
        (error) => {
          console.log(error);
          this.toastr.error(
            'Error inesperado',
            'ERROR',
            { timeOut: 1500, progressBar: true }
          );
        }
      )
    }
    else { return }
  }

  onCancel() {
    this.newSubSystem = this.newSystem = this.editSubSystem = this.editSystem = false;
  }

  // Sistemas--------------------------------------------------------------------------------------


  onAddSystem() {
    this.systemsForm = new FormGroup({
      name: new FormControl(null),
    })

    this.newSystem = true;
    this.editSystem = false;
    this.editSubSystem = false;
    this.newSubSystem = false;
  }


  onStartEditingSystem(id: number) {
    this.systemIDEdited = id;
    this.editSubSystem = false;
    this.newSubSystem = false;
    this.editSystem = true;
    this.newSystem = false;

    this.systemsForm = new FormGroup({
      name: new FormControl(this.generalService.obtainSystemByID(id).name)
    })

  }

  onDeleteSystem(id: number) {
    this.onCancel();
    if (confirm("¿Desea Eliminar a este Sistema? Se eliminarán también todos los subsistemas asociados a este") == true) {
      this.systemService.deleteSystem(id).subscribe(
        (response) => {
          let responseData:{status:number,message:string,code:number} = <any>response
          if(responseData.status==1){
            this.toastr.success(
              'Sistema eliminado',
              'EXITO',
              { timeOut: 1500, progressBar: true }
            );
            this.refreshSystemsAndSubSystems();
          }
        },
        (error) => {
          console.log(error);
          this.toastr.error(
            'Error inesperado',
            'ERROR',
            { timeOut: 1500, progressBar: true }
          );
        }
      )
    }
    else { return }
  }




  refreshSystemsAndSubSystems(){
    this.generalService.generateSystemsAndSubSystems()
    setTimeout(() => {
      ; this.systems = this.generalService.getSystems();
      this.subSystems = this.generalService.getSubSystems();
    }, 1500)
  }
}
