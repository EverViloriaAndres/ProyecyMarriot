import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceEntregadoOBJService } from '../../ServicesGenerales/service-entregado-obj.service';

@Component({
  selector: 'app-obj-entregados',
  templateUrl: './obj-entregados.component.html',
  styleUrls: ['./obj-entregados.component.css'],
})
export class ObjEntregadosComponent {
  constructor(
    private objEntregado: ServiceEntregadoOBJService,
    private vamosA: Router
  ) {}
  /*al cargar el componente*/
  ngOnInit(): void {
    this.objEntregado.getAll().subscribe((ResponsIn) => {
      this.RegistrosParaPaginar(ResponsIn);
    });

    //Listas desplegables

    this.objEntregado.listarPersonal().subscribe((ResponsG) => {
      this.listaGuardas = ResponsG;
    });

    this.objEntregado.listarOBJ().subscribe((ResponsA) => {
      this.listOBJ = ResponsA;
    });
  }
  //get por criterio
  getByCriterio(criterio: any) {
    this.objEntregado
      .getByCriterio(criterio)
      .subscribe((ResponsConCriterio) => {
        this.RegistrosParaPaginar(ResponsConCriterio);
      });
  }

  public insert() {
    if (this.validarAntesInsertUpdate()) {
      this.DatosUdate_insert = {
        objetoFK: this.objetoFK,
        entrgadoPor_FK: this.entrgadoPor_FK,
        entregadoA: this.entregadoA,
        observaciones: this.observaciones,
        fechaSuceso: this.fechaSuceso,
      };
      this.objEntregado
        .insert(this.DatosUdate_insert)
        .subscribe((insertResponse) => {
          this, this.Mensaje('Agregado');

          this.recargar();
        });
    } else {
      this.Mensaje('Error al insertar, revise los datos');
    }
  }
  public update() {
    if (this.validarAntesInsertUpdate()) {
      this.DatosUdate_insert = {
        id: this.id,
        objetoFK: this.objetoFK,
        entrgadoPor_FK: this.entrgadoPor_FK,
        entregadoA: this.entregadoA,
        observaciones: this.observaciones,
        fechaSuceso: this.fechaSuceso,
      };
      this.objEntregado
        .update(this.DatosUdate_insert)
        .subscribe((ResponsUPDATE) => {
          this.Mensaje('Actualizado');
          this.recargar();
          return ResponsUPDATE.Estado;
        });
    } else {
      this.Mensaje('Error al actualizar, valide los datos');
    }
  }

  /**Metodos sin peticiones */

  public Mensaje(mensaje: string) {
    setTimeout(() => {
      this.mensajeOk = mensaje;

      setTimeout(() => {
        this.mensajeOk = '';
      }, 1000);
    }, 0);
  }

  public validarAntesInsertUpdate() {
    if (
      this.id !== null &&
      this.objetoFK !== null &&
      this.entrgadoPor_FK !== null &&
      this.entregadoA !== null &&
      this.entregadoA.length > 2 &&
      this.observaciones !== null &&
      this.observaciones.length > 5 &&
      this.fechaSuceso !== null
    ) {
      return true;
    } else {
      return false;
    }
  }

  vaciarInputs() {
    this.id = 0;
    this.objetoFK = 0;
    this.entrgadoPor_FK = 0;
    this.entregadoA = '';
    this.observaciones = '';
    this.fechaSuceso = '';
  }

  selecionar(
    arg0: number,
    arg1: number,
    arg2: number,
    arg3: string,
    arg4: string,
    arg5: string
  ) {
    this.id = arg0;
    this.objetoFK = arg1;
    this.entrgadoPor_FK = arg2;
    this.entregadoA = arg3;
    this.observaciones = arg4;
    this.fechaSuceso = arg5;
  }

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

  public recargar() {
    setTimeout(() => {
      this.vamosA.navigateByUrl('/Activos');
      setTimeout(() => {
        this.vamosA.navigateByUrl('/Entregado');
      }, 1);
    }, 2000);
  }

  public registros: any[] = [];
  public registrosPorPagina = 10;
  public inicioMostrar = 0;

  public disabled = false;
  public mensajeOk: string = '';
  public color: string = '';

  /*Soporte INPUT*/
  public id: number = 0;
  public objetoFK: number = 0;
  public entrgadoPor_FK: number;
  public entregadoA: string;
  public observaciones: string;
  public fechaSuceso: string = new Date().toISOString().substring(0, 10);

  public variableCriterio = '';

  public DatosUdate_insert: any = {};

  /*Arrays para los desplegables*/

  public listaGuardas: any[] = [];
  public listOBJ: any[] = [];
}
