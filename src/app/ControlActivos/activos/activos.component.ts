import { Component, OnInit } from '@angular/core';
import { SerivceControlActivosService } from '../Services/serivce-control-activos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activos',
  templateUrl: './activos.component.html',
  styleUrls: ['./activos.component.css'],
})
export class ActivosComponent implements OnInit {
  constructor(
    private servicioActivos: SerivceControlActivosService,
    private vamosA: Router
  ) {
    if (this.num_serial === null) {
      this.disabled = true;
    }
  }

  /*Cargar datos al inicio del componente*/
  ngOnInit(): void {
    this.servicioActivos.getActivos().subscribe((Response) => {
      this.RegistrosParaPaginar(Response);
    });

    /* this.servicioActivos.getActivosFiltro(1).subscribe((Response) => {
      this.response = Response;
    });*/
  }

  /*Metodos que hacen peticiones http a la Api*/

  //Insert
  insertNuevoActivo() {
    if (this.validarAntesInsertUpdate()) {
      //Array asociativo para parametros
      this.datos = {
        num_serial: this.num_serial,
        nombre: this.nombre,
        describcion: this.describcion,
        valor: this.valor,
        enPosecion: this.enPosecion,
      };
      //Consumir servicio insert
      this.servicioActivos.insertActivos(this.datos).subscribe((Response) => {
        if (Response.Estado === 'true') {
          this.mensajeOk = 'Agregado con Normalidad';

          this.vaciarInputs();

          this.recargaComponente();
        } else {
          this.mensajeOk = 'Error: Valida los datos';
        }
      });
    } else {
      this.faltanDatos();
    }
  }

  //Update
  updateActivo() {
    if (this.validarAntesInsertUpdate()) {
      //Array asociativo para parametros
      this.datos = {
        num_serial: this.num_serial,
        nombre: this.nombre,
        describcion: this.describcion,
        valor: this.valor,
        enPosecion: this.enPosecion,
      };

      this.servicioActivos.updateActivos(this.datos).subscribe((Respons) => {
        if (Respons.Estado === 'true') {
          this.mensajeOk = 'Actualizado con Normalidad';

          this.recargaComponente();
        } else {
          this.mensajeOk = 'Validad los datos';
        }
      });
    } else {
      this.faltanDatos();
    }
  }
  //Delete
  deleteActivo(num_serial: number) {
    if (num_serial != 0) {
      this.servicioActivos.deleteActivos(num_serial).subscribe((Response) => {
        if (Response.Estado === 'true') {
          this.mensajeOk = 'Eliminado';
          this.recargaComponente();
        } else {
          this.mensajeOk = 'Error Inesperado';
        }
      });
    } else {
      this.faltanDatos();
    }
  }

  getByFiltro(criterio: any) {
    this.servicioActivos.getActivosFiltro(criterio).subscribe((Respons2) => {
      this.RegistrosParaPaginar(Respons2);
    });
  }

  /*Metodos que no hacen peticiones HTTP*/
  select(num: number, nom: string, des: string, val: number, siNo: string) {
    this.num_serial = num;
    this.nombre = nom;
    this.describcion = des;
    this.valor = val;
    this.enPosecion = siNo;
    this.disabled = true;
  }
  /*Para no recargar la pagina porque va encontra de la 'filosofia' de angular,
        Mejor espero 2sg y cargo a otro componente, inmediatamente despues, vuelvo al anterior, asi recargo el componente y no la pagina
        */
  public recargaComponente() {
    setTimeout(() => {
      this.vamosA.navigateByUrl('/movimientoIN');
      setTimeout(() => {
        this.vamosA.navigateByUrl('/Activos');
      }, 1);
    }, 2000);
  }
  public vaciarInputs() {
    this.num_serial = 0;
    this.nombre = '';
    this.describcion = '';
    this.valor = 0;
    this.enPosecion = '';
  }

  public preparaGuardar() {
    if (this.disabled) {
      this.disabled = false;
    }
    this.vaciarInputs();
  }
  public validarAntesInsertUpdate() {
    if (
      this.num_serial <= 0 ||
      this.nombre.length < 3 ||
      this.describcion.length < 3 ||
      this.valor <= 0 ||
      this.enPosecion.length < 2
    ) {
      return false;
    } else {
      return true;
    }
  }

  public faltanDatos() {
    this.mensajeOk = 'Datos insuficientes';
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
  public disabled = false;

  public mensajeOk: string = '';
  public num_serial: number = 0;
  public nombre: string = '';
  public describcion: string = '';
  public valor: number = 0;
  public enPosecion: string = '';
  public datos: any = {};
}
