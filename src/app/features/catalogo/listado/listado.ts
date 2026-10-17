import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AccesoriosService } from '../../../shared/services/accesorios';
import { CarritoService } from '../../../shared/services/carrito';
import { Accesorio } from '../../../shared/models/accesorios';
import { EstadoStockPipe } from '../../../shared/pipes/estado-stock.pipe';
import { DestacarStockDirective } from '../../../shared/directives/destacar-stock.directive';

@Component({
  selector: 'app-listado',
  imports: [CurrencyPipe, UpperCasePipe, RouterLink, EstadoStockPipe, DestacarStockDirective],
  templateUrl: './listado.html',
  styleUrl: './listado.css'
})
export class Listado implements OnInit {
  accesoriosService = inject(AccesoriosService);
  carritoService = inject(CarritoService);

  todos = signal<Accesorio[]>([]);
  cargando = signal(true);
  error = signal(false);
  categoriaActiva = signal('Todos');
  busqueda = signal('');
  orden = signal('destacados');
  esqueletos = [1, 2, 3, 4, 5, 6, 7, 8];
  accesorioSeleccionado = signal<Accesorio | null>(null);
  mensajeAgregado = signal('');

  categorias = computed(() => ['Todos', ...new Set(this.todos().map(a => a.categoria))]);

  accesorios = computed(() => {
    const texto = this.normalizar(this.busqueda());

    const lista = this.todos()
      .filter(a => this.categoriaActiva() === 'Todos' || a.categoria === this.categoriaActiva())
      .filter(a => this.normalizar(a.nombre).includes(texto));

    if (this.orden() === 'menor') {
      return [...lista].sort((a, b) => a.precio - b.precio);
    }
    if (this.orden() === 'mayor') {
      return [...lista].sort((a, b) => b.precio - a.precio);
    }
    return lista;
  });

  ngOnInit() {
    this.accesoriosService.retornar().subscribe({
      next: datos => {
        this.todos.set(datos);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set(true);
        this.cargando.set(false);
      }
    });
  }

  filtrar(categoria: string) {
    this.categoriaActiva.set(categoria);
  }

  buscar(texto: string) {
    this.busqueda.set(texto);
  }

  ordenar(valor: string) {
    this.orden.set(valor);
  }

  private normalizar(texto: string): string {
    return texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
  }

  verDetalle(accesorio: Accesorio) {
    this.accesorioSeleccionado.set(this.accesorioSeleccionado()?.id === accesorio.id ? null : accesorio);
  }

  agregar(accesorio: Accesorio) {
    const agregado = this.carritoService.agregar(accesorio);
    this.mensajeAgregado.set(agregado
      ? `✓ ${accesorio.nombre} agregado al carrito`
      : `Ya tenés en el carrito todo el stock de ${accesorio.nombre}`);
    setTimeout(() => this.mensajeAgregado.set(''), 3000);
  }
}
