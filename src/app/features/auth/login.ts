import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  error = signal(false);

  form = this.fb.nonNullable.group({
    usuario: ['', Validators.required],
    contrasena: ['', [Validators.required, Validators.minLength(4)]]
  });

  iniciarSesion() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { usuario, contrasena } = this.form.getRawValue();

    if (this.authService.login(usuario, contrasena)) {
      this.error.set(false);
      const destino = this.authService.getRol() === 'admin' ? '/admin' : '/catalogo';
      this.router.navigate([destino]);
    } else {
      this.error.set(true);
    }
  }
}
