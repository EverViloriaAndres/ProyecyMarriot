import { HttpClient } from '@angular/common/http';
import { publishFacade } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { __param } from 'tslib';

@Injectable({
  providedIn: 'root',
})
export class ServiceMovimientoINService {
  constructor(private http: HttpClient) {}

  public getAll() {
    return this.http.get<any>(this.url);
  }

  public getByCriterio(criterio: any) {
    const filtro = { criterio: criterio };
    return this.http.get<any>(this.url, { params: filtro });
  }
  public insert(datos: any) {
    return this.http.post<any>(this.url, datos);
  }
  public update(datos: any) {
    return this.http.put<any>(this.url, datos);
  }

  //Listas desplegables

  public listarGuardas() {
    const caso1 = { case: 1 };
    return this.http.get<any>(this.urlListasDesplegables, { params: caso1 });
  }
  public listarActivos() {
    const caso2 = { case: 2 };
    return this.http.get<any>(this.urlListasDesplegables, { params: caso2 });
  }

  urlListasDesplegables =
    'http://localhost/AppiProyectoPHP/models/ConsumeInComplements.php';
  url = 'http://localhost/AppiProyectoPHP/models/ConsumeMovimientoIN.php';
}
