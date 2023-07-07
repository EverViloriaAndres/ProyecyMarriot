import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServiceEntregadoOBJService {
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

  public listarPersonal() {
    const caso1 = { case: 4 };
    return this.http.get<any>(this.urlListasDesplegables, { params: caso1 });
  }
  public listarOBJ() {
    const caso2 = { case: 3 };
    return this.http.get<any>(this.urlListasDesplegables, { params: caso2 });
  }

  urlListasDesplegables =
    'http://localhost/AppiProyectoPHP/models/ConsumeInComplements.php';
  url = 'http://localhost/AppiProyectoPHP/models/ConsumeOBJDevueltos.php';
}
