import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceVisitaEspecialService } from '../ServicesGenerales/service-visita-especial.service';

@Component({
  selector: 'app-visitas-especiales',
  templateUrl: './visitas-especiales.component.html',
  styleUrls: ['./visitas-especiales.component.css'],
})
export class VisitasEspecialesComponent {
  constructor(
    private vamosA: Router,
    private servicio: ServiceVisitaEspecialService
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
        nombreVisitante: this.nombreVisitante,
        ocupacionVisitante: this.ocupacionVisitante,
        nacionalidad: this.nacionalidad,
        motivoVisita: this.motivoVisita,
        lugarFK: this.lugarFK,
        fechaIn: this.fechaIn,
        fechaOut: this.fechaOut,
        Observacion: this.Observacion,
      };
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
    if (this.id_Visita > 1) {
      this.datos = {
        nombreVisitante: this.nombreVisitante,
        ocupacionVisitante: this.ocupacionVisitante,
        nacionalidad: this.nacionalidad,
        motivoVisita: this.motivoVisita,
        lugarFK: this.lugarFK,
        fechaIn: this.fechaIn,
        fechaOut: this.fechaOut,
        Observacion: this.Observacion,
        id_Visita: this.id_Visita,
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
    if (this.id_Visita <= 0) {
      this.faltanDatos('Seleccione un registro');
    } else {
      console.log(this.id_Visita); //Prueba
      this.servicio.DELETE(this.id_Visita).subscribe((ResponseDelete) => {
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
    ocu: string,
    nac: string,
    mot: string,
    lug: number,
    fecIn: string,
    fecOut: string,
    obs: string
  ) {
    this.id_Visita = id;
    this.nombreVisitante = nom;
    this.ocupacionVisitante = ocu;
    this.nacionalidad = nac;
    this.motivoVisita = mot;
    this.lugarFK = lug;
    this.fechaIn = fecIn;
    this.fechaOut = fecOut;
    this.Observacion = obs;
  }
  /*Para no recargar la pagina porque va encontra de la 'filosofia' de angular,
        Mejor espero 2sg y cargo a otro componente, inmediatamente despues, vuelvo al anterior, asi recargo el componente y no la pagina
        */
  public recargaComponente() {
    setTimeout(() => {
      this.vamosA.navigateByUrl('/movimientoIN');
      setTimeout(() => {
        this.vamosA.navigateByUrl('/VisitaEspecial');
      }, 1);
    }, 2000);
  }
  public vaciarInputs() {
    this.id_Visita = 0;
    this.nombreVisitante = '';
    this.ocupacionVisitante = '';
    this.nacionalidad = '';
    this.motivoVisita = '';
    this.lugarFK = 0;
    this.fechaIn = '';
    this.fechaOut = 'NULL';
    this.Observacion = '';
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
      this.nombreVisitante.length > 2 &&
      this.ocupacionVisitante.length > 2 &&
      this.lugarFK > 0 &&
      this.fechaIn.length >= 10
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

  public id_Visita: number = 0;
  public nombreVisitante: string = '';
  public ocupacionVisitante: string = '';
  public nacionalidad: string = '';
  public motivoVisita: string = '';
  public lugarFK: number = 0;
  public fechaIn: string = new Date().toISOString().substring(0, 0);
  public fechaOut: string = 'NULL';
  public Observacion: string = '';

  public criterioFiltrar: any;

  public datos: any = {};

  public listaLugares: any[] = [];
}
