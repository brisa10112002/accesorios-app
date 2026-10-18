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

  preguntas = [
    { pregunta: '¿Hacen envíos?', respuesta: 'Sí, enviamos a todo el país. Al finalizar la compra elegís tu provincia y localidad.' },
    { pregunta: '¿Cuáles son los medios de pago?', respuesta: 'Podés pagar en 3 cuotas sin interés con tarjeta de crédito, o con débito y transferencia.' },
    { pregunta: '¿Puedo cambiar un producto?', respuesta: 'Sí, escribinos por WhatsApp o Instagram y coordinamos el cambio. El producto tiene que estar sin uso.' },
    { pregunta: '¿Cómo cuido mi bijouterie?', respuesta: 'Evitá el contacto con agua, perfume y cremas, y guardala en un lugar seco, separada de otras piezas.' }
  ];
}
