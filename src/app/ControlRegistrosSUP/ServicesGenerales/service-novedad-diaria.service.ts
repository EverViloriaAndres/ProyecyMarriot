import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServiceNovedadDiariaService {
  urlGeneral =
    'http://localhost/AppiProyectoPHP/models/ConsumeNovedadDiaria.php';

  constructor(private http: HttpClient) {}
  public listarLugares() {
    const parametroURL = { lugares: 'lugares' };
    return this.http.get<any>(this.urlGeneral, { params: parametroURL });
  }
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

  public DELETE(criterio: number) {
    const parametro = { criterio: criterio };
    return this.http.delete<any>(this.urlGeneral, { params: parametro });
  }
}
