import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-principal',
  imports: [RouterLink],
  templateUrl: './principal.html',
  styleUrl: './principal.css'
})
export class Principal {
  categorias = [
    { nombre: 'Carteras', imagen: 'imagenes/cartera.jpg' },
    { nombre: 'Cinturones', imagen: 'imagenes/cinturon.jpg' },
    { nombre: 'Gorras', imagen: 'imagenes/gorra.jpg' },
    { nombre: 'Bijouterie', imagen: 'imagenes/collar.jpg' },
    { nombre: 'Mochilas', imagen: 'imagenes/mochila.jpg' }
  ];
}
