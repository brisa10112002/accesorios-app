import { Injectable, signal } from '@angular/core';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private clave = 'usuario';
  usuario = signal<Usuario | null>(this.obtenerUsuario());

  login(nombreUsuario: string, contrasena: string): boolean {
    if (nombreUsuario === 'admin' && contrasena === '1234') {
      this.guardarSesion({ nombre: 'Admin', rol: 'admin' });
      return true;
    }

    if (nombreUsuario === 'cliente' && contrasena === '1234') {
      this.guardarSesion({ nombre: 'Cliente', rol: 'cliente' });
      return true;
    }

    return false;
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
