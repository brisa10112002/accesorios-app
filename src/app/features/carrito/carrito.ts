import { Component, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CarritoService } from '../../shared/services/carrito';
import { DatosEnvio } from '../../shared/models/envio';
import { Accesorio } from '../../shared/models/accesorios';
import { Envio } from './envio/envio';

@Component({
  selector: 'app-carrito',
  imports: [CurrencyPipe, RouterLink, Envio],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css'
})
export class Carrito {
  carritoService = inject(CarritoService);
  private snackBar = inject(MatSnackBar);

  mostrarEnvio = signal(false);
  procesando = signal(false);

  sumar(accesorio: Accesorio) {
    if (!this.carritoService.agregar(accesorio)) {
      this.snackBar.open(`No hay más stock de ${accesorio.nombre}`, 'Cerrar', { duration: 3000 });
    }
  }

  finalizarCompra(datos: DatosEnvio) {
    this.procesando.set(true);

    this.carritoService.confirmarCompra().subscribe({
      next: () => {
        this.carritoService.vaciar();
        this.mostrarEnvio.set(false);
        this.procesando.set(false);
        this.snackBar.open(`¡Gracias ${datos.nombre}! Tu pedido se enviará a ${datos.localidad}, ${datos.provincia}`, 'Cerrar', { duration: 5000 });
      },
      error: (error: Error) => {
        this.procesando.set(false);
        const mensaje = error.message.startsWith('No hay stock')
          ? error.message
          : 'No se pudo confirmar la compra. Probá de nuevo.';
        this.snackBar.open(mensaje, 'Cerrar', { duration: 5000 });
      }
    });
  }
}
