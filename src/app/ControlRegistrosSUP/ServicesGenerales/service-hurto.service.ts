import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ServiceHurtoService {
  /********** */
  urlGeneral = 'http://localhost/AppiProyectoPHP/models/ConsumeHurtos.php';

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
  public listarOBJ(Option1: number) {
    const option = { Option1: Option1 };
    return this, this.http.get<any>(this.urlGeneral, { params: option });
  }
  public listarLugar(Option2: number) {
    const option = { Option2: Option2 };
    return this, this.http.get<any>(this.urlGeneral, { params: option });
  }
  public listarVictima(Option3: number) {
    const option = { Option3: Option3 };
    return this, this.http.get<any>(this.urlGeneral, { params: option });
  }
}
