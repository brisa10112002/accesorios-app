import { Component, inject } from '@angular/core';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { AccesoriosService } from '../../services/accesorios';
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
}