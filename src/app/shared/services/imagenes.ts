import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {
  private http = inject(HttpClient);
  private url = 'https://api.cloudinary.com/v1_1/cq3flamy/image/upload';
  private preset = 'majomo';

  subir(archivo: File): Observable<string> {
    const datos = new FormData();
    datos.append('file', archivo);
    datos.append('upload_preset', this.preset);

    return this.http.post<{ secure_url: string }>(this.url, datos).pipe(
      map(respuesta => respuesta.secure_url.replace('/upload/', '/upload/f_auto,q_auto,w_800/'))
    );
  }
}
