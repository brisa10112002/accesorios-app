import { Component, inject } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CarritoService } from './shared/services/carrito';
import { AuthService } from './shared/services/auth';
import { FavoritosService } from './shared/services/favoritos';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'accesorios-app';
  carritoService = inject(CarritoService);
  authService = inject(AuthService);
  favoritosService = inject(FavoritosService);
  private router = inject(Router);

  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['/principal']);
  }
}
