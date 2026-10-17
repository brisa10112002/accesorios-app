import { Component, DestroyRef, OnInit, inject, input, output, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { switchMap, tap } from 'rxjs';
import { GeorefService } from '../../../shared/services/georef';
import { DatosEnvio, Localidad, Provincia } from '../../../shared/models/envio';

@Component({
  selector: 'app-envio',
  imports: [CurrencyPipe, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './envio.html',
  styleUrl: './envio.css'
})
export class Envio implements OnInit {
  private fb = inject(FormBuilder);
  private georefService = inject(GeorefService);
  private destroyRef = inject(DestroyRef);

  total = input.required<number>();
  confirmar = output<DatosEnvio>();
  cancelar = output<void>();

  provincias = signal<Provincia[]>([]);
  localidades = signal<Localidad[]>([]);
  cargandoProvincias = signal(true);
  cargandoLocalidades = signal(false);

  form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    direccion: ['', Validators.required],
    provincia: ['', Validators.required],
    localidad: [{ value: '', disabled: true }, Validators.required],
    codigoPostal: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]]
  });

  ngOnInit() {
    this.georefService.obtenerProvincias().subscribe(datos => {
      this.provincias.set(datos);
      this.cargandoProvincias.set(false);
    });

    this.form.controls.provincia.valueChanges
      .pipe(
        tap(() => {
          this.form.controls.localidad.reset();
          this.form.controls.localidad.disable();
          this.localidades.set([]);
          this.cargandoLocalidades.set(true);
        }),
        switchMap(idProvincia => this.georefService.obtenerLocalidades(idProvincia)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(datos => {
        this.localidades.set(datos);
        this.cargandoLocalidades.set(false);
        if (datos.length > 0) {
          this.form.controls.localidad.enable();
        }
      });
  }

  enviar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const datos = this.form.getRawValue();
    const provincia = this.provincias().find(p => p.id === datos.provincia)?.nombre ?? '';
    const localidad = this.localidades().find(l => l.id === datos.localidad)?.nombre ?? '';

    this.confirmar.emit({
      nombre: datos.nombre,
      direccion: datos.direccion,
      provincia,
      localidad,
      codigoPostal: datos.codigoPostal
    });
  }
}
