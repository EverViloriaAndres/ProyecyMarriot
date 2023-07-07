import { Component, OnInit } from '@angular/core';

import { ServiceMovimientoINService } from '../Services/service-movimiento-in.service';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { emitDistinctChangesOnlyDefaultValue } from '@angular/compiler';

@Component({
  selector: 'app-movimiento-in',
  templateUrl: './movimiento-in.component.html',
  styleUrls: ['./movimiento-in.component.css'],
})
export class MovimientoInComponent implements OnInit {
  constructor(
    private servicio: ServiceMovimientoINService,
    private vamosA: Router
  ) {}
  /*al cargar el componente*/
  ngOnInit(): void {
    this.servicio.getAll().subscribe((ResponsIn) => {
      this.RegistrosParaPaginar(ResponsIn);
    });

    //Listas desplegables

    this.servicio.listarGuardas().subscribe((ResponsG) => {
      this.listaGuardas = ResponsG;
    });

    this.servicio.listarActivos().subscribe((ResponsA) => {
      this.listActivos = ResponsA;
    });
  }
  //get por criterio
  getByCriterio(criterio: any) {
    this.servicio.getByCriterio(criterio).subscribe((ResponsConCriterio) => {
      this.RegistrosParaPaginar(ResponsConCriterio);
    });
  }

  public insert() {
    if (this.validarAntesInsertUpdate()) {
      this.DatosUdate_insert = {
        id_movimiento: this.id_movimiento,
        guardaTurno: this.guardaTurno,
        personaDevuelve: this.personaDevuelve,
        ccPersonaDevuelve: this.ccPersonaDevuelve,
        serialActivo: this.serialActivo,
        observacion: this.observacion,
      };
      this.servicio
        .insert(this.DatosUdate_insert)
        .subscribe((insertResponse) => {
          this, this.sinDatos('Agregado');
          this.recargar();
          return insertResponse.Estado;
        });
    } else {
      this, this.sinDatos('Error al insertar, revise los datos');
    }
  }
  public update() {
    if (this.validarAntesInsertUpdate()) {
      this.DatosUdate_insert = {
        personaDevuelve: this.personaDevuelve,
        ccPersonaDevuelve: this.ccPersonaDevuelve,
        serialActivo: this.serialActivo,
        observacion: this.observacion,
        id_movimiento: this.id_movimiento,
      };
      this.servicio
        .update(this.DatosUdate_insert)
        .subscribe((ResponsUPDATE) => {
          this.sinDatos('Actualizado');
          this.recargar();
          return ResponsUPDATE.Estado;
        });
    } else {
      this.sinDatos('Error al actualizar, valide los datos');
    }
  }

  /**Metodos sin peticiones */

  public sinDatos(mensaje: string) {
    setTimeout(() => {
      this.mensajeOk = mensaje;

      setTimeout(() => {
        this.mensajeOk = '';
      }, 1000);
    }, 0);
  }

  public validarAntesInsertUpdate() {
    if (
      this.id_movimiento !== null &&
      this.id_movimiento > 0 &&
      this.guardaTurno !== null &&
      this.guardaTurno > 0 &&
      this.personaDevuelve.length !== null &&
      this.personaDevuelve.length > 5 &&
      this.ccPersonaDevuelve !== null &&
      this.ccPersonaDevuelve > 0 &&
      this.serialActivo !== null &&
      this.serialActivo > 0 &&
      this.observacion.length !== null &&
      this.observacion.length > 5
    ) {
      return true;
    } else {
      return false;
    }
  }

  vaciarInputs() {
    this.id_movimiento = 0;
    this.guardaTurno = 0;
    this.personaDevuelve = '';
    this.ccPersonaDevuelve = 0;
    this.serialActivo = 0;
    this.observacion = '';
    this.fechaIngreso = '';
  }

  selecionar(
    arg0: number,
    arg1: number,
    arg2: string,
    arg3: number,
    arg4: number,
    arg5: string,
    arg6: string
  ) {
    this.id_movimiento = arg0;
    this.guardaTurno = arg1;
    this.personaDevuelve = arg2;
    this.ccPersonaDevuelve = arg3;
    this.serialActivo = arg4;
    this.observacion = arg5;
    this.fechaIngreso = arg6;
  }

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

  public recargar() {
    setTimeout(() => {
      this.vamosA.navigateByUrl('/Activos');
      setTimeout(() => {
        this.vamosA.navigateByUrl('/movimientoIN');
      }, 1);
    }, 2000);
  }

  public registros: any[] = [];
  public registrosPorPagina = 10;
  public inicioMostrar = 0;

  public disabled = false;
  public mensajeOk: string = '';
  public color: string = '';

  /*Soporte INPUT*/
  public id_movimiento: number;
  public guardaTurno: number;
  public personaDevuelve: string;
  public ccPersonaDevuelve: number;
  public serialActivo: number;
  public observacion: string;
  public fechaIngreso: string;

  public DatosUdate_insert: any = {};

  /*Arrays para los desplegables*/

  public listaGuardas: any[] = [];
  public listActivos: any[] = [];
}
