import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AccesoriosService } from '../../shared/services/accesorios';
import { FavoritosService } from '../../shared/services/favoritos';
import { Accesorio } from '../../shared/models/accesorios';

@Component({
  selector: 'app-favoritos',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './favoritos.html',
  styleUrl: './favoritos.css'
})
export class Favoritos implements OnInit {
  private accesoriosService = inject(AccesoriosService);
  favoritosService = inject(FavoritosService);

  todos = signal<Accesorio[]>([]);
  cargando = signal(true);
  error = signal(false);

  accesorios = computed(() => this.todos().filter(a => this.favoritosService.esFavorito(a.id)));

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
}
