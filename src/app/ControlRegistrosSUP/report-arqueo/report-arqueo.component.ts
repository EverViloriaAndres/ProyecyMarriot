import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceArqueoService } from '../ServicesGenerales/service-arqueo.service';

@Component({
  selector: 'app-report-arqueo',
  templateUrl: './report-arqueo.component.html',
  styleUrls: ['./report-arqueo.component.css'],
})
export class ReportArqueoComponent {
  constructor(private vamosA: Router, private arqueo: ServiceArqueoService) {}

  //////////////////////

  ngOnInit(): void {
    //Listar todos los registros
    this.arqueo.getAll().subscribe((ResponseAll) => {
      this.RegistrosParaPaginar(ResponseAll);
    });

    //Listar lugares en lista desplegable
    this.arqueo.lugares().subscribe((Responselugares) => {
      this.lugares = Responselugares;
    });

    //Listar gerentes en lista desplegable
    this.arqueo.guarda().subscribe((ResponseVictima) => {
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
        id_registro: this.id_registro,
        fecha_arqueo: this.fecha_arqueo,
        lugarFK: this.lugarFK,
        guardaFK: this.guardaFK,
        num_M: this.num_M,
        num_C: this.num_C,
        num_B: this.num_B,
        total: this.total,
        observacion: this.observacion,
      };
      console.log(this.datos);
      this.arqueo.INSERT(this.datos).subscribe((ResponseInsert) => {
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
      if (this.id_registro <= 0) {
        this.faltanDatos(
          'Id de investigacion no es valido, seleccione un registro'
        );
      } else {
        this.datos = {
          id_registro: this.id_registro,
          fecha_arqueo: this.fecha_arqueo,
          lugarFK: this.lugarFK,
          guardaFK: this.guardaFK,
          num_M: this.num_M,
          num_C: this.num_C,
          num_B: this.num_B,
          total: this.total,
          observacion: this.observacion,
        };

        console.log(this.datos);
        this.arqueo.UPDATE(this.datos).subscribe((ResponseUpdate) => {
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
    id_registro: number,
    fecha_arqueo: string,
    lugarFK: number,
    guardaFK: number,
    num_M: number,
    num_C: number,
    num_B: number,
    total: number,
    observacion: string
  ): void {
    this.id_registro = id_registro;
    this.fecha_arqueo = fecha_arqueo;
    this.lugarFK = lugarFK;
    this.guardaFK = guardaFK;
    this.num_M = num_M;
    this.num_C = num_C;
    this.num_B = num_B;
    this.total = total;
    this.observacion = observacion;
  }

  /*Para no recargar la pagina porque va encontra de la 'filosofia' de angular,
        Mejor espero 2sg y cargo a otro componente, inmediatamente despues, vuelvo al anterior, asi recargo el componente y no la pagina
        */
  public recargaComponente() {
    setTimeout(() => {
      this.vamosA.navigateByUrl('/movimientoIN');
      setTimeout(() => {
        this.vamosA.navigateByUrl('/arqueo');
      }, 1);
    }, 2000);
  }
  public vaciarInputs() {
    this.id_registro = 0;
    this.fecha_arqueo = '';
    this.lugarFK = 0;
    this.guardaFK = 0;
    this.num_M = 0;
    this.num_C = 0;
    this.num_B = 0;
    this.total = 0;
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
      this.fecha_arqueo.length >= 10 &&
      this.lugarFK > 0 &&
      this.guardaFK > 0 &&
      this.num_M >= 0 &&
      this.num_C >= 0 &&
      this.num_B >= 0 &&
      this.observacion.length > 0
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
    this.arqueo.getByCriterio(this.criterioFiltrar).subscribe((ResponseAll) => {
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

  public id_registro: number = 0;
  public fecha_arqueo: string = new Date().toISOString().substring(0, 0);
  public lugarFK: number = 0;
  public guardaFK: number = 0;
  public num_M: number = 0;
  public num_C: number = 0;
  public num_B: number = 0;
  public total: number = 0;
  public observacion: string = '';

  public datos: any = {};
  public criterioFiltrar: any = '';

  public lugares: any[] = [];
  public gerentes: any[] = [];
}
