import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccesoriosService } from '../../../shared/services/accesorios';

@Component({
  selector: 'app-formulario',
  imports: [ReactiveFormsModule, RouterLink, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './formulario.html',
  styleUrl: './formulario.css'
})
export class Formulario implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private accesoriosService = inject(AccesoriosService);
  private snackBar = inject(MatSnackBar);

  categorias: string[] = ['Carteras', 'Cinturones', 'Gorras', 'Bijouterie', 'Mochilas'];
  idEditar: string | null = null;
  guardando = signal(false);

  form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    categoria: ['', Validators.required],
    precio: [0, [Validators.required, Validators.min(1)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    imagen: ['', Validators.required],
    descripcion: ['', [Validators.required, Validators.maxLength(200)]]
  });

  ngOnInit() {
    this.idEditar = this.route.snapshot.paramMap.get('id');

    if (this.idEditar) {
      this.accesoriosService.buscarPorId(this.idEditar).subscribe({
        next: accesorio => this.form.patchValue(accesorio),
        error: () => {
          this.snackBar.open('No se encontró el accesorio', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/admin']);
        }
      });
    }
  }

  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.guardando.set(true);
    const datos = this.form.getRawValue();

    const peticion = this.idEditar
      ? this.accesoriosService.modificar({ id: this.idEditar, ...datos })
      : this.accesoriosService.agregar(datos);

    peticion.subscribe({
      next: () => {
        const mensaje = this.idEditar ? 'Accesorio actualizado' : 'Accesorio creado';
        this.snackBar.open(mensaje, 'Cerrar', { duration: 3000 });
        this.router.navigate(['/admin']);
      },
      error: () => {
        this.guardando.set(false);
        this.snackBar.open('No se pudo guardar el accesorio', 'Cerrar', { duration: 3000 });
      }
    });
  }
}
