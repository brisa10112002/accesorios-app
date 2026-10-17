import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { Observable, forkJoin, switchMap, throwError } from 'rxjs';
import { Accesorio } from '../models/accesorios';
import { ItemCarrito } from '../models/carrito';
import { AccesoriosService } from './accesorios';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private accesoriosService = inject(AccesoriosService);
  private clave = 'carrito';

  items = signal<ItemCarrito[]>(this.leerCarrito());
  cantidadTotal = computed(() => this.items().reduce((acc, item) => acc + item.cantidad, 0));

  constructor() {
    effect(() => {
      localStorage.setItem(this.clave, JSON.stringify(this.items()));
    });
  }

  agregar(accesorio: Accesorio): boolean {
    const existente = this.items().find(item => item.accesorio.id === accesorio.id);

    if (existente) {
      if (existente.cantidad >= accesorio.stock) {
        return false;
      }
      this.items.update(lista =>
        lista.map(item => item.accesorio.id === accesorio.id ? { ...item, cantidad: item.cantidad + 1 } : item)
      );
      return true;
    }

    if (accesorio.stock === 0) {
      return false;
    }
    this.items.update(lista => [...lista, { accesorio, cantidad: 1 }]);
    return true;
  }

  restar(id: string) {
    this.items.update(lista =>
      lista
        .map(item => item.accesorio.id === id ? { ...item, cantidad: item.cantidad - 1 } : item)
        .filter(item => item.cantidad > 0)
    );
  }

  eliminar(id: string) {
    this.items.update(lista => lista.filter(item => item.accesorio.id !== id));
  }

  vaciar() {
    this.items.set([]);
  }

  total() {
    return this.items().reduce((acc, item) => acc + item.accesorio.precio * item.cantidad, 0);
  }

  confirmarCompra(): Observable<Accesorio[]> {
    const pedidos = this.items().map(item =>
      this.accesoriosService.buscarPorId(item.accesorio.id).pipe(
        switchMap(actual => {
          if (actual.stock < item.cantidad) {
            return throwError(() => new Error(`No hay stock suficiente de ${actual.nombre}`));
          }
          return this.accesoriosService.modificar({ ...actual, stock: actual.stock - item.cantidad });
        })
      )
    );

    return forkJoin(pedidos);
  }

  private leerCarrito(): ItemCarrito[] {
    const datos = localStorage.getItem(this.clave);
    return datos ? JSON.parse(datos) : [];
  }
}
