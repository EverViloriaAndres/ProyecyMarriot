import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceVictimaService } from '../../ServicesGenerales/service-victima.service';

@Component({
  selector: 'app-victima',
  templateUrl: './victima.component.html',
  styleUrls: ['./victima.component.css'],
})
export class VictimaComponent {
  //*********************
  constructor(
    private ServiceVictima: ServiceVictimaService,
    private vamosA: Router
  ) {}

  /*Cargar datos al inicio del componente*/
  ngOnInit(): void {
    this.ServiceVictima.getVictima().subscribe((Response) => {
      console.log(Response);
      this.RegistrosParaPaginar(Response);
    });
  }

  /*Metodos que hacen peticiones http a la Api*/

  //Insert
  insertNuevoActivo() {
    if (this.validarAntesInsertUpdate()) {
      //Array asociativo para parametros
      this.datos = {
        nombre: this.nombre,
        apellido: this.apellido,
        cc: this.cc,
        cargo: this.cargo,
      };
      //Consumir servicio insert
      this.ServiceVictima.INSERT(this.datos).subscribe((Response) => {
        if (Response.Estado === 'true') {
          this.mensajeOk = 'Agregado con Normalidad';

          this.vaciarInputs();

          this.recargaComponente();
        } else {
          this.mensajeOk = 'Error: Valida los datos';
        }
      });
    } else {
      this.faltanDatos('Todos los campos deben llenarse.');
    }
  }

  //Update
  updateActivo() {
    if (this.validarAntesInsertUpdate()) {
      //Array asociativo para parametros
      this.datos = {
        nombre: this.nombre,
        apellido: this.apellido,
        cc: this.cc,
        cargo: this.cargo,
      };

      this.ServiceVictima.UPDATE(this.datos).subscribe((Respons) => {
        if (Respons.Estado === 'true') {
          this.mensajeOk = 'Actualizado con Normalidad';

          this.recargaComponente();
        } else {
          this.mensajeOk = 'Validad los datos';
        }
      });
    } else {
      this.faltanDatos('Valide los datos ');
    }
  }
  //Delete
  deleteActivo() {
    if (this.cc != 0) {
      this.ServiceVictima.DELETvictima(this.cc).subscribe((Response) => {
        if (Response.Estado === 'true') {
          this.mensajeOk = 'Eliminado';
          this.recargaComponente();
        } else {
          this.mensajeOk = 'Error Inesperado';
        }
      });
    } else {
      this.faltanDatos('Nada seleccionado');
    }
  }

  getByFiltro(criterio: any) {
    this.ServiceVictima.getVictimaCriterio(criterio).subscribe((Respons2) => {
      this.RegistrosParaPaginar(Respons2);
    });
  }

  /*Metodos que no hacen peticiones HTTP*/
  select(nom: string, ap: string, cc: number, cargo: string) {
    this.nombre = nom;
    this.apellido = ap;
    this.cc = cc;
    this.cargo = cargo;
    this.disabled = true;
  }
  /*Para no recargar la pagina porque va encontra de la 'filosofia' de angular,
        Mejor espero 2sg y cargo a otro componente, inmediatamente despues, vuelvo al anterior, asi recargo el componente y no la pagina
        */
  public recargaComponente() {
    setTimeout(() => {
      this.vamosA.navigateByUrl('/movimientoIN');
      setTimeout(() => {
        this.vamosA.navigateByUrl('/Victima');
      }, 1);
    }, 2000);
  }
  public vaciarInputs() {
    this.cc = 0;
    this.nombre = '';
    this.apellido = '';
    this.cargo = '';
    this.disabled = false;
  }

  public preparaGuardar() {
    this.vaciarInputs();
  }
  public validarAntesInsertUpdate() {
    if (
      this.cc <= 0 ||
      this.nombre.length < 3 ||
      this.apellido.length < 3 ||
      this.cargo.length <= 0
    ) {
      return false;
    } else {
      return true;
    }
  }

  public faltanDatos(mensaje: string) {
    this.mensajeOk = mensaje;
    setTimeout(() => {
      this.mensajeOk = '';
    }, 1000);
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
  public disabled: boolean = false;

  public mensajeOk: string = '';

  public nombre: string = '';
  public apellido: string = '';
  public cc: number = 0;
  public cargo: string = '';

  public datos: any = {};
}
