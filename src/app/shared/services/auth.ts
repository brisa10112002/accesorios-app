import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap, throwError } from 'rxjs';
import { Usuario, UsuarioRegistrado } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private url = 'https://6ad0399c03feaa52b21f1f73.mockapi.io/usuarios';
  private clave = 'usuario';
  usuario = signal<Usuario | null>(this.obtenerUsuario());

  login(nombreUsuario: string, contrasena: string): Observable<boolean> {
    return this.buscarUsuario(nombreUsuario).pipe(
      map(encontrado => {
        if (encontrado && encontrado.contrasena === contrasena) {
          this.guardarSesion({ nombre: encontrado.nombre, rol: encontrado.rol });
          return true;
        }
        return false;
      })
    );
  }

  registrar(datos: Omit<UsuarioRegistrado, 'id' | 'rol'>): Observable<UsuarioRegistrado> {
    return this.buscarUsuario(datos.usuario).pipe(
      switchMap(existente => {
        if (existente) {
          return throwError(() => new Error('Ese usuario ya existe'));
        }
        return this.http.post<UsuarioRegistrado>(this.url, { ...datos, rol: 'cliente' });
      })
    );
  }

  buscarUsuario(nombreUsuario: string): Observable<UsuarioRegistrado | undefined> {
    return this.http.get<UsuarioRegistrado[]>(this.url).pipe(
      map(lista => lista.find(u => u.usuario.toLowerCase() === nombreUsuario.trim().toLowerCase()))
    );
  }

  cambiarContrasena(usuario: UsuarioRegistrado, nuevaContrasena: string): Observable<UsuarioRegistrado> {
    return this.http.put<UsuarioRegistrado>(`${this.url}/${usuario.id}`, { ...usuario, contrasena: nuevaContrasena });
  }

  guardarSesion(usuario: Usuario) {
    localStorage.setItem(this.clave, JSON.stringify(usuario));
    this.usuario.set(usuario);
  }

  obtenerUsuario(): Usuario | null {
    const datos = localStorage.getItem(this.clave);
    return datos ? JSON.parse(datos) : null;
  }

  estaLogueado(): boolean {
    return this.usuario() !== null;
  }

  getRol(): string | null {
    return this.usuario()?.rol ?? null;
  }

  logout() {
    localStorage.removeItem(this.clave);
    this.usuario.set(null);
  }
}
