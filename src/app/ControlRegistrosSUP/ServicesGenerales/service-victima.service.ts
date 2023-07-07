import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServiceVictimaService {
  constructor(private http: HttpClient) {}
  url = 'http://localhost/AppiProyectoPHP/models/ConsumeVictima.php';

  getVictima() {
    return this.http.get<any>(this.url);
  }
  getVictimaCriterio(criterio: any) {
    const params = { criterio: criterio };
    return this.http.get<any>(this.url, { params: params });
  }

  INSERT(datos: any) {
    return this.http.post<any>(this.url, datos);
  }

  UPDATE(datos: any) {
    return this.http.put<any>(this.url, datos);
  }

  DELETvictima(cc: number) {
    const parametro = { cc: cc };
    return this.http.delete<any>(this.url, { params: parametro });
  }
}
