import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Accesorio } from '../models/accesorios';

@Injectable({
  providedIn: 'root'
})
export class AccesoriosService {
  private http = inject(HttpClient);
  private url = 'https://6ad0399c03feaa52b21f1f73.mockapi.io/accesorios';

  retornar(): Observable<Accesorio[]> {
    return this.http.get<Accesorio[]>(this.url);
  }

  buscarPorId(id: string): Observable<Accesorio> {
    return this.http.get<Accesorio>(`${this.url}/${id}`);
  }

  agregar(accesorio: Omit<Accesorio, 'id'>): Observable<Accesorio> {
    return this.http.post<Accesorio>(this.url, accesorio);
  }

  modificar(accesorio: Accesorio): Observable<Accesorio> {
    return this.http.put<Accesorio>(`${this.url}/${accesorio.id}`, accesorio);
  }

  eliminar(id: string): Observable<Accesorio> {
    return this.http.delete<Accesorio>(`${this.url}/${id}`);
  }
}
