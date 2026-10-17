import { Component, OnInit, inject, signal } from '@angular/core';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AccesoriosService } from '../../../shared/services/accesorios';
import { CarritoService } from '../../../shared/services/carrito';
import { Accesorio } from '../../../shared/models/accesorios';
import { EstadoStockPipe } from '../../../shared/pipes/estado-stock.pipe';
import { DestacarStockDirective } from '../../../shared/directives/destacar-stock.directive';

@Component({
  selector: 'app-detalle',
  imports: [CurrencyPipe, UpperCasePipe, RouterLink, EstadoStockPipe, DestacarStockDirective],
  templateUrl: './detalle.html',
  styleUrl: './detalle.css'
})
export class Detalle implements OnInit {
  private route = inject(ActivatedRoute);
  private accesoriosService = inject(AccesoriosService);
  carritoService = inject(CarritoService);

  accesorio = signal<Accesorio | null>(null);
  cargando = signal(true);
  error = signal(false);
  mensajeAgregado = signal('');

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';

    this.accesoriosService.buscarPorId(id).subscribe({
      next: datos => {
        this.accesorio.set(datos);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set(true);
        this.cargando.set(false);
      }
    });
  }

  agregar(accesorio: Accesorio) {
    this.carritoService.agregar(accesorio);
    this.mensajeAgregado.set(`✓ ${accesorio.nombre} agregado al carrito`);
    setTimeout(() => this.mensajeAgregado.set(''), 3000);
  }
}
