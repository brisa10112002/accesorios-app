import { Injectable, signal } from '@angular/core';
import { Accesorio } from '../models/accesorios';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  items = signal<Accesorio[]>([]);

  agregar(accesorio: Accesorio) {
    this.items.update(lista => [...lista, accesorio]);
  }

  eliminar(id: number) {
    this.items.update(lista => lista.filter(a => a.id !== id));
  }

  total() {
    return this.items().reduce((acc, a) => acc + a.precio, 0);
  }
}