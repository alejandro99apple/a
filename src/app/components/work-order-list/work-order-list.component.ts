import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SubSystem } from 'src/app/models/sub-system.model';
import { System } from 'src/app/models/system.model';
import { WorkOrder } from 'src/app/models/work-order.model';
import { GeneralService } from 'src/app/services/general.service';
import { WorkOrderService } from 'src/app/services/work-order.service';

@Component({
  selector: 'app-work-order-list',
  templateUrl: './work-order-list.component.html',
  styleUrls: ['./work-order-list.component.css']
})
export class WorkOrderListComponent {
  
  MONTHS = [
    {value: '01', viewValue: 'Enero'},
    {value: '02', viewValue: 'Febrero'},
    {value: '03', viewValue: 'Marzo'},
    {value: '04', viewValue: 'Abril'},
    {value: '05', viewValue: 'Mayo'},
    {value: '06', viewValue: 'Junio'},
    {value: '07', viewValue: 'Julio'},
    {value: '08', viewValue: 'Agosto'},
    {value: '09', viewValue: 'Septiembre'},
    {value: '10', viewValue: 'Octubre'},
    {value: '11', viewValue: 'Noviembre'},
    {value: '12', viewValue: 'Diciembre'},
  ];
  YEARS = [
    {value: '2024', viewValue: '2024'},
    {value: '2025', viewValue: '2025'},
    {value: '2026', viewValue: '2026'},
    {value: '2027', viewValue: '2027'},
    {value: '2028', viewValue: '2028'},
    {value: '2029', viewValue: '2029'},

  ];

  date!:string;
  secondForm!:FormGroup;
  filterMonthForm:any;
  newOrderForm:any;
  workOrderList : WorkOrder[] = [];
  subsystems!:SubSystem[];
  systems!:System[];
  days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
  showNewForm = false;
  isAdmin = false;
  

  constructor(
    private workService:WorkOrderService,
    private generalService:GeneralService,
    private toastr:ToastrService,
  ){
  }

  selectedIndexSystem:number = 0;
  systemField!:any;
  selectedIndexSubSystem:number = 0;
  subSystemField!:any;


  ngOnInit(){
    this.isAdmin = this.generalService.getUser().username == 'admin' ? true  : false;
    this.date = new Date(Date.now()).toISOString().slice(0,10)
    this.systems = this.generalService.getSystems()
    this.subsystems = this.generalService.obtainSubSystemsPerSystem(this.systems[0].id);

    this.filterMonthForm = new FormGroup({
      year: new FormControl(),
      month: new FormControl(),
    });

    this.generalService.setfilterDates(+this.date.slice(0,4),this.date.slice(5,7))

    if(this.generalService.getfilterDates()!=undefined){
      console.log('filter dates en init: '+this.generalService.getfilterDates().month)
      this.filterMonthForm = new FormGroup({
        year: new FormControl(this.generalService.getfilterDates().year),
        month: new FormControl(this.generalService.getfilterDates().month),
      });

      this.onFilter()
    }
  }


  onFilter(){
    console.log(this.filterMonthForm.value)
    if(this.showNewForm){
      this.showNewForm = !this.showNewForm
    }
    this.workService.filterWorkOrdersPerMonth(this.filterMonthForm.value.year, this.filterMonthForm.value.month).subscribe(
      (response)=>{
        this.workOrderList = response;

        this.generalService.setfilterDates(this.filterMonthForm.value.year,this.filterMonthForm.value.month)
      },
      (error)=>{
        console.log(error)
      }
    )
  }
  

  onStartAddindNewWorkOrder(){
    if(this.showNewForm){
      this.newOrderForm.reset();
      this.showNewForm = false;
    }
    else{
      this.InitForm();
      this.showNewForm = true;
      this.systemField = document.getElementById('systems') as HTMLSelectElement;
      this.subSystemField = document.getElementById('subsystems') as HTMLSelectElement;
    }
  }

  InitForm(){
    this.newOrderForm = new FormGroup({
      numero_OT: new FormControl(0),
      day: new FormControl(1),
      system_id: new FormControl(this.systems[0].id),
      subSystem_id: new FormControl(this.subsystems[0].id),
      type: new FormControl('Mensual'),
    });

    this.secondForm = new FormGroup({
      subSystem_id: new FormControl(this.subsystems[0].id),

    })

    this.systemField = document.getElementById('systems') as HTMLSelectElement;
    this.subSystemField = document.getElementById('subsystems') as HTMLSelectElement;
  }

  changeSystems(){
    this.subsystems = this.generalService.obtainSubSystemsPerSystem(parseInt(this.newOrderForm.value.system_id));

    console.log('antes id Sub sistema: '+this.newOrderForm.value.subSystem_id)
    this.newOrderForm.value.subSystem_id = this.subsystems[0].id;

    this.secondForm.reset();
    this.secondForm.value.subSystem_id = this.subsystems[0].id;

    console.log('despues id sistema: '+this.newOrderForm.value.system_id)
    console.log('despues id Sub sistema: '+this.newOrderForm.value.subSystem_id)
  }

  changeSubSystems(){
    this.selectedIndexSubSystem = this.newOrderForm.value.subSystem_id;
  }

  onAddNewWorkOrder(){
    this.newOrderForm.value.subSystem_id = this.secondForm.value.subSystem_id;
    console.log('valor del subsistema al submit: '+this.newOrderForm.value.subSystem_id)
    let day =  this.newOrderForm.value.day < 10 ? '0'+this.newOrderForm.value.day : this.newOrderForm.value.day
    this.newOrderForm.value.f_emision = this.filterMonthForm.value.year+'/'+this.filterMonthForm.value.month+'/'+day;

    this.workService.createWorkOrder(this.newOrderForm.value).subscribe(
      (response)=>{
        console.log(response)

        let data:{status:number,message:string}
        data = <any>response

        if(data.status===1){
          this.onFilter();
          this.subsystems = this.generalService.obtainSubSystemsPerSystem(1)
          this.InitForm();
          this.showNewForm = false;
          this.toastr.success(
            'Orden de trabajo creada',
            'EXITO',
            { timeOut: 1500, progressBar: true }
          );

        }
        if(data.status===2){
          this.toastr.warning(
            'Ya existe una orden de trabajo con ese número',
            'ATENCIÓN',
            { timeOut: 1500, progressBar: true }
          );
          console.log('valor del subsistema fallar: '+this.newOrderForm.value.subSystem_id)
        }


      },
      (error)=>{
        console.log(error)
        this.toastr.error(
          'Error inesperado',
          'ERROR',
          { timeOut: 1500, progressBar: true }
        );
      }
    )
  }



  obtainSystemName(system_id:number){
    return this.generalService.obtainSystemName(system_id)
  }

  obtainSubSystemName(subSystem_id:number){
    return this.generalService.obtainSubSystemName(subSystem_id)
  }


  onDeleteWorkOrder(workOrder_id:number){

    if(confirm("¿Desea Eliminar esta orden de trabajo?")==true){


  
      this.workService.deleteWorker(workOrder_id).subscribe(
        (response)=>{
          let responseData:{status:number,message:string,code:number} = <any>response
          if(responseData.status==1){
            this.toastr.success(
              'Orden de Trabajo eliminada',
              'EXITO',
              { timeOut: 1500, progressBar: true }
            );
            this.onFilter();
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
}
