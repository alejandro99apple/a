import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

  date!:string;
  filterMonthForm:any;
  newOrderForm:any;
  workOrderList : WorkOrder[] = [];
  subsystems!:SubSystem[];
  systems!:System[];
  btnTouched = false;
  days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
  showNewOption = false;
  
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

  constructor(
    private workService:WorkOrderService,
    private generalService:GeneralService,
  ){
  }

  ngOnInit(){

    this.date = new Date(Date.now()).toISOString().slice(0,10)
    this.systems = this.generalService.getSystems()
    this.subsystems = this.generalService.obtainSubSystemsPerSystem(1)


    this.filterMonthForm = new FormGroup({
      year: new FormControl(),
      month: new FormControl(),
    });

    this.newOrderForm = new FormGroup({
      day: new FormControl(1),
      system_id: new FormControl(1),
      subSystem_id: new FormControl(1),
      type: new FormControl('Mensual'),
      numero_OT: new FormControl(0),
    });

    this.systems = this.generalService.getSystems()
    this.subsystems = this.generalService.obtainSubSystemsPerSystem(1)

    if(this.generalService.getfilterDates()!=undefined){
      console.log('filter dates en init: '+this.generalService.getfilterDates().month)
      this.filterMonthForm = new FormGroup({
        year: new FormControl(this.generalService.getfilterDates().year),
        month: new FormControl(this.generalService.getfilterDates().month),
      });

      this.onFilter()
    }
  }

  showWorkOrdersPerMonth(){
    this.btnTouched = true;
    this.showNewOption = true;
    this.onFilter()
  }

  onFilter(){
    console.log(this.filterMonthForm.value)
    this.workService.filterWorkOrdersPerMonth(this.filterMonthForm.value).subscribe(
      (response)=>{
        this.workOrderList = response;

        this.generalService.setfilterDates(this.filterMonthForm.value.year,this.filterMonthForm.value.month)
      },
      (error)=>{
        console.log(error)
      }
    )
  }


  changeSubSystems(){
    this.subsystems = this.generalService.obtainSubSystemsPerSystem(parseInt(this.newOrderForm.value.system_id));
    console.log('subssistemas: '+this.subsystems)
    console.log('antes id sistema: '+this.newOrderForm.value.system_id)
    console.log('antes id Sub sistema: '+this.newOrderForm.value.subSystem_id)
    this.newOrderForm.value.subSystem_id = this.subsystems[0].id;
    console.log('despues id sistema: '+this.newOrderForm.value.system_id)
    console.log('despues id Sub sistema: '+this.newOrderForm.value.subSystem_id)
  }

  obtainSystemName(system_id:number){
    return this.generalService.obtainSystemName(system_id)
  }

  obtainSubSystemName(subSystem_id:number){
    return this.generalService.obtainSubSystemName(subSystem_id)
  }

  onAddNewWorkOrder(){
    let day =  this.newOrderForm.value.day < 10 ? '0'+this.newOrderForm.value.day : this.newOrderForm.value.day
    this.newOrderForm.value.f_emision = this.filterMonthForm.value.year+'/'+this.filterMonthForm.value.month+'/'+day;
    console.log('Valor'+this.newOrderForm)
    this.workService.createWorkOrder(this.newOrderForm.value).subscribe(
      (response)=>{
        console.log(response)
        this.onFilter()
      },
      (error)=>{
        console.log(error)
      }
    )
  }


}
