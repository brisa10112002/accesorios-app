import { Component, inject } from '@angular/core';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { AccesoriosService } from '../../services/accesorios';
import { CarritoService } from '../../services/carrito';
import { Accesorio } from '../../models/accesorios';

@Component({
  selector: 'app-listado',
  imports: [CurrencyPipe, UpperCasePipe],
  templateUrl: './listado.html',
  styleUrl: './listado.css'
})
export class Listado {
  todos: Accesorio[] = inject(AccesoriosService).retornar();
  accesorios: Accesorio[] = this.todos;
  categoriaActiva: string = 'Todos';
  accesorioSeleccionado: Accesorio | null = null;
  carritoService = inject(CarritoService);
  mensajeAgregado: string = '';

  categorias: string[] = ['Todos', ...new Set(this.todos.map(a => a.categoria))];

  filtrar(categoria: string) {
    this.categoriaActiva = categoria;
    this.accesorios = categoria === 'Todos'
      ? this.todos
      : this.todos.filter(a => a.categoria === categoria);
  }

  verDetalle(accesorio: Accesorio) {
    this.accesorioSeleccionado = this.accesorioSeleccionado?.id === accesorio.id ? null : accesorio;
  }

  agregar(accesorio: Accesorio) {
    this.carritoService.agregar(accesorio);
    this.mensajeAgregado = `✓ ${accesorio.nombre} agregado al carrito`;
    setTimeout(() => this.mensajeAgregado = '', 3000);
  }
}