import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServiceInvestigacionService {
  /********** */
  urlGeneral =
    'http://localhost/AppiProyectoPHP/models/consumeInvestigacion.php';

  constructor(private http: HttpClient) {}

  public getAll() {
    return this.http.get<any>(this.urlGeneral);
  }
  public getByCriterio(criterio: any) {
    const parametro = { criterio: criterio };
    return this.http.get<any>(this.urlGeneral, { params: parametro });
  }

  public INSERT(datos: any) {
    return this.http.post<any>(this.urlGeneral, datos);
  }

  public UPDATE(datos: any) {
    return this.http.put<any>(this.urlGeneral, datos);
  }

  /************* Listas desplegables*/

  public lugares() {
    const parametro = { lugar: 'lugar' };
    return this, this.http.get<any>(this.urlGeneral, { params: parametro });
  }
  public gerentes() {
    const parametro = { gerente: 'gerente' };
    return this, this.http.get<any>(this.urlGeneral, { params: parametro });
  }
}
