import { Component, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CarritoService } from '../../shared/services/carrito';
import { DatosEnvio } from '../../shared/models/envio';
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

  finalizarCompra(datos: DatosEnvio) {
    this.carritoService.vaciar();
    this.mostrarEnvio.set(false);
    this.snackBar.open(`¡Gracias ${datos.nombre}! Tu pedido se enviará a ${datos.localidad}, ${datos.provincia}`, 'Cerrar', { duration: 5000 });
  }
}
