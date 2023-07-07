import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServiceControlMovimientoOUTService {
  protected url =
    'http://localhost/AppiProyectoPHP/models/consumeMovimientoOUT.php';
  protected urlListas =
    'http://localhost/AppiProyectoPHP/models/ConsumeOUTcomplements.php';

  constructor(private http: HttpClient) {}

  /**Consumos Principales */

  public getAll() {
    return this.http.get<any>(this.url);
  }
  public getByCriterio(criterio: any) {
    const parametro: any = { criterio: criterio };
    return this.http.get<any>(this.url, { params: parametro });
  }

  public insert(datos: any) {
    return this.http.post<any>(this.url, datos);
  }
  public update(datos: any) {
    return this.http.put<any>(this.url, datos);
  }

  /*Metodos que devuelven los valores para las obciones desplegables*/
  public listarAutorizadores() {
    const parametros = { case: 1 };
    return this.http.get<any>(this.urlListas, { params: parametros });
  }
  public listarGuardas() {
    const parametros = { case: 2 };
    return this.http.get<any>(this.urlListas, { params: parametros });
  }
  public listarActivos() {
    const parametros = { case: 3 };
    return this.http.get<any>(this.urlListas, { params: parametros });
  }
}
