import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MovimientoInComponent } from './ControlActivos/movimiento-in/movimiento-in.component';
import { MovimientoOUTComponent } from './ControlActivos/movimiento-out/movimiento-out.component';
import { RouterModule, Routes } from '@angular/router';
import { ActivosComponent } from './ControlActivos/activos/activos.component';
import { SerivceControlActivosService } from './ControlActivos/Services/serivce-control-activos.service';
import { FormsModule } from '@angular/forms';
import { NovedadDiariaComponent } from './ControlRegistrosSUP/novedad-diaria/novedad-diaria.component';

import { ReporteExtravioComponent } from './ControlRegistrosSUP/ReportesRel/reporte-extravio/reporte-extravio.component';
import { ReporteHurtosComponent } from './ControlRegistrosSUP/ReportesRel/reporte-hurtos/reporte-hurtos.component';
import { InvestigacionesComponent } from './ControlRegistrosSUP/ReportesRel/investigaciones/investigaciones.component';
import { ObjEntregadosComponent } from './ControlRegistrosSUP/ReportesRel/obj-entregados/obj-entregados.component';
import { VictimaComponent } from './ControlRegistrosSUP/ReportesRel/victima/victima.component';
import { ServiceNovedadDiariaService } from './ControlRegistrosSUP/ServicesGenerales/service-novedad-diaria.service';
import { ObjComponent } from './ControlRegistrosSUP/ReportesRel/obj/obj.component';
import { ServiceOBJService } from './ControlRegistrosSUP/ServicesGenerales/service-obj.service';
import { ServiceVictimaService } from './ControlRegistrosSUP/ServicesGenerales/service-victima.service';
import { ServiceEntregadoOBJService } from './ControlRegistrosSUP/ServicesGenerales/service-entregado-obj.service';
import { ServiceReporteExtravioService } from './ControlRegistrosSUP/ServicesGenerales/service-reporte-extravio.service';
import { ServiceHurtoService } from './ControlRegistrosSUP/ServicesGenerales/service-hurto.service';
import { InvestigacionHurtosComponent } from './ControlRegistrosSUP/ReportesRel/investigacion-hurtos/investigacion-hurtos.component';
import { VisitasEnfermeriaComponent } from './ControlRegistrosSUP/visitas-enfermeria/visitas-enfermeria.component';
import { VisitasEspecialesComponent } from './ControlRegistrosSUP/visitas-especiales/visitas-especiales.component';
import { RequuerimientoCasualComponent } from './ControlRegistrosSUP/requuerimiento-casual/requuerimiento-casual.component';
import { ServiceVisitaEspecialService } from './ControlRegistrosSUP/ServicesGenerales/service-visita-especial.service';
import { ServiceRequerimientoCasualService } from './ControlRegistrosSUP/ServicesGenerales/service-requerimiento-casual.service';
import { ReportArqueoComponent } from './ControlRegistrosSUP/report-arqueo/report-arqueo.component';
import { CapacitacionesComponent } from './ControlRegistrosSUP/capacitaciones./capacitaciones..component';
import { ServiceArqueoService } from './ControlRegistrosSUP/ServicesGenerales/service-arqueo.service';
import { ServiceCapacitacionService } from './ControlRegistrosSUP/ServicesGenerales/service-capacitacion.service';

import { DaniosComponent } from './ControlRegistrosSUP/danios/danios.component';

import { EventoComponent } from './ControlRegistrosSUP/Eventos/evento/evento.component';
import { CotizacionGuardaAdicionalEvtComponent } from './ControlRegistrosSUP/Eventos/cotizacion-guarda-adicional-evt/cotizacion-guarda-adicional-evt.component';
import { CorrespondenciaComponent } from './ControlRegistrosSUP/Correspondenia/correspondencia/correspondencia.component';
import { CorrespondenciaEntregadaComponent } from './ControlRegistrosSUP/Correspondenia/correspondencia-entregada/correspondencia-entregada.component';
import { EventoServiceService } from './ControlRegistrosSUP/ServicesGenerales/evento-service.service';
import { CotizacionGuardaEvtServiceService } from './ControlRegistrosSUP/ServicesGenerales/cotizacion-guarda-evt-service.service';
import { TabajadorSexualComponent } from './ControlRegistrosSUP/Sexual/tabajador-sexual/tabajador-sexual.component';
import { SexualEventComponent } from './ControlRegistrosSUP/Sexual/sexual-event/sexual-event.component';
import { TrabajadorSexualANDSexualEventComponent } from './ControlRegistrosSUP/Sexual/trabajador-sexual-andsexual-event/trabajador-sexual-andsexual-event.component';
import { CorrespondenciaEntregadaServiceService } from './ControlRegistrosSUP/ServicesGenerales/correspondencia-entregada-service.service';
import { CorrespondenciaService } from './ControlRegistrosSUP/ServicesGenerales/correspondencia.service';
import { TrabajadorSexualServiceService } from './ControlRegistrosSUP/ServicesGenerales/trabajador-sexual-service.service';
import { SexualEventServiceService } from './ControlRegistrosSUP/ServicesGenerales/sexual-event-service.service';
import { TestScheduler } from 'rxjs/testing';
import { TsexualANDsexualEventserviceService } from './ControlRegistrosSUP/ServicesGenerales/tsexual-andsexual-eventservice.service';

