import { Component } from '@angular/core';
import { ServiceRequerimientoCasualService } from '../ServicesGenerales/service-requerimiento-casual.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-requuerimiento-casual',
  templateUrl: './requuerimiento-casual.component.html',
  styleUrls: ['./requuerimiento-casual.component.css'],
})
export class RequuerimientoCasualComponent {
  constructor(
    private vamosA: Router,
    private servicio: ServiceRequerimientoCasualService
  ) {}

  //////////////////////

  ngOnInit(): void {
    //Listar todos los registros
    this.servicio.getAll().subscribe((ResponseAll) => {
      this.RegistrosParaPaginar(ResponseAll);
    });
    //Listar Lugares para el Option
    this.servicio.listarLugares().subscribe((ResponseLugares) => {
      this.listaLugares = ResponseLugares;
    });
  }

  //////////////////////

  public insert() {
    if (this.revisaDatosCompletos()) {
      this.datos = {
        requerimiento: this.requerimiento,
        lugarFK: this.lugarFK,
        quien_informa: this.quien_informa,
        area_requerimiento: this.area_requerimiento,
        accion: this.accion,
        observacion: this.observacion,
        fecha_requerimiento: this.fecha_requerimiento,
      };
      console.log(this.datos);
      this.servicio.INSERT(this.datos).subscribe((ResponseInsert) => {
        if (ResponseInsert.Estado === 'true') {
          this.mensajeOk = 'Insertado';
          this.recargaComponente();
        } else {
          this.mensajeOk = 'Erro, Valida los datos';
        }
      });

      console.log(this.datos);
    } else {
      this.faltanDatos('Faltan Campos por llenar');
    }
  }

  //////////////

  public update() {
    if (this.id_requerimiento > 1) {
      this.datos = {
        id_requerimiento: this.id_requerimiento,
        requerimiento: this.requerimiento,
        lugarFK: this.lugarFK,
        quien_informa: this.quien_informa,
        area_requerimiento: this.area_requerimiento,
        accion: this.accion,
        observacion: this.observacion,
        fecha_requerimiento: this.fecha_requerimiento,
      };
      console.log(this.datos);
      this.servicio.UPDATE(this.datos).subscribe((ResponseUpdate) => {
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
    if (this.id_requerimiento <= 0) {
      this.faltanDatos('Seleccione un registro');
    } else {
      console.log(this.id_requerimiento); //Prueba
      this.servicio
        .DELETE(this.id_requerimiento)
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
    req: string,
    lug: number,
    quien: string,
    area: string,
    axx: string,
    obs: string,
    fecREQ: string
  ) {
    this.id_requerimiento = id;
    this.requerimiento = req;
    this.lugarFK = lug;
    this.quien_informa = quien;
    this.area_requerimiento = area;
    this.accion = axx;
    this.observacion = obs;
    this.fecha_requerimiento = fecREQ;
  }
  /*Para no recargar la pagina porque va encontra de la 'filosofia' de angular,
        Mejor espero 2sg y cargo a otro componente, inmediatamente despues, vuelvo al anterior, asi recargo el componente y no la pagina
        */
  public recargaComponente() {
    setTimeout(() => {
      this.vamosA.navigateByUrl('/movimientoIN');
      setTimeout(() => {
        this.vamosA.navigateByUrl('/ReqCasual');
      }, 1);
    }, 2000);
  }
  public vaciarInputs() {
    this.id_requerimiento = 0;
    this.requerimiento = '';
    this.lugarFK = 0;
    this.quien_informa = '';
    this.area_requerimiento = '';
    this.accion = '';
    this.observacion = '';
    this.fecha_requerimiento = '';
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
      this.requerimiento.length > 2 &&
      this.lugarFK > 0 &&
      this.accion.length > 2 &&
      this.fecha_requerimiento.length >= 10
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
    this.servicio
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

  public id_requerimiento: number = 0;
  public requerimiento: string = '';
  public lugarFK: number = 0;
  public quien_informa: string = '';
  public area_requerimiento: string = '';
  public accion: string = '';
  public observacion: string = '';
  public fecha_requerimiento: string = new Date()
    .toISOString()
    .substring(0, 10);

  public criterioFiltrar: any;

  public datos: any = {};

  public listaLugares: any[] = [];
}
