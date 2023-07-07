import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceCapacitacionService } from '../ServicesGenerales/service-capacitacion.service';

@Component({
  selector: 'app-capacitaciones.',
  templateUrl: './capacitaciones..component.html',
  styleUrls: ['./capacitaciones..component.css'],
})
export class CapacitacionesComponent {
  constructor(
    private vamosA: Router,
    private capacitaciono: ServiceCapacitacionService
  ) {}

  //////////////////////

  ngOnInit(): void {
    //Listar todos los registros
    this.capacitaciono.getAll().subscribe((ResponseAll) => {
      this.RegistrosParaPaginar(ResponseAll);
    });

    //Listar lugares en lista desplegable
    this.capacitaciono.lugares().subscribe((Responselugares) => {
      this.lugares = Responselugares;
    });

    //Listar gerentes en lista desplegable
    this.capacitaciono.guarda().subscribe((ResponseVictima) => {
      this.gerentes = ResponseVictima;
    });

    //Listar obj en lista desplegable
  }

  //////////////////////

  public insert() {
    if (this.revisaDatosCompletos()) {
      //*****************************

      //*****************************
      this.datos = {
        cc_persona_tutor_Fk: this.cc_persona_tutor_Fk,
        tema_capacitacion: this.tema_capacitacion,
        fecha_capacitacion: this.fecha_capacitacion,
        numero_horas: this.numero_horas,
        modalidad: this.modalidad,
        lugarFK: this.lugarFK,
        observacion: this.observacion,
      };
      console.log(this.datos);
      this.capacitaciono.INSERT(this.datos).subscribe((ResponseInsert) => {
        if (ResponseInsert.Estado == 'Insert True') {
          this.mensajeOk = 'Se agrego, espera...';
          this.recargaComponente();
        }
      });
    } else {
      this.faltanDatos('No se puede insertar, faltan datos');
    }
    console.log(this.datos);
  }

  //////////////

  public update() {
    if (this.revisaDatosCompletos()) {
      //**********
      //**********
      if (this.id_capacitacion <= 0) {
        this.faltanDatos(
          'Id de investigacion no es valido, seleccione un registro'
        );
      } else {
        this.datos = {
          id_capacitacion: this.id_capacitacion,
          cc_persona_tutor_Fk: this.cc_persona_tutor_Fk,
          tema_capacitacion: this.tema_capacitacion,
          fecha_capacitacion: this.fecha_capacitacion,
          numero_horas: this.numero_horas,
          modalidad: this.modalidad,
          lugarFK: this.lugarFK,
          observacion: this.observacion,
        };

        console.log(this.datos);
        this.capacitaciono.UPDATE(this.datos).subscribe((ResponseUpdate) => {
          if (!(ResponseUpdate.Estado === 'true')) {
            this.mensajeOk = 'Error';
          }
          this.mensajeOk = 'Actualizado';
          this.recargaComponente();
        });
      }
      //**********
      //************
    } else {
      this.faltanDatos('No se puede actualizar, faltan datos');
    }
  }
  public delete() {
    if (this.id_capacitacion <= 0) {
      this.faltanDatos('Seleccione un registro');
    } else {
      console.log(this.id_capacitacion); //Prueba
      this.capacitaciono
        .DELETE(this.id_capacitacion)
        .subscribe((ResponseDelete) => {
          if (ResponseDelete.Estado == 'true') {
            this.mensajeOk = 'Eliminado';
            this.recargaComponente();
          } else if (ResponseDelete.Estado == 'false') {
            this.mensajeOk = 'No se puedo eliminar';
          } else {
            this.mensajeOk = 'No llego el criterio';
          }
        });
    }
  }

  //////////////

  /////////////////////
  select(
    id_capacitacion: number,
    cc_persona_tutor_Fk: number,
    tema_capacitacion: string,
    fecha_capacitacion: string,
    numero_horas: number,
    modalidad: string,
    lugarFK: number,
    observacion: string
  ): void {
    this.id_capacitacion = id_capacitacion;
    this.cc_persona_tutor_Fk = cc_persona_tutor_Fk;
    this.tema_capacitacion = tema_capacitacion;
    this.fecha_capacitacion = fecha_capacitacion;
    this.numero_horas = numero_horas;
    this.modalidad = modalidad;
    this.lugarFK = lugarFK;
    this.observacion = observacion;
  }

  /*Para no recargar la pagina porque va encontra de la 'filosofia' de angular,
        Mejor espero 2sg y cargo a otro componente, inmediatamente despues, vuelvo al anterior, asi recargo el componente y no la pagina
        */
  public recargaComponente() {
    setTimeout(() => {
      this.vamosA.navigateByUrl('/movimientoIN');
      setTimeout(() => {
        this.vamosA.navigateByUrl('/Capacitaciones');
      }, 1);
    }, 2000);
  }
  public vaciarInputs() {
    this.id_capacitacion = 0;
    this.cc_persona_tutor_Fk = 0;
    this.tema_capacitacion = '';
    this.fecha_capacitacion = '';
    this.numero_horas = 0;
    this.modalidad = '';
    this.lugarFK = 0;
    this.observacion = '';
  }

  public revisaDatosCompletos() {
    if (this.validarAntesInsertUpdate()) {
      return true;
    } else {
      this.faltanDatos('Datos insuficientes');
      return false;
    }
  }
  public validarAntesInsertUpdate() {
    if (
      this.cc_persona_tutor_Fk > 0 &&
      this.tema_capacitacion.length > 1 &&
      this.fecha_capacitacion.length >= 10 &&
      this.numero_horas > 0 &&
      this.lugarFK > 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  public faltanDatos(mensaje: string) {
    this.mensajeOk = mensaje;
    setTimeout(() => {
      this.mensajeOk = '';
    }, 1000);
  }

  public funcionFiltrar() {
    //Listar registros en base a un criterio
    this.capacitaciono
      .getByCriterio(this.criterioFiltrar)
      .subscribe((ResponseAll) => {
        this.RegistrosParaPaginar(ResponseAll);
      });
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

  public id_capacitacion: number = 0;
  public cc_persona_tutor_Fk: number = 0;
  public tema_capacitacion: string = '';
  public fecha_capacitacion: string = new Date().toISOString().substring(0, 10);
  public numero_horas: number = 0;
  public modalidad: string = '';
  public lugarFK: number = 0;
  public observacion: string = '';

  public datos: any = {};
  public criterioFiltrar: any = '';

  public lugares: any[] = [];
  public gerentes: any[] = [];
}
