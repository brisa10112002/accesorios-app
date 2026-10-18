import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../shared/services/auth';
import { UsuarioRegistrado } from '../../shared/models/usuario';
import { contrasenasIguales } from '../../shared/validators/contrasenas-iguales';

@Component({
  selector: 'app-recuperar',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './recuperar.html',
  styleUrl: './login.css'
})
export class Recuperar {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);

  encontrado = signal<UsuarioRegistrado | null>(null);
  cargando = signal(false);
  error = signal('');
  verContrasena = signal(false);

  formUsuario = this.fb.nonNullable.group({
    usuario: ['', Validators.required]
  });

  formNueva = this.fb.nonNullable.group({
    respuesta: ['', Validators.required],
    contrasena: ['', [Validators.required, Validators.minLength(4)]],
    repetir: ['', Validators.required]
  }, { validators: contrasenasIguales });

  buscar() {
    if (this.formUsuario.invalid) {
      this.formUsuario.markAllAsTouched();
      return;
    }

    this.cargando.set(true);
    this.error.set('');

    this.authService.buscarUsuario(this.formUsuario.getRawValue().usuario).subscribe({
      next: usuario => {
        this.cargando.set(false);
        if (usuario) {
          this.encontrado.set(usuario);
        } else {
          this.error.set('No encontramos ese usuario.');
        }
      },
      error: () => {
        this.cargando.set(false);
        this.error.set('No se pudo buscar el usuario. Probá de nuevo.');
      }
    });
  }

  cambiar() {
    const usuario = this.encontrado();
    if (this.formNueva.invalid || !usuario) {
      this.formNueva.markAllAsTouched();
      return;
    }

    const { respuesta, contrasena } = this.formNueva.getRawValue();

    if (this.normalizar(respuesta) !== this.normalizar(usuario.respuesta)) {
      this.error.set('La respuesta no es correcta.');
      return;
    }

    this.cargando.set(true);
    this.error.set('');

    this.authService.cambiarContrasena(usuario, contrasena).subscribe({
      next: () => {
        this.snackBar.open('Contraseña actualizada. Ya podés iniciar sesión.', 'Cerrar', { duration: 4000 });
        this.router.navigate(['/login']);
      },
      error: () => {
        this.cargando.set(false);
        this.error.set('No se pudo cambiar la contraseña. Probá de nuevo.');
      }
    });
  }

  volver() {
    this.encontrado.set(null);
    this.formNueva.reset();
    this.error.set('');
  }

  private normalizar(texto: string): string {
    return texto.trim().toLowerCase();
  }
}
