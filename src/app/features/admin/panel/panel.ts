import { Component, OnInit, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, switchMap } from 'rxjs';
import { AccesoriosService } from '../../../shared/services/accesorios';
import { Accesorio } from '../../../shared/models/accesorios';
import { ConfirmarDialogo } from '../../../shared/components/confirmar-dialogo/confirmar-dialogo';

@Component({
  selector: 'app-panel',
  imports: [CurrencyPipe, RouterLink, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './panel.html',
  styleUrl: './panel.css'
})
export class Panel implements OnInit {
  accesoriosService = inject(AccesoriosService);
  dialog = inject(MatDialog);
  snackBar = inject(MatSnackBar);

  accesorios = signal<Accesorio[]>([]);
  cargando = signal(true);
  error = signal(false);
  columnas: string[] = ['imagen', 'nombre', 'categoria', 'precio', 'stock', 'acciones'];

  ngOnInit() {
    this.accesoriosService.retornar().subscribe({
      next: datos => {
        this.accesorios.set(datos);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set(true);
        this.cargando.set(false);
      }
    });
  }

  eliminar(accesorio: Accesorio) {
    this.dialog.open(ConfirmarDialogo, {
      data: { mensaje: `¿Seguro que querés eliminar "${accesorio.nombre}"?` }
    })
      .afterClosed()
      .pipe(
        filter(confirmado => confirmado === true),
        switchMap(() => this.accesoriosService.eliminar(accesorio.id))
      )
      .subscribe({
        next: () => {
          this.accesorios.update(lista => lista.filter(a => a.id !== accesorio.id));
          this.snackBar.open('Accesorio eliminado', 'Cerrar', { duration: 3000 });
        },
        error: () => {
          this.snackBar.open('No se pudo eliminar el accesorio', 'Cerrar', { duration: 3000 });
        }
      });
  }
}
