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

const Rutas: Routes = [
  { path: 'Activos', component: ActivosComponent },
  { path: 'movimientoIN', component: MovimientoInComponent },
  { path: 'movimientoOUT', component: MovimientoOUTComponent },
  { path: 'NovedadesDiarias', component: NovedadDiariaComponent },
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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
