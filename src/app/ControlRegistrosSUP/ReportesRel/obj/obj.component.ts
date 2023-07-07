import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceOBJService } from '../../ServicesGenerales/service-obj.service';

@Component({
  selector: 'app-obj',
  templateUrl: './obj.component.html',
  styleUrls: ['./obj.component.css'],
})
export class ObjComponent {
  //Contructor
  constructor(private servicioOBJ: ServiceOBJService, private vamosA: Router) {}

  /*Cargar datos al inicio del componente*/
  ngOnInit(): void {
    this.servicioOBJ.getAll().subscribe((Response) => {
      this.RegistrosParaPaginar(Response);
    });
  }

  /*Metodos que hacen peticiones http a la Api*/

  //Insert
  insertOBJ() {
    if (this.validarAntesInsertUpdate()) {
      //Array asociativo para parametros
      this.datos = {
        nombre: this.nombre,
        marca: this.marca,
        contenido: this.contenido,
        valor: this.valor,
      };
      //Consumir servicio insert
      this.servicioOBJ.insert(this.datos).subscribe((Response) => {
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
  updateOBJ() {
    if (this.validarAntesInsertUpdate()) {
      //Array asociativo para parametros
      this.datos = {
        id: this.idOBJ,
        nombre: this.nombre,
        marca: this.marca,
        contenido: this.contenido,
        valor: this.valor,
      };

      this.servicioOBJ.update(this.datos).subscribe((Respons) => {
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
  deleteOBJ() {
    if (this.validarAntesInsertUpdate()) {
      if (this.idOBJ > 0) {
        this.servicioOBJ.delete(this.idOBJ).subscribe((Response) => {
          if (Response.Estado === 'true') {
            this.mensajeOk = 'Eliminado';
            this.recargaComponente();
          } else {
            this.mensajeOk = 'Error Inesperado';
          }
        });
      } else {
        this.faltanDatos('Faltan Datos');
      }
    } else {
      this.faltanDatos('Porfavor Selecione algo');
    }
  }

  getByFiltro(criterio: any) {
    this.servicioOBJ.getByFiltro(criterio).subscribe((Respons3) => {
      this.RegistrosParaPaginar(Respons3);
    });
  }

  /*Metodos que no hacen peticiones HTTP*/
  select(id: number, nom: string, mark: string, cont: string, val: number) {
    this.idOBJ = id;
    this.nombre = nom;
    this.marca = mark;
    this.contenido = cont;
    this.valor = val;
  }
  /*Para no recargar la pagina porque va encontra de la 'filosofia' de angular,
        Mejor espero 2sg y cargo a otro componente, inmediatamente despues, vuelvo al anterior, asi recargo el componente y no la pagina
        */
  public recargaComponente() {
    setTimeout(() => {
      this.vamosA.navigateByUrl('/movimientoIN');
      setTimeout(() => {
        this.vamosA.navigateByUrl('/Objetos');
      }, 1);
    }, 2000);
  }
  public vaciarInputs() {
    this.idOBJ = 0;
    this.nombre = '';
    this.marca = '';
    this.contenido = '';
    this.valor = 0;
  }

  public preparaGuardar() {
    if (this.disabled) {
      this.disabled = false;
    }
    this.vaciarInputs();
  }
  public validarAntesInsertUpdate() {
    if (
      this.idOBJ < 0 ||
      this.nombre.length < 3 ||
      this.marca.length < 2 ||
      this.contenido.length < 1 ||
      this.valor <= 0
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
  public disabled = true;

  public mensajeOk: string = '';
  public idOBJ: number = 1;

  public nombre: string = '';
  public marca: string = '';
  public contenido: string = '';
  public valor: number = 0;
  public datos: any = {};
}