const Rutas: Routes = [
  { path: 'Activos', component: ActivosComponent },
  { path: 'movimientoIN', component: MovimientoInComponent },
  { path: 'movimientoOUT', component: MovimientoOUTComponent },
  { path: 'NovedadesDiarias', component: NovedadDiariaComponent },
  { path: 'Danios', component: DaniosComponent },
  { path: 'Objetos', component: ObjComponent },
  { path: 'Victima', component: VictimaComponent },
  { path: 'Entregado', component: ObjEntregadosComponent },
  { path: 'ReporteExtravio', component: ReporteExtravioComponent },
  { path: 'ReporteHurtos', component: ReporteHurtosComponent },
  { path: 'Investigaciones', component: InvestigacionesComponent },
  { path: 'investigaciones_hurtos', component: InvestigacionHurtosComponent },
  { path: 'VisitasEnfermeria', component: VisitasEnfermeriaComponent },
  { path: 'VisitaEspecial', component: VisitasEspecialesComponent },
  { path: 'ReqCasual', component: RequuerimientoCasualComponent },
  { path: 'arqueo', component: ReportArqueoComponent },
  { path: 'Capacitaciones', component: CapacitacionesComponent },

  { path: 'TrabajadorSexual', component: TabajadorSexualComponent },
  { path: 'ServicioSexual', component: SexualEventComponent },
  {
    path: 'TrabajadorANDServicioSexual',
    component: TrabajadorSexualANDSexualEventComponent,
  },

  { path: 'Correspondencia', component: CorrespondenciaComponent },
  { path: 'CorrespEntregada', component: CorrespondenciaEntregadaComponent },

  { path: 'Evento', component: EventoComponent },
  {
    path: 'CotizacionGuarda',
    component: CotizacionGuardaAdicionalEvtComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    MovimientoInComponent,
    MovimientoOUTComponent,
    ActivosComponent,
    NovedadDiariaComponent,
    ReporteExtravioComponent,
    ReporteHurtosComponent,
    InvestigacionesComponent,
    ObjEntregadosComponent,
    VictimaComponent,
    ObjComponent,
    InvestigacionHurtosComponent,
    VisitasEnfermeriaComponent,
    VisitasEspecialesComponent,
    RequuerimientoCasualComponent,
    ReportArqueoComponent,
    CapacitacionesComponent,

    DaniosComponent,

    EventoComponent,
    CotizacionGuardaAdicionalEvtComponent,
    CorrespondenciaComponent,
    CorrespondenciaEntregadaComponent,
    TabajadorSexualComponent,
    SexualEventComponent,
    TrabajadorSexualANDSexualEventComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,

    RouterModule.forRoot(Rutas),
  ],
  providers: [
    SerivceControlActivosService,
    ServiceNovedadDiariaService,
    ServiceOBJService,
    ServiceVictimaService,
    ServiceEntregadoOBJService,
    ServiceReporteExtravioService,
    ServiceHurtoService,
    ServiceVisitaEspecialService,
    ServiceRequerimientoCasualService,
    ServiceArqueoService,
    ServiceCapacitacionService,
    EventoServiceService,
    CotizacionGuardaEvtServiceService,
    CorrespondenciaService,
    CorrespondenciaEntregadaServiceService,
    TrabajadorSexualServiceService,
    SexualEventServiceService,
    TsexualANDsexualEventserviceService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
