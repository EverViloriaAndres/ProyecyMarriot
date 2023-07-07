import { Component } from '@angular/core';
import { InvestigacionHurtosServeceService } from '../../ServicesGenerales/investigacion-hurtos-servece.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-investigacion-hurtos',
  templateUrl: './investigacion-hurtos.component.html',
  styleUrls: ['./investigacion-hurtos.component.css'],
})
export class InvestigacionHurtosComponent {
  constructor(
    private vamosA: Router,
    private investigacion: InvestigacionHurtosServeceService
  ) {}

  //////////////////////

  ngOnInit(): void {
    //Listar todos los registros
    this.investigacion.getAll().subscribe((ResponseAll) => {
      this.RegistrosParaPaginar(ResponseAll);
    });

    //Listar lugares en lista desplegable
    this.investigacion.hurtos().subscribe((Responselugares) => {
      this.hurtos = Responselugares;
    });

    //Listar gerentes en lista desplegable
    this.investigacion.investigaciones().subscribe((ResponseVictima) => {
      this.investigaciones = ResponseVictima;
    });

    //Listar obj en lista desplegable
  }

  //////////////////////

  public insert() {
    if (this.revisaDatosCompletos()) {
      //*****************************

      //*****************************
      this.datos = {
        id: this.idReporte,
        reporteHurto_FK: this.reporteHurto_FK,
        investigacion_FK: this.investigacion_FK,
      };
      this.investigacion.INSERT(this.datos).subscribe((ResponseInsert) => {
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
      if (this.idReporte <= 0) {
        this.faltanDatos(
          'Id de investigacion no es valido, seleccione un registro'
        );
      } else {
        this.datos = {
          id: this.idReporte,
          reporteHurto_FK: this.reporteHurto_FK,
          investigacion_FK: this.investigacion_FK,
        };

        console.log(this.datos);
        this.investigacion.UPDATE(this.datos).subscribe((ResponseUpdate) => {
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

  //////////////

  /////////////////////
  select(
    idReporte: number,
    reporteHurto_FK: number,
    investigacion_FK: number
  ): void {
    this.idReporte = idReporte;
    this.reporteHurto_FK = reporteHurto_FK;
    this.investigacion_FK = investigacion_FK;
  }

  /*Para no recargar la pagina porque va encontra de la 'filosofia' de angular,
        Mejor espero 2sg y cargo a otro componente, inmediatamente despues, vuelvo al anterior, asi recargo el componente y no la pagina
        */
  public recargaComponente() {
    setTimeout(() => {
      this.vamosA.navigateByUrl('/movimientoIN');
      setTimeout(() => {
        this.vamosA.navigateByUrl('/investigaciones_hurtos');
      }, 1);
    }, 2000);
  }
  public vaciarInputs() {
    this.idReporte = 0;
    this.reporteHurto_FK = 0;
    this.investigacion_FK = 0;
  }

  public revisaDatosCompletos() {
    if (!this.validarAntesInsertUpdate()) {
      this.faltanDatos('Datos insuficientes');
      return false;
    }
    return true;
  }
  public validarAntesInsertUpdate() {
    if (this.reporteHurto_FK > 0 && this.investigacion_FK > 0) {
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
    this.investigacion
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

  public idReporte: any = 0;
  public reporteHurto_FK: number = 0;
  public investigacion_FK: number = 0;

  public datos: any = {};
  public criterioFiltrar: any = '';

  public hurtos: any[] = [];
  public investigaciones: any[] = [];
}
