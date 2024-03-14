import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SubSystem } from 'src/app/models/sub-system.model';
import { System } from 'src/app/models/system.model';
import { WorkOrder } from 'src/app/models/work-order.model';
import { Worker } from 'src/app/models/worker.model';
import { GeneralService } from 'src/app/services/general.service';
import { WorkOrderService } from 'src/app/services/work-order.service';



//const month = today.getMonth();
//const year = today.getFullYear();


@Component({
  selector: 'app-work-order',
  templateUrl: './work-order.component.html',
  styleUrls: ['./work-order.component.css']
})
export class WorkOrderComponent {
  workOrderForm!: FormGroup;
  workOrder!: WorkOrder;
  subsystems!:SubSystem[];
  systems!:System[];
  workers!:Worker[];
  id_workOrder!:number;


  mostrarAlimentosYHospedaje:boolean = false;
  AlimentosYHospedaje(){
    this.mostrarAlimentosYHospedaje = !this.mostrarAlimentosYHospedaje
  }
  mostrarTransportacion:boolean = false;
  Transportacion(){
    this.mostrarTransportacion = !this.mostrarTransportacion
  }
  mostrarGastosDeMateriales:boolean = false;
  GastosDeMateriales(){
    this.mostrarGastosDeMateriales = !this.mostrarGastosDeMateriales
  }

