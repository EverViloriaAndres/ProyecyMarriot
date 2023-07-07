import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SerivceControlActivosService {
  constructor(private http: HttpClient) {}

  getActivos() {
    return this.http.get<any>(
      'http://localhost/AppiProyectoPHP/models/ConsumeActivos.php'
    );
  }
  getActivosFiltro(criterio: any) {
    const params = { criterio: criterio };
    return this.http.get<any>(
      'http://localhost/AppiProyectoPHP/models/ConsumeActivos.php',
      { params: params }
    );
  }

  insertActivos(datos: any) {
    return this.http.post<any>(
      'http://localhost/AppiProyectoPHP/models/ConsumeActivos.php',
      datos
    );
  }

  updateActivos(datos: any) {
    return this.http.put<any>(
      'http://localhost/AppiProyectoPHP/models/ConsumeActivos.php',
      datos
    );
  }

  deleteActivos(num_serial: number) {
    const parametro = { num_serial: num_serial };
    return this.http.delete<any>(
      'http://localhost/AppiProyectoPHP/models/ConsumeActivos.php',
      { params: parametro }
    );
  }
}
