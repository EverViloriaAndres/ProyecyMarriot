import { Component } from '@angular/core';
import { ServicesDaniosService } from '../ServicesGenerales/services-danios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-danios',
  templateUrl: './danios.component.html',
  styleUrls: ['./danios.component.css'],
})
export class DaniosComponent {
  constructor(private vamosA: Router, private Daño: ServicesDaniosService) {}

  //////////////////////

  ngOnInit(): void {
    //Listar todos los registros
    this.Daño.getAll().subscribe((ResponseAll) => {
      this.RegistrosParaPaginar(ResponseAll);
    });

    //Listar lugares en lista desplegable
    this.Daño.lugares().subscribe((Responselugares) => {
      this.lugares = Responselugares;
    });
  }

  //////////////////////

  public insert() {
    if (this.revisaDatosCompletos()) {
      //*****************************

      //*****************************
      this.datos = {
        id_danio: this.id_danio,
        lugarFK: this.lugarFK,
        nomObjAfectado: this.nomObjAfectado,
        causa: this.causa,
        estado: this.estado,
        informante: this.informante,
        fechaSuceso: this.fechaSuceso,
        observacion: this.observacion,
      };
      console.log(this.datos);
      this.Daño.INSERT(this.datos).subscribe((ResponseInsert) => {
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
      if (this.id_danio <= 0) {
        this.faltanDatos(
          'Id de investigacion no es valido, seleccione un registro'
        );
      } else {
        this.datos = {
          id_danio: this.id_danio,
          lugarFK: this.lugarFK,
          nomObjAfectado: this.nomObjAfectado,
          causa: this.causa,
          estado: this.estado,
          informante: this.informante,
          fechaSuceso: this.fechaSuceso,
          observacion: this.observacion,
        };

        console.log(this.datos);
        this.Daño.UPDATE(this.datos).subscribe((ResponseUpdate) => {
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
    if (this.id_danio <= 0) {
      this.faltanDatos('Seleccione un registro');
    } else {
      console.log(this.id_danio); //Prueba
      this.Daño.DELETE(this.id_danio).subscribe((ResponseDelete) => {
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
    id_danio: number,
    lugarFK: number,
    nomObjAfectado: string,
    causa: string,
    estado: string,
    informante: string,
    fechaSuceso: string,
    observacion: string
  ): void {
    this.id_danio = id_danio;
    this.lugarFK = lugarFK;
    this.nomObjAfectado = nomObjAfectado;
    this.causa = causa;
    this.estado = estado;
    this.informante = informante;
    this.fechaSuceso = fechaSuceso;
    this.observacion = observacion;
  }

  /*Para no recargar la pagina porque va encontra de la 'filosofia' de angular,
        Mejor espero 2sg y cargo a otro componente, inmediatamente despues, vuelvo al anterior, asi recargo el componente y no la pagina
        */
  public recargaComponente() {
    setTimeout(() => {
      this.vamosA.navigateByUrl('/movimientoIN');
      setTimeout(() => {
        this.vamosA.navigateByUrl('/Danios');
      }, 1);
    }, 2000);
  }
  public vaciarInputs() {
    this.id_danio = 0;
    this.lugarFK = 0;
    this.nomObjAfectado = '';
    this.causa = '';
    this.estado = '';
    this.informante = '';
    this.fechaSuceso = '';
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
      this.lugarFK > 0 &&
      this.nomObjAfectado.length > 1 &&
      this.causa.length > 0 &&
      this.estado.length > 0 &&
      this.informante.length > 0 &&
      this.fechaSuceso.length >= 10
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
    this.Daño.getByCriterio(this.criterioFiltrar).subscribe((ResponseAll) => {
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

  public id_danio: number = 0;
  public lugarFK: number = 0;
  public nomObjAfectado: string = '';
  public causa: string = '';
  public estado: string = '';
  public informante: string = '';
  public fechaSuceso: string = new Date().toISOString().substring(0, 10);
  public observacion: string = '';

  public datos: any = {};
  public criterioFiltrar: any = '';

  public lugares: any[] = [];
  public gerentes: any[] = [];
}
