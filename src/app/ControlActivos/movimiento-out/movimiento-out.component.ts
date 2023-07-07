import { Component, OnInit } from '@angular/core';
import { ServiceControlMovimientoOUTService } from '../Services/service-control-movimiento-out.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movimiento-out',
  templateUrl: './movimiento-out.component.html',
  styleUrls: ['./movimiento-out.component.css'],
})
export class MovimientoOUTComponent implements OnInit {
  constructor(
    private servicio: ServiceControlMovimientoOUTService,
    private vamosA: Router
  ) {}
  ngOnInit(): void {
    this.servicio.getAll().subscribe((ResponseAll) => {
      this.RegistrosParaPaginar(ResponseAll);
    });

    this.servicio.listarAutorizadores().subscribe((ResponsAt) => {
      this.listAutorizadores = ResponsAt;
    });

    this.servicio.listarGuardas().subscribe((ResponsG) => {
      this.listaGuardas = ResponsG;
    });

    this.servicio.listarActivos().subscribe((ResponsA) => {
      this.listActivos = ResponsA;
    });
  }

  /**Metodos que hacen Solicitudes HTTP */
  public getByCriterio(criterio: any) {
    return this.servicio
      .getByCriterio(criterio)
      .subscribe((ResponseCriterio) => {
        this.RegistrosParaPaginar(ResponseCriterio);
      });
  }
  public insert() {
    if (this.validarAntesInsertUpdate()) {
      this.DatosUdate_insert = {
        autorizadoPOR: this.autorizadoPOR,
        guardaTurno: this.guardaTurno,
        motivo: this.motivo,
        personaRetira: this.personaRetira,
        ccPersonaRetita: this.ccPersonaRetita,
        areaPersonaRetira: this.areaPersonaRetira,
        serialActivo: this.serialActivo,
        observacion: this.observacion,
      };
      this.servicio
        .insert(this.DatosUdate_insert)
        .subscribe((responseInsert) => {
          if (responseInsert.Estado === 'Insert True') {
            this.recargaComponente();
            this.mensajeOkFalse('Agregado', 'verde');
          } else {
          }
        });
    } else {
      this.mensajeOkFalse('Error Insert', 'rojo');
    }
  }
  public update() {
    if (this.validarAntesInsertUpdate()) {
      this.DatosUdate_insert = {
        id_movimiento: this.id_movimiento,
        autorizadoPOR: this.autorizadoPOR,
        guardaTurno: this.guardaTurno,
        motivo: this.motivo,
        personaRetira: this.personaRetira,
        ccPersonaRetita: this.ccPersonaRetita,
        areaPersonaRetira: this.areaPersonaRetira,
        serialActivo: this.serialActivo,
        observacion: this.observacion,
      };
      return this.servicio
        .update(this.DatosUdate_insert)
        .subscribe((ResponseUpdate) => {
          this.recargaComponente();
          this.mensajeOkFalse('Actualizado', 'verde');
        });
    } else {
      this.mensajeOkFalse('Error Update', 'rojo');
      return;
    }
  }

  /**Metodos sin peticiones */

  public mensajeOkFalse(mensaje: string, color: string) {
    setTimeout(() => {
      this.mensajeOk = mensaje;
      this.color = color;
      setTimeout(() => {
        this.mensajeOk = '';
      }, 1000);
    }, 0);
  }

  public selecionar(
    id: any,
    auto: number,
    guar: number,
    motivo: string,
    nomPer: string,
    cc: number,
    area: string,
    serial: number,
    obs: string
  ) {
    this.id_movimiento = id;
    this.autorizadoPOR = auto;
    this.guardaTurno = guar;
    this.motivo = motivo;
    this.personaRetira = nomPer;
    this.ccPersonaRetita = cc;
    this.areaPersonaRetira = area;
    this.serialActivo = serial;
    this.observacion = obs;
  }

  public validarAntesInsertUpdate() {
    if (
      this.id_movimiento <= 0 ||
      this.autorizadoPOR < 3 ||
      this.guardaTurno < 3 ||
      this.motivo.length <= 0 ||
      this.personaRetira.length < 2 ||
      this.ccPersonaRetita < 3 ||
      this.areaPersonaRetira.length < 3 ||
      this.serialActivo < 1 ||
      this.observacion.length < 5
    ) {
      return false;
    } else {
      return true;
    }
  }

  public recargaComponente() {
    setTimeout(() => {
      this.vamosA.navigateByUrl('/movimientoIN');
      setTimeout(() => {
        this.vamosA.navigateByUrl('/movimientoOUT');
      }, 1);
    }, 2000);
  }

  public vaciarInputs() {
    this.id_movimiento = 0;
    this.autorizadoPOR = 0;
    this.guardaTurno = 0;
    this.motivo = '';
    this.personaRetira = '';
    this.ccPersonaRetita = 0;
    this.areaPersonaRetira = '';
    this.serialActivo = 0;
    this.observacion = '';
  }
  /**Paginacion */

  registrosMostrados(): any[] {
    return this.registros.slice(this.inicioMostrar, this.registrosPorPagina);
  }

  RegistrosParaPaginar(response: any) {
    this.registros = response;
  }
  mostrarSiguientes() {
    const maxInicioMostrar = this.registros.length - this.registrosPorPagina;
    const maxRegistrosPorPagina = this.registros.length;

    if (
      this.inicioMostrar < maxInicioMostrar &&
      this.registrosPorPagina < maxRegistrosPorPagina
    ) {
      this.inicioMostrar += this.registrosPorPagina;
      this.registrosPorPagina += this.registrosPorPagina;
    }
  }
  mostrarAnterior() {
    const minInicioMostrar = 0;
    const minRegistrosPorPagina = 10;

    if (
      this.inicioMostrar > minInicioMostrar &&
      this.registrosPorPagina > minRegistrosPorPagina
    ) {
      this.inicioMostrar = this.inicioMostrar - 10;
      this.registrosPorPagina = this.registrosPorPagina - 10;
    }
  }

  public registros: any[] = [];
  public registrosPorPagina = 10;
  public inicioMostrar = 0;

  public disabled = false;
  public mensajeOk: string = '';
  public color: string = '';

  /*Soporte INPUT*/
  public id_movimiento: number;
  public autorizadoPOR: number;
  public guardaTurno: number;
  public motivo: string = '';
  public personaRetira: string = '';
  public ccPersonaRetita: number;
  public areaPersonaRetira: string = '';
  public serialActivo: number;
  public observacion: string = '';

  public DatosUdate_insert: any = {};

  /*Arrays para los desplegables*/
  public listAutorizadores: any[] = [];
  public listaGuardas: any[] = [];
  public listActivos: any[] = [];
}
