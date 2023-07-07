import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TrabajadorSexualServiceService {
  constructor(private http: HttpClient) {}
  url = 'http://localhost/AppiProyectoPHP/models/ConsumeTrabajadorSXL.php';

  getAll() {
    return this.http.get<any>(this.url);
  }
  getByFiltro(criterio: any) {
    const params = { criterio: criterio };
    return this.http.get<any>(this.url, { params: params });
  }

  insert(datos: any) {
    return this.http.post<any>(this.url, datos);
  }

  update(datos: any) {
    return this.http.put<any>(this.url, datos);
  }

  delete(cc: number) {
    const parametro = { cc: cc };
    return this.http.get<any>(this.url, { params: parametro });
  }
}
