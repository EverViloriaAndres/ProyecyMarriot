import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceEnfermeriaService } from '../ServicesGenerales/service-enfermeria.service';

@Component({
  selector: 'app-visitas-enfermeria',
  templateUrl: './visitas-enfermeria.component.html',
  styleUrls: ['./visitas-enfermeria.component.css'],
})
export class VisitasEnfermeriaComponent {
  constructor(
    private vamosA: Router,
    private servicioEnfermeria: ServiceEnfermeriaService
  ) {}

  //////////////////////

  ngOnInit(): void {
    //Listar todos los registros
    this.servicioEnfermeria.getAll().subscribe((ResponseAll) => {
      this.RegistrosParaPaginar(ResponseAll);
    });
    //Listar Lugares para el Option
    this.servicioEnfermeria.listarLugares().subscribe((ResponseLugares) => {
      this.listaLugares = ResponseLugares;
    });
  }

  //////////////////////

  public insert() {
    if (this.revisaDatosCompletos()) {
      this.datos = {
        nombre_paciente: this.nombre_paciente,
        apellido_paciente: this.apellido_paciente,
        area_paciente: this.area_paciente,
        motivo_visita: this.motivo_visita,
        lugarFK: this.lugarFK,
        accionar: this.accionar,
        fecha_visita: this.fecha_visita,
        observaciones: this.observaciones,
      };

      this.servicioEnfermeria.INSERT(this.datos).subscribe((ResponseInsert) => {
        if (ResponseInsert.Estado === 'true') {
          this.mensajeOk = 'Insertado';
          this.recargaComponente();
        } else {
          this.mensajeOk = 'Erro, Valida los datos';
        }
      });
    } else {
      this.faltanDatos('Faltan Campos por llenar');
    }
  }

  //////////////

  public update() {
    if (this.id_suceso > 1) {
      this.datos = {
        id_suceso: this.id_suceso,
        nombre_paciente: this.nombre_paciente,
        apellido_paciente: this.apellido_paciente,
        area_paciente: this.area_paciente,
        motivo_visita: this.motivo_visita,
        lugarFK: this.lugarFK,
        accionar: this.accionar,
        fecha_visita: this.fecha_visita,
        observaciones: this.observaciones,
      };
      console.log(this.datos);
      this.servicioEnfermeria.UPDATE(this.datos).subscribe((ResponseUpdate) => {
        if (!(ResponseUpdate.Estado === 'true')) {
          this.mensajeOk = 'Error';
        }
        this.mensajeOk = 'Actualizado';
        this.recargaComponente();
      });
    } else {
      this.faltanDatos('Seleccione un registro con el mause');
    }
  }

  //////////////

  public delete() {
    if (this.id_suceso <= 0) {
      this.faltanDatos('Seleccione un registro');
    } else {
      console.log(this.id_suceso); //Prueba
      this.servicioEnfermeria
        .DELETE(this.id_suceso)
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

  /////////////////////
  select(
    id: number,
    nom: string,
    ap: string,
    ar: string,
    mot: string,
    lug: number,
    acc: string,
    fec: string,
    obs: string
  ) {
    this.id_suceso = id;
    this.nombre_paciente = nom;
    this.apellido_paciente = ap;
    this.area_paciente = ar;
    this.motivo_visita = mot;
    this.lugarFK = lug;
    this.accionar = acc;
    this.fecha_visita = fec;
    this.observaciones = obs;
  }
  /*Para no recargar la pagina porque va encontra de la 'filosofia' de angular,
        Mejor espero 2sg y cargo a otro componente, inmediatamente despues, vuelvo al anterior, asi recargo el componente y no la pagina
        */
  public recargaComponente() {
    setTimeout(() => {
      this.vamosA.navigateByUrl('/movimientoIN');
      setTimeout(() => {
        this.vamosA.navigateByUrl('/VisitasEnfermeria');
      }, 1);
    }, 2000);
  }
  public vaciarInputs() {
    this.id_suceso = 0;
    this.nombre_paciente = '';
    this.apellido_paciente = '';
    this.area_paciente = '';
    this.motivo_visita = '';
    this.lugarFK = 0;
    this.accionar = '';
    this.fecha_visita = '';
    this.observaciones = '';
  }

  public revisaDatosCompletos() {
    if (this.validarAntesInsertUpdate()) {
      return true;
    } else {
      this.faltanDatos('Datos incompletos');
      return false;
    }
  }
  public validarAntesInsertUpdate() {
    if (
      this.nombre_paciente.length > 2 &&
      this.apellido_paciente.length > 2 &&
      this.area_paciente.length > 2 &&
      this.motivo_visita.length > 2 &&
      this.lugarFK > 0 &&
      this.fecha_visita.length >= 10 &&
      this.accionar.length > 3 &&
      this.observaciones.length > 3
    ) {
      //Proceder
      return true;
    } else {
      //Faltan datos
      return false;
    }
  }

  public faltanDatos(mensaje: any) {
    this.mensajeOk = mensaje;
    setTimeout(() => {
      this.mensajeOk = '';
    }, 1000);
  }

  public filtrar() {
    this.servicioEnfermeria
      .getByFiltro(this.criterioFiltrar)
      .subscribe((ResponseFiltro) => {
        if (ResponseFiltro !== null) {
          this.RegistrosParaPaginar(ResponseFiltro);
        } else {
          this.faltanDatos('Sin datos');
        }
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

  public id_suceso: number = 0;
  public nombre_paciente: string;
  public apellido_paciente: string;
  public area_paciente: string;
  public motivo_visita: string;
  public lugarFK: number;
  public accionar: string;
  public fecha_visita: string = new Date().toISOString().substring(0, 0);
  public observaciones: string;
  public criterioFiltrar: any;

  public datos: any = {};

  public listaLugares: any[] = [];
}
