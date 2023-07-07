import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServiceVisitaEspecialService {
  urlGeneral =
    'http://localhost/AppiProyectoPHP/models/ConsumeVisitaEspecial.php';

  constructor(private http: HttpClient) {}
  public listarLugares() {
    const parametroURL = { Option2: 'Option2' };
    return this.http.get<any>(this.urlGeneral, { params: parametroURL });
  }
  public getAll() {
    return this.http.get<any>(this.urlGeneral);
  }
  public getByFiltro(criterio: any) {
    const params = { criterio: criterio };
    return this.http.get<any>(this.urlGeneral, { params: params });
  }

  public INSERT(datos: any) {
    return this.http.post<any>(this.urlGeneral, datos);
  }

  public UPDATE(datos: any) {
    return this.http.put<any>(this.urlGeneral, datos);
  }

  public DELETE(borrar: number) {
    const parametro = { borrar: borrar };
    return this.http.get<any>(this.urlGeneral, { params: parametro });
  }
}
