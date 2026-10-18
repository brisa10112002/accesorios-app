import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../shared/services/auth';
import { contrasenasIguales } from '../../shared/validators/contrasenas-iguales';

@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './registro.html',
  styleUrl: './login.css'
})
export class Registro {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);

  preguntas: string[] = [
    '¿Cómo se llamaba tu primera mascota?',
    '¿En qué ciudad naciste?',
    '¿Cuál es tu comida favorita?',
    '¿Cómo se llama tu mejor amigo/a de la infancia?'
  ];
  guardando = signal(false);
  error = signal('');
  verContrasena = signal(false);

  form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    usuario: ['', [Validators.required, Validators.minLength(4)]],
    contrasena: ['', [Validators.required, Validators.minLength(4)]],
    repetir: ['', Validators.required],
    pregunta: ['', Validators.required],
    respuesta: ['', Validators.required]
  }, { validators: contrasenasIguales });

  registrarse() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.guardando.set(true);
    this.error.set('');
    const datos = this.form.getRawValue();

    this.authService.registrar({
      nombre: datos.nombre,
      usuario: datos.usuario.trim(),
      contrasena: datos.contrasena,
      pregunta: datos.pregunta,
      respuesta: datos.respuesta
    }).subscribe({
      next: nuevo => {
        this.authService.guardarSesion({ nombre: nuevo.nombre, rol: nuevo.rol });
        this.snackBar.open(`¡Bienvenida/o, ${nuevo.nombre}!`, 'Cerrar', { duration: 3000 });
        this.router.navigate(['/catalogo']);
      },
      error: (error: Error) => {
        this.guardando.set(false);
        this.error.set(error.message === 'Ese usuario ya existe'
          ? 'Ese usuario ya existe, elegí otro.'
          : 'No se pudo crear la cuenta. Probá de nuevo.');
      }
    });
  }
}
