import { Injectable, computed, effect, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {
  private clave = 'favoritos';

  ids = signal<string[]>(this.leerFavoritos());
  cantidad = computed(() => this.ids().length);

  constructor() {
    effect(() => {
      localStorage.setItem(this.clave, JSON.stringify(this.ids()));
    });
  }

  esFavorito(id: string): boolean {
    return this.ids().includes(id);
  }

  alternar(id: string) {
    this.ids.update(lista =>
      lista.includes(id) ? lista.filter(item => item !== id) : [...lista, id]
    );
  }

  private leerFavoritos(): string[] {
    const datos = localStorage.getItem(this.clave);
    return datos ? JSON.parse(datos) : [];
  }
}
