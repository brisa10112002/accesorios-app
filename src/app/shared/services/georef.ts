import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Localidad, Provincia } from '../models/envio';

@Injectable({
  providedIn: 'root'
})
export class GeorefService {
  private http = inject(HttpClient);
  private url = 'https://apis.datos.gob.ar/georef/api';

  obtenerProvincias(): Observable<Provincia[]> {
    return this.http
      .get<{ provincias: Provincia[] }>(`${this.url}/provincias?campos=id,nombre&orden=nombre&max=30`)
      .pipe(
        map(respuesta => respuesta.provincias),
        catchError(() => of([]))
      );
  }

  obtenerLocalidades(idProvincia: string): Observable<Localidad[]> {
    return this.http
      .get<{ localidades: Localidad[] }>(`${this.url}/localidades?provincia=${idProvincia}&campos=id,nombre&orden=nombre&max=5000`)
      .pipe(
        map(respuesta => respuesta.localidades),
        catchError(() => of([]))
      );
  }
}
