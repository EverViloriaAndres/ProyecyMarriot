import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceNovedadDiariaService } from '../ServicesGenerales/service-novedad-diaria.service';

@Component({
  selector: 'app-novedad-diaria',
  templateUrl: './novedad-diaria.component.html',
  styleUrls: ['./novedad-diaria.component.css'],
})
export class NovedadDiariaComponent implements OnInit {
  ////////////////////

  constructor(
    private vamosA: Router,
    private servicioNovedad: ServiceNovedadDiariaService
  ) {}

  //////////////////////

  ngOnInit(): void {
    //Listar Lugares para el Option
    this.servicioNovedad.listarLugares().subscribe((ResponseLugares) => {
      this.listaLugares = ResponseLugares;
    });
    //Listar todos los registros
    this.servicioNovedad.getAll().subscribe((ResponseAll) => {
      this.RegistrosParaPaginar(ResponseAll);
    });
  }

  //////////////////////

  public insert() {
    if (this.revisaDatosCompletos()) {
      this.datos = {
        novedad: this.novedad,
        lugarFK: this.lugar,
        accionar: this.accionar,
        observaciones: this.observaciones,
        fechaSuceso: this.fechaSuceso,
      };

      this.servicioNovedad.INSERT(this.datos).subscribe((ResponseInsert) => {
        if (ResponseInsert.Estado === 'true') {
          this, (this.mensajeOk = 'Insertado');
          this.recargaComponente();
        }
      });
    }
    this.faltanDatos();
  }

  //////////////

  public update() {
    if (this.revisaDatosCompletos()) {
      this.datos = {
        id: this.id,
        novedad: this.novedad,
        lugarFK: this.lugar,
        accionar: this.accionar,
        observaciones: this.observaciones,
        fechaSuceso: this.fechaSuceso,
      };
      this.servicioNovedad.UPDATE(this.datos).subscribe((ResponseUpdate) => {
        if (!(ResponseUpdate.Estado === 'true')) {
          this.mensajeOk = 'Error';
        }
        this.mensajeOk = 'Actualizado';
        this.recargaComponente();
      });
    }
    this.faltanDatos();
  }

  //////////////

  public delete() {
    if (this.id <= 0) {
      this.mensajeOk = 'El campo id NO es valido, seleccione un registro';
      setTimeout(() => {
        this.mensajeOk = '';
      }, 1000);
    } else {
      this.servicioNovedad.DELETE(this.id).subscribe((ResponseDelete) => {
        if (!(ResponseDelete.Estado == 'true')) {
          this.mensajeOk = 'No se puedo eliminar';
        }
        this.mensajeOk = 'Eliminado';
        this.recargaComponente();
      });
    }
  }

  /////////////////////
  select(
    id: number,
    nov: string,
    lug: number,
    acc: string,
    obs: string,
    fec: string
  ) {
    this.id = id;
    this.novedad = nov;
    this.accionar = acc;
    this.lugar = lug;
    this.accionar = acc;
    this.observaciones = obs;
    this.fechaSuceso = fec;
    this.disabled = true;
  }
  /*Para no recargar la pagina porque va encontra de la 'filosofia' de angular,
        Mejor espero 2sg y cargo a otro componente, inmediatamente despues, vuelvo al anterior, asi recargo el componente y no la pagina
        */
  public recargaComponente() {
    setTimeout(() => {
      this.vamosA.navigateByUrl('/movimientoIN');
      setTimeout(() => {
        this.vamosA.navigateByUrl('/NovedadesDiarias');
      }, 1);
    }, 2000);
  }
  public vaciarInputs() {
    this.id = 0;
    this.novedad = '';
    this.lugar = 0;
    this.accionar = '';
    this.observaciones = '';
    this.fechaSuceso = '';
  }

  public revisaDatosCompletos() {
    if (this.validarAntesInsertUpdate()) {
      this.faltanDatos();
      return false;
    }
    return true;
  }
  public validarAntesInsertUpdate() {
    if (
      this.id === null ||
      this.id === undefined ||
      this.novedad === null ||
      this.novedad === undefined ||
      this.lugar === null ||
      this.lugar === undefined ||
      this.accionar === null ||
      this.accionar === undefined ||
      this.observaciones === null ||
      this.observaciones === undefined ||
      this.fechaSuceso === null ||
      this.fechaSuceso === undefined
    ) {
      return true;
    } else if (
      this.id < 0 ||
      this.novedad.length < 3 ||
      this.lugar < 1 ||
      this.accionar.length < 1 ||
      this.observaciones.length < 1 ||
      this.fechaSuceso.length < 10
    ) {
      return true;
    } else {
      return false;
    }
  }

  public faltanDatos() {
    this.mensajeOk = 'Datos insuficientes';
    setTimeout(() => {
      this.mensajeOk = '';
    }, 1000);
  }

  public funcionFiltrar() {
    //Listar registros en base a un criterio
    this.servicioNovedad
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

  public id: number = 0;
  public novedad: string;
  public lugar: number;
  public accionar: string;
  public observaciones: string;
  public fechaSuceso: string;
  public criterioFiltrar: any;

  public datos: any = {};

  public listaLugares: any[] = [];
}
