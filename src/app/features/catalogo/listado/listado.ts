import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { AccesoriosService } from '../../../shared/services/accesorios';
import { CarritoService } from '../../../shared/services/carrito';
import { Accesorio } from '../../../shared/models/accesorios';

@Component({
  selector: 'app-listado',
  imports: [CurrencyPipe, UpperCasePipe],
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
  accesorioSeleccionado = signal<Accesorio | null>(null);
  mensajeAgregado = signal('');

  categorias = computed(() => ['Todos', ...new Set(this.todos().map(a => a.categoria))]);

  accesorios = computed(() =>
    this.categoriaActiva() === 'Todos'
      ? this.todos()
      : this.todos().filter(a => a.categoria === this.categoriaActiva())
  );

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

  verDetalle(accesorio: Accesorio) {
    this.accesorioSeleccionado.set(this.accesorioSeleccionado()?.id === accesorio.id ? null : accesorio);
  }

  agregar(accesorio: Accesorio) {
    this.carritoService.agregar(accesorio);
    this.mensajeAgregado.set(`✓ ${accesorio.nombre} agregado al carrito`);
    setTimeout(() => this.mensajeAgregado.set(''), 3000);
  }
}
