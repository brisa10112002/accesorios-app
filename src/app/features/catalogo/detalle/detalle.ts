import { Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { AccesoriosService } from '../../../shared/services/accesorios';
import { CarritoService } from '../../../shared/services/carrito';
import { FavoritosService } from '../../../shared/services/favoritos';
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
  private destroyRef = inject(DestroyRef);
  carritoService = inject(CarritoService);
  favoritosService = inject(FavoritosService);

  accesorio = signal<Accesorio | null>(null);
  todos = signal<Accesorio[]>([]);
  cargando = signal(true);
  error = signal(false);
  mensajeAgregado = signal('');

  relacionados = computed(() => {
    const actual = this.accesorio();
    if (!actual) {
      return [];
    }

    const otros = this.todos().filter(a => a.id !== actual.id);
    const mismaCategoria = otros.filter(a => a.categoria === actual.categoria);
    const resto = otros.filter(a => a.categoria !== actual.categoria);

    return [...mismaCategoria, ...resto].slice(0, 4);
  });

  ngOnInit() {
    this.accesoriosService.retornar().subscribe({
      next: datos => this.todos.set(datos)
    });

    this.route.paramMap
      .pipe(
        tap(() => {
          this.cargando.set(true);
          this.error.set(false);
          window.scrollTo({ top: 0 });
        }),
        switchMap(parametros => this.accesoriosService.buscarPorId(parametros.get('id') ?? '')),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
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
    const agregado = this.carritoService.agregar(accesorio);
    this.mensajeAgregado.set(agregado
      ? `✓ ${accesorio.nombre} agregado al carrito`
      : `Ya tenés en el carrito todo el stock de ${accesorio.nombre}`);
    setTimeout(() => this.mensajeAgregado.set(''), 3000);
  }
}
