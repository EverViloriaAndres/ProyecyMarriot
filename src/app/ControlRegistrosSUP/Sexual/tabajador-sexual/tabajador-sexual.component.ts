import { Component } from '@angular/core';
import { TrabajadorSexualServiceService } from '../../ServicesGenerales/trabajador-sexual-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabajador-sexual',
  templateUrl: './tabajador-sexual.component.html',
  styleUrls: ['./tabajador-sexual.component.css'],
})
export class TabajadorSexualComponent {
  //Contructor
  constructor(
    private TSexual: TrabajadorSexualServiceService,
    private vamosA: Router
  ) {}

  /*Cargar datos al inicio del componente*/
  ngOnInit(): void {
    this.TSexual.getAll().subscribe((Response) => {
      this.RegistrosParaPaginar(Response);
    });
  }

  /*Metodos que hacen peticiones http a la Api*/

  //Insert
  insert() {
    if (this.validarAntesInsertUpdate()) {
      //Array asociativo para parametros
      this.datos = {
        cc: this.cc,
        nombre: this.nombre,
        apellido: this.apellido,
        genero: this.genero,
      };
      console.log(this.datos);
      //Consumir servicio insert
      this.TSexual.insert(this.datos).subscribe((Response) => {
        if (Response.Estado === 'true') {
          this.mensajeOk = 'Agregado con Normalidad';

          this.vaciarInputs();

          this.recargaComponente();
        } else {
          this.mensajeOk = 'Error: Valida los datos';
        }
      });
    } else {
      this.faltanDatos('Faltan Datos');
    }
  }

  //Update
  update() {
    if (this.validarAntesInsertUpdate()) {
      //Array asociativo para parametros
      this.datos = {
        cc: this.cc,
        nombre: this.nombre,
        apellido: this.apellido,
        genero: this.genero,
      };
      console.log(this.datos);

      this.TSexual.update(this.datos).subscribe((Respons) => {
        if (Respons.Estado === 'true') {
          this.mensajeOk = 'Actualizado con Normalidad';

          this.recargaComponente();
        } else {
          this.mensajeOk = 'Validad los datos';
        }
      });
    } else {
      this.faltanDatos('Faltan datos');
    }
  }
  //Delete
  delete() {
    if (this.validarAntesInsertUpdate()) {
      console.log(this.datos.cc);
      this.TSexual.delete(this.cc).subscribe((Response) => {
        if (Response.Estado === 'true') {
          this.mensajeOk = 'Eliminado';
          this.recargaComponente();
        } else {
          this.mensajeOk = 'Error Inesperado';
        }
      });
    } else {
      this.faltanDatos('Porfavor Selecione algo');
    }
  }

  getByFiltro() {
    console.log(this.filtro);
    this.TSexual.getByFiltro(this.filtro).subscribe((Respons3) => {
      if (Respons3.Estado === 'false') {
        this.faltanDatos('No hay coincidencias');
      } else {
        this.RegistrosParaPaginar(Respons3);
      }
    });
  }

  /*Metodos que no hacen peticiones HTTP*/
  select(cc: number, nom: string, app: string, gen: string) {
    this.cc = cc;
    this.nombre = nom;
    this.apellido = app;
    this.genero = gen;
  }
  /*Para no recargar la pagina porque va encontra de la 'filosofia' de angular,
         Mejor espero 2sg y cargo a otro componente, inmediatamente despues, vuelvo al anterior, asi recargo el componente y no la pagina
         */
  public recargaComponente() {
    setTimeout(() => {
      this.vamosA.navigateByUrl('/movimientoIN');
      setTimeout(() => {
        this.vamosA.navigateByUrl('/TrabajadorSexual');
      }, 1);
    }, 2000);
  }
  public vaciarInputs() {
    this.cc = 0;
    this.nombre = '';
    this.apellido = '';
    this.genero = '';
  }

  public preparaGuardar() {
    if (this.disabled) {
      this.disabled = false;
    }
    this.vaciarInputs();
  }
  public validarAntesInsertUpdate() {
    if (
      this.cc > 3 &&
      this.nombre.length >= 3 &&
      this.apellido.length >= 3 &&
      this.genero.length > 0
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

  public datos: any = {};
  public registros: any[] = [];
  public registrosPorPagina = 10;
  public inicioMostrar = 0;
  public disabled = true;

  public mensajeOk: string = '';

  public cc: number = 1;
  public nombre: string = '';
  public apellido: string = '';
  public genero: string = '';

  public filtro: any = '';
}
