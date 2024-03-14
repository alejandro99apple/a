export class WorkOrder {
    'id': number;
    'type': string;
    'numero_OT': number;
    'f_emision': Date;
    'f_inicio': Date;
    'f_terminac': Date;
    'system_id': number;
    'subSystem_id': number;
    'trabajo_a_realizar': string;
    'trabajo_realizado': string;

    //Fuerza de trabajo
    'f_t_1_nombre': string;
    'f_t_1_calificacion': string;
    'f_t_1_horas': number;
    'f_t_2_nombre': string;
    'f_t_2_calificacion': string;
    'f_t_2_horas': number;

    //Observacion
    'observacion': string;

    //Solicitud
    'OT_solicitada_nombre': string;
    'OT_solicitada_cargo': string;
    'OT_autorizada_nombre': string;
    'OT_autorizada_cargo': string;
    'OT_recibida_nombre': string;
    'OT_recibida_cargo': string;

    //Gastos de Alimentacion y Hospedaje
    'g_a_fecha1': Date;
    'g_a_fecha2': Date;
    'g_a_tarj1': string;
    'g_a_tarj2': string;
    'g_a_slip1': string;
    'g_a_slip2': string;
    'g_a_importe1': number;
    'g_a_importe2': number;
    'g_a_tarj3': string;
    'g_a_tarj4': string;
    'g_a_slip3': string;
    'g_a_slip4': string;
    'g_a_importe3': number;
    'g_a_importe4': number;

    //Transportacion
    'vehiculo1': string;
    'vehiculo2': string;
    'km1': number;
    'km2': number;
    'diesel1': number;
    'diesel2': number;
    'gasolina1': number;
    'gasolina2': number;
    'aceite1': number;
    'aceite2': number;

    //Vuelos
    'vuelo': string;
    'no_boleto': string;
    
    //Gastos de Materiales
    'gm_solicitud1': string;
    'gm_solicitud2': string;
    'vale1': string;
    'vale2': string;
    'descripcion1': string;
    'descripcion2': string;
    'precio1': number;
    'precio2': number;
    'cantidad1': number;
    'cantidad2': number;
    'costo_total1': number;
    'costo_total2': number;



}
