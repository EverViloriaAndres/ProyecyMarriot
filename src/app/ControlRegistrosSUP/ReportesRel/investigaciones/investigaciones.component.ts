import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceInvestigacionService } from '../../ServicesGenerales/service-investigacion.service';
import { I18NHtmlParser } from '@angular/compiler';

@Component({
  selector: 'app-investigaciones',
  templateUrl: './investigaciones.component.html',
  styleUrls: ['./investigaciones.component.css'],
})
export class InvestigacionesComponent {
  constructor(
    private vamosA: Router,
    private investigacion: ServiceInvestigacionService
  ) {}

  //////////////////////

  ngOnInit(): void {
    //Listar todos los registros
    this.investigacion.getAll().subscribe((ResponseAll) => {
      this.RegistrosParaPaginar(ResponseAll);
    });

    //Listar lugares en lista desplegable
    this.investigacion.lugares().subscribe((Responselugares) => {
      this.lugares = Responselugares;
    });

    //Listar gerentes en lista desplegable
    this.investigacion.gerentes().subscribe((ResponseVictima) => {
      this.gerentes = ResponseVictima;
    });

    //Listar obj en lista desplegable
  }

  //////////////////////

  public insert() {
    if (this.revisaDatosCompletos()) {
      //*****************************
      if (this.fin.length <= 0) {
        this.fin = null;
      }
      //*****************************
      this.datos = {
        id: this.idInvestigacion,
        motivo: this.motivo,
        quienSolicita: this.quienSolicita,
        quienAutoriza_FK: this.quienAutoriza_FK,
        lugarFK: this.lugarFK,
        investigadoPor: this.investigadoPor,
        inicio: this.inicio,
        fin: this.fin,
        finalizada: this.finalizada,
        aprehension: this.aprehension,
        observaciones_resultado: this.observaciones_resultado,
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
      if (this.idInvestigacion <= 0) {
        this.faltanDatos(
          'Id de investigacion no es valido, seleccione un registro'
        );
      } else {
        this.datos = {
          id: this.idInvestigacion,
          motivo: this.motivo,
          quienSolicita: this.quienSolicita,
          quienAutoriza_FK: this.quienAutoriza_FK,
          lugarFK: this.lugarFK,
          investigadoPor: this.investigadoPor,
          inicio: this.inicio,
          fin: this.fin,
          finalizada: this.finalizada,
          aprehension: this.aprehension,
          observaciones_resultado: this.observaciones_resultado,
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
    idInvestigacion: number,
    motivo: string,
    quienSolicita: string,
    quienAutoriza_FK: number,
    lugarFK: number,
    investigadoPor: string,
    inicio: string,
    fin: string,
    finalizada: string,
    aprehension: string,
    observaciones_resultado: string
  ): void {
    this.idInvestigacion = idInvestigacion;
    this.motivo = motivo;
    this.quienSolicita = quienSolicita;
    this.quienAutoriza_FK = quienAutoriza_FK;
    this.lugarFK = lugarFK;
    this.investigadoPor = investigadoPor;
    this.inicio = inicio;
    this.fin = fin;
    this.finalizada = finalizada;
    this.aprehension = aprehension;
    this.observaciones_resultado = observaciones_resultado;
  }

  /*Para no recargar la pagina porque va encontra de la 'filosofia' de angular,
        Mejor espero 2sg y cargo a otro componente, inmediatamente despues, vuelvo al anterior, asi recargo el componente y no la pagina
        */
  public recargaComponente() {
    setTimeout(() => {
      this.vamosA.navigateByUrl('/movimientoIN');
      setTimeout(() => {
        this.vamosA.navigateByUrl('/Investigaciones');
      }, 1);
    }, 2000);
  }
  public vaciarInputs() {
    this.idInvestigacion = 0;
    this.motivo = '';
    this.quienSolicita = '';
    this.quienAutoriza_FK = 0;
    this.lugarFK = 0;
    this.investigadoPor = '';
    this.inicio = new Date().toISOString().substring(0, 0);
    this.fin = new Date().toISOString().substring(0, 0);
    this.finalizada = '';
    this.aprehension = '';
    this.observaciones_resultado = '';
  }

  public revisaDatosCompletos() {
    if (!this.validarAntesInsertUpdate()) {
      this.faltanDatos('Datos insuficientes');
      return false;
    }
    return true;
  }
  public validarAntesInsertUpdate() {
    if (
      this.motivo.length > 4 &&
      this.quienSolicita.length > 5 &&
      this.quienAutoriza_FK > 0 &&
      this.lugarFK > 0 &&
      this.investigadoPor.length > 3 &&
      this.inicio.length >= 10 &&
      this.finalizada.length == 2 &&
      this.aprehension.length == 2 &&
      this.observaciones_resultado.length >= 5
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

  public idInvestigacion: number = 0;
  public motivo: string = '';
  public quienSolicita: string = '';
  public quienAutoriza_FK: number = 0;
  public lugarFK: number = 0;
  public investigadoPor: string = '';
  public inicio: string = new Date().toISOString().substring(0, 0);
  public fin: any = new Date().toISOString().substring(0, 0);
  public finalizada: string = '';
  public aprehension: string = '';
  public observaciones_resultado: string = '';

  public datos: any = {};
  public criterioFiltrar: any = '';

  public lugares: any[] = [];
  public gerentes: any[] = [];
}
