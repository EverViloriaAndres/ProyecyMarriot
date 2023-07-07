import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InvestigacionHurtosServeceService {
  /********** */
  urlGeneral =
    'http://localhost/AppiProyectoPHP/models/ConsumeInvesigaHurto.php';

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

  public hurtos() {
    const parametro = { hurto: 'hurto' };
    return this, this.http.get<any>(this.urlGeneral, { params: parametro });
  }
  public investigaciones() {
    const parametro = { investigacion: 'investigacion' };
    return this, this.http.get<any>(this.urlGeneral, { params: parametro });
  }
}