  constructor(
    private workOrderService: WorkOrderService,
    private route: ActivatedRoute,
    private generalService:GeneralService,
    private toastr:ToastrService,
    private router:Router
  ) {


    
    this.workOrderForm = new FormGroup({
      numero_OT: new FormControl(null, [Validators.required]),
      f_emision: new FormControl(null, [Validators.required]),
      f_inicio: new FormControl(null, [Validators.required]),
      f_terminac: new FormControl(null, [Validators.required]),
      system_id: new FormControl(null, [Validators.required]),
      subSystem_id: new FormControl(null, [Validators.required]),
      trabajo_a_realizar: new FormControl(null, [Validators.required]),
      trabajo_realizado: new FormControl(null, [Validators.required]),
      f_t_1_nombre: new FormControl(null, [Validators.required]),
      f_t_1_calificacion: new FormControl(null, [Validators.required]),
      f_t_1_horas: new FormControl(null, [Validators.required]),
      f_t_2_nombre: new FormControl(),
      f_t_2_calificacion: new FormControl(),
      f_t_2_horas: new FormControl(),
      observacion: new FormControl(null, [Validators.required]),
      OT_solicitada_nombre: new FormControl(null, [Validators.required]),
      OT_solicitada_cargo: new FormControl(null, [Validators.required]),
      OT_autorizada_nombre: new FormControl(null, [Validators.required]),
      OT_autorizada_cargo: new FormControl(null, [Validators.required]),
      OT_recibida_nombre: new FormControl(null, [Validators.required]),
      OT_recibida_cargo: new FormControl(null, [Validators.required]),
      

      //Gastos de Alimentacion y Hospedaje
      g_a_fecha1: new FormControl(null),
      g_a_fecha2: new FormControl(null),
      g_a_tarj1: new FormControl(null),
      g_a_tarj2: new FormControl(null),
      g_a_slip1: new FormControl(null),
      g_a_slip2: new FormControl(null),
      g_a_importe1: new FormControl(null),
      g_a_importe2: new FormControl(null),
      g_a_tarj3: new FormControl(null),
      g_a_tarj4: new FormControl(null),
      g_a_slip3: new FormControl(null),
      g_a_slip4: new FormControl(null),
      g_a_importe3: new FormControl(null),
      g_a_importe4: new FormControl(null),
      
      //Transportacion
      vehiculo1: new FormControl(null),
      vehiculo2: new FormControl(null),
      km1: new FormControl(null),
      km2: new FormControl(null),
      diesel1: new FormControl(null),
      diesel2: new FormControl(null),
      gasolina1: new FormControl(null),
      gasolina2: new FormControl(null),
      aceite1: new FormControl(null),
      aceite2: new FormControl(null),
      
      //Vuelos
      vuelo: new FormControl(null),
      no_boleto: new FormControl(null),
      
      //Gastos de Materiales
      gm_solicitud1: new FormControl(null),
      gm_solicitud2: new FormControl(null),
      vale1: new FormControl(null),
      vale2: new FormControl(null),
      descripcion1: new FormControl(null),
      descripcion2: new FormControl(null),
      precio1: new FormControl(null),
      precio2: new FormControl(null),
      cantidad1: new FormControl(null),
      cantidad2: new FormControl(null),
      costo_total1: new FormControl(null),
      costo_total2: new FormControl(null),
      

    });

    this.systems = this.generalService.getSystems()
    this.subsystems = this.generalService.obtainSubSystemsPerSystem(1);
    this.workers = this.generalService.getWorkers();

  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id_workOrder = +params['id'];
    });




    this.workOrderService.findWorkOrder(this.id_workOrder).subscribe(
      (response) => {

        console.log('orden de trabajoID'+response.system_id)

        this.workOrder = response;
        console.log('tipo de mantenimiento: '+this.workOrder.type)
        this.subsystems = this.generalService.obtainSubSystemsPerSystem(this.workOrder.system_id)

        this.workOrderForm = new FormGroup({
          type: new FormControl(this.workOrder.type, [
            Validators.required,
          ]),
          numero_OT: new FormControl({value:this.workOrder.numero_OT,disabled:true}, [
            Validators.required,
          ]),
          f_emision: new FormControl({value:this.workOrder.f_emision, disabled:true}, [
            Validators.required,
          ]),
          f_inicio: new FormControl(this.workOrder.f_inicio, [
            Validators.required,
          ]),
          f_terminac: new FormControl(this.workOrder.f_terminac, [
            Validators.required,
          ]),
          system_id: new FormControl({value:this.workOrder.system_id, disabled:true}, [
            Validators.required,
          ]),
          subSystem_id: new FormControl({value:this.workOrder.subSystem_id, disabled:true}, [
            Validators.required,
          ]),
          trabajo_a_realizar: new FormControl(
            this.workOrder.trabajo_a_realizar,
            [Validators.required]
          ),
          trabajo_realizado: new FormControl(
            this.workOrder.trabajo_realizado,
            [Validators.required]
          ),
          f_t_1_nombre: new FormControl(this.workOrder.f_t_1_nombre, [
            Validators.required,
          ]),
          f_t_1_calificacion: new FormControl(
            this.workOrder.f_t_1_calificacion,
            [Validators.required]
          ),
          f_t_1_horas: new FormControl(this.workOrder.f_t_1_horas, [
            Validators.required,
          ]),
          f_t_2_nombre: new FormControl(this.workOrder.f_t_2_nombre, [
            Validators.required,
          ]),
          f_t_2_calificacion: new FormControl(
            this.workOrder.f_t_2_calificacion,
            [Validators.required]
          ),
          f_t_2_horas: new FormControl(this.workOrder.f_t_2_horas, [
            Validators.required,
          ]),
          observacion: new FormControl(this.workOrder.observacion, [
            Validators.required,
          ]),
          OT_solicitada_nombre: new FormControl(
            this.workOrder.OT_solicitada_nombre,
            [Validators.required]
          ),
          OT_solicitada_cargo: new FormControl(
            this.workOrder.OT_solicitada_cargo,
            [Validators.required]
          ),
          OT_autorizada_nombre: new FormControl(
            this.workOrder.OT_autorizada_nombre,
            [Validators.required]
          ),
          OT_autorizada_cargo: new FormControl(
            this.workOrder.OT_autorizada_cargo,
            [Validators.required]
          ),
          OT_recibida_nombre: new FormControl(
            this.workOrder.OT_recibida_nombre,
            [Validators.required]
          ),
          OT_recibida_cargo: new FormControl(
            this.workOrder.OT_recibida_cargo,
            [Validators.required]
          ),


          
          //Gastos de Alimentacion y Hospedaje--------------------------------------------------------
          g_a_fecha1: new FormControl(
            this.workOrder.g_a_fecha1,
            [Validators.required]
          ),
          g_a_fecha2: new FormControl(
            this.workOrder.g_a_fecha2,
            [Validators.required]
          ),

          g_a_tarj1: new FormControl(
            this.workOrder.g_a_tarj1,
            [Validators.required]
          ),
          g_a_tarj2: new FormControl(
            this.workOrder.g_a_tarj2,
            [Validators.required]
          ),
          
          g_a_slip1: new FormControl(
            this.workOrder.g_a_slip1,
            [Validators.required]
          ),
          g_a_slip2: new FormControl(
            this.workOrder.g_a_slip2,
            [Validators.required]
          ),

          g_a_importe1: new FormControl(
            this.workOrder.g_a_importe1,
            [Validators.required]
          ),
          g_a_importe2: new FormControl(
            this.workOrder.g_a_importe2,
            [Validators.required]
          ),
          
          g_a_tarj3: new FormControl(
            this.workOrder.g_a_tarj3,
            [Validators.required]
          ),
          g_a_tarj4: new FormControl(
            this.workOrder.g_a_tarj4,
            [Validators.required]
          ),
          
          g_a_slip3: new FormControl(
            this.workOrder.g_a_slip3,
            [Validators.required]
          ),
          g_a_slip4: new FormControl(
            this.workOrder.g_a_slip4,
            [Validators.required]
          ),

          g_a_importe3: new FormControl(
            this.workOrder.g_a_importe3,
            [Validators.required]
          ),
          g_a_importe4: new FormControl(
            this.workOrder.g_a_importe4,
            [Validators.required]
          ),

          //Transportacion-----------------------------------------------------------------------
          vehiculo1: new FormControl(
            this.workOrder.vehiculo1,
            [Validators.required]
          ),
          vehiculo2: new FormControl(
            this.workOrder.vehiculo2,
            [Validators.required]
          ),

          km1: new FormControl(
            this.workOrder.km1,
            [Validators.required]
          ),
          km2: new FormControl(
            this.workOrder.km2,
            [Validators.required]
          ),
          
          diesel1: new FormControl(
            this.workOrder.diesel1,
            [Validators.required]
          ),
          diesel2: new FormControl(
            this.workOrder.diesel2,
            [Validators.required]
          ),
          
          gasolina1: new FormControl(
            this.workOrder.gasolina1,
            [Validators.required]
          ),
          gasolina2: new FormControl(
            this.workOrder.gasolina2,
            [Validators.required]
          ),
          
          aceite1: new FormControl(
            this.workOrder.aceite1,
            [Validators.required]
          ),
          aceite2: new FormControl(
            this.workOrder.aceite2,
            [Validators.required]
          ),

          //Vuelos----------------------------------------------------------
          vuelo: new FormControl(
            this.workOrder.vuelo,
            [Validators.required]
          ),
          no_boleto: new FormControl(
            this.workOrder.no_boleto,
            [Validators.required]
          ),

          //Gastos de Materiales
          gm_solicitud1: new FormControl(
            this.workOrder.gm_solicitud1,
            [Validators.required]
          ),
          gm_solicitud2: new FormControl(
            this.workOrder.gm_solicitud2,
            [Validators.required]
          ),
          
          vale1: new FormControl(
            this.workOrder.vale1,
            [Validators.required]
          ),
          vale2: new FormControl(
            this.workOrder.vale2,
            [Validators.required]
          ),
          
          descripcion1: new FormControl(
            this.workOrder.descripcion1,
            [Validators.required]
          ),
          descripcion2: new FormControl(
            this.workOrder.descripcion2,
            [Validators.required]
          ),
          
          precio1: new FormControl(
            this.workOrder.precio1,
            [Validators.required]
          ),
          precio2: new FormControl(
            this.workOrder.precio2,
            [Validators.required]
          ),
          
          cantidad1: new FormControl(
            this.workOrder.cantidad1,
            [Validators.required]
          ),
          cantidad2: new FormControl(
            this.workOrder.cantidad2,
            [Validators.required]
          ),
          
          costo_total1: new FormControl(
            this.workOrder.costo_total1,
            [Validators.required]
          ),
          costo_total2: new FormControl(
            this.workOrder.costo_total2,
            [Validators.required]
          ),

        })


      },
      (error) => {
        console.log(error);
      }
    );
  }

  obtainSubSystemName(subSystem_id:number){
    return this.generalService.obtainSubSystemName(subSystem_id)
  }

  changeSubSystems(){
    this.subsystems = this.generalService.obtainSubSystemsPerSystem(parseInt(this.workOrderForm.value.system_id));
    console.log('subssistemas: '+this.subsystems)
    console.log('antes id sistema: '+this.workOrderForm.value.system_id)
    console.log('antes id Sub sistema: '+this.workOrderForm.value.subSystem_id)
    this.workOrderForm.value.subSystem_id = this.subsystems[0].id;
    console.log('despues id sistema: '+this.workOrderForm.value.system_id)
    console.log('despues id Sub sistema: '+this.workOrderForm.value.subSystem_id)
  }

  getWorkerLevel(name:string){
    for(let worker of this.workers){
      if(name === worker.name){
        return worker.level
      }
    }
    return null;
  }

  getSubSystemByID(id:number){
    for(let subSystem of this.subsystems){
      if(id === subSystem.id){
        return subSystem
      }
    }

    return this.subsystems[0]
  }


  onSave(){
    //porque al poner disabled me hace undefined a esos dos campos y aqui les vuelvo a dar valor
    this.workOrderForm.value.numero_OT = this.workOrder.numero_OT;
    this.workOrderForm.value.system_id = this.workOrder.system_id;
    this.workOrderForm.value.subSystem_id = this.workOrder.subSystem_id;
    this.workOrderForm.value.f_emision = this.workOrder.f_emision

    if(this.workOrderForm.value.trabajo_a_realizar==null){
      this.workOrderForm.value.trabajo_a_realizar = 'Mantenimiento '+this.workOrder.type +' a '+this.getSubSystemByID(this.workOrder.subSystem_id).name 
    }

    if(this.workOrderForm.value.trabajo_realizado==null){
      this.workOrderForm.value.trabajo_realizado = 'Mantenimiento realizado según lo establecido en la '+this.getSubSystemByID(this.workOrder.subSystem_id).IT
    }

    if(this.workOrderForm.value.observacion==null){
      this.workOrderForm.value.observacion = 'Sin observación'
    }

    this.workOrderForm.value.f_t_1_calificacion = this.getWorkerLevel(this.workOrderForm.value.f_t_1_nombre)
    this.workOrderForm.value.f_t_2_calificacion = this.getWorkerLevel(this.workOrderForm.value.f_t_2_nombre)

    this.workOrderForm.value.OT_solicitada_cargo = this.getWorkerLevel(this.workOrderForm.value.OT_solicitada_nombre)
    this.workOrderForm.value.OT_autorizada_cargo = this.getWorkerLevel(this.workOrderForm.value.OT_autorizada_nombre)
    this.workOrderForm.value.OT_recibida_cargo = this.getWorkerLevel(this.workOrderForm.value.OT_recibida_nombre)


    if(this.workOrderForm.value.system_id == 24){
      alert('Recuerde modificar el documento word de esta orden de trabajo')
    }

    this.workOrderService
      .editWord(this.workOrderForm.value,this.id_workOrder,)
      .subscribe(
        (response) => {
          console.log(response)
          this.toastr.success(
            'Orden de trabajo creada',
            'EXITO',
            { timeOut: 1500, progressBar: true }
          );
        },
        (error) => {
          console.log(error);
          this.toastr.error(
            'Error al guardar',
            'ERROR',
            { timeOut: 1500, progressBar: true }
          );
        }
      );
  }
  

  //arreglar esto, que vuelva a la pagina anterior
  return(){
    this.router.navigate(['/home/work-order-list']);
  }
}
