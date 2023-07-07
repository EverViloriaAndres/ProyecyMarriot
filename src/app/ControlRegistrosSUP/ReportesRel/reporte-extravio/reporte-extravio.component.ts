import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceReporteExtravioService } from '../../ServicesGenerales/service-reporte-extravio.service';

@Component({
  selector: 'app-reporte-extravio',
  templateUrl: './reporte-extravio.component.html',
  styleUrls: ['./reporte-extravio.component.css'],
})
export class ReporteExtravioComponent {
  constructor(
    private vamosA: Router,
    private servicioReporte: ServiceReporteExtravioService
  ) {}

  //////////////////////

  ngOnInit(): void {
    //Listar todos los registros
    this.servicioReporte.getAll().subscribe((ResponseAll) => {
      this.RegistrosParaPaginar(ResponseAll);
    });

    //Listar lugares en lista desplegable
    this.servicioReporte.listarLugar(1).subscribe((Responselugares) => {
      this.listaLugares = Responselugares;
    });

    //Listar victimas en lista desplegable
    this.servicioReporte.listarVictima(2).subscribe((ResponseVictima) => {
      this.listaLVictimas = ResponseVictima;
    });

    //Listar obj en lista desplegable
    this.servicioReporte.listarOBJ(3).subscribe((ResponseObj) => {
      this.listaObj = ResponseObj;
    });
  }

  //////////////////////

  public insert() {
    if (this.revisaDatosCompletos()) {
      this.datos = {
        idReporte: this.idReporte,
        objExtraviadoFK: this.objExtraviadoFK,
        lugarFK: this.lugarFK,
        victimaFK: this.victimaFK,
        quienReporta: this.quienReporta,
        fechaSuceso: this.fechaSuceso,
      };

      this.servicioReporte.INSERT(this.datos).subscribe((ResponseInsert) => {
        if (ResponseInsert.Estado === 'true') {
          this, (this.mensajeOk = 'Insertado');
          this.recargaComponente();
        }
      });
    }
    this.faltanDatos('No se puede insertar, faltan datos');
  }

  //////////////

  public update() {
    if (this.revisaDatosCompletos()) {
      this.datos = {
        idReporte: this.idReporte,
        objExtraviadoFK: this.objExtraviadoFK,
        lugarFK: this.lugarFK,
        victimaFK: this.victimaFK,
        quienReporta: this.quienReporta,
        fechaSuceso: this.fechaSuceso,
      };
      this.servicioReporte.UPDATE(this.datos).subscribe((ResponseUpdate) => {
        if (!(ResponseUpdate.Estado === 'true')) {
          this.mensajeOk = 'Error';
        }
        this.mensajeOk = 'Actualizado';
        this.recargaComponente();
      });
    }
    this.faltanDatos('No se puede actualizar, faltan datos');
  }

  //////////////

  /////////////////////
  select(
    id: number,
    obj: number,
    lug: number,
    vic: number,
    qui: string,
    fec: string
  ) {
    this.idReporte = id;
    this.objExtraviadoFK = obj;
    this.lugarFK = lug;
    this.victimaFK = vic;
    this.quienReporta = qui;
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
        this.vamosA.navigateByUrl('/ReporteExtravio');
      }, 1);
    }, 2000);
  }
  public vaciarInputs() {
    this.idReporte = 0;
    this.objExtraviadoFK = 0;
    this.lugarFK = 0;
    this.victimaFK = 0;
    this.quienReporta = '';
    this.fechaSuceso = '';
  }

  public revisaDatosCompletos() {
    if (this.validarAntesInsertUpdate()) {
      this.faltanDatos('Datos insuficientes');
      return false;
    }
    return true;
  }
  public validarAntesInsertUpdate() {
    if (
      this.idReporte === null ||
      this.idReporte === undefined ||
      this.objExtraviadoFK === null ||
      this.objExtraviadoFK === undefined ||
      this.lugarFK === null ||
      this.lugarFK === undefined ||
      this.victimaFK === null ||
      this.victimaFK === undefined ||
      this.quienReporta === null ||
      this.quienReporta === undefined ||
      this.fechaSuceso === null ||
      this.fechaSuceso === undefined
    ) {
      return true;
    } else if (
      this.idReporte < 0 ||
      this.objExtraviadoFK < 0 ||
      this.lugarFK < 0 ||
      this.victimaFK < 0 ||
      this.quienReporta.length < 3
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
    this.servicioReporte
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

  public idReporte: number = 0;
  public objExtraviadoFK: number;
  public lugarFK: number = 0;
  public victimaFK: number = 0;
  public quienReporta: string = '';
  public fechaSuceso: string = new Date().toISOString().substring(0, 10);

  public datos: any = {};
  public criterioFiltrar: any = '';

  public listaLugares: any[] = [];
  public listaLVictimas: any[] = [];
  public listaObj: any[] = [];
}
