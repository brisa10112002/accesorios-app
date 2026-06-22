import { Injectable } from '@angular/core';
import { Accesorio } from '../models/accesorios';

@Injectable({
  providedIn: 'root'
})
export class AccesoriosService {

 private accesorios: Accesorio[] = [
  { id: 1, nombre: 'Cartera de cuero', categoria: 'Carteras', precio: 15000, stock: 8, imagen: 'imagenes/cartera.jpg', descripcion: 'Cartera de cuero genuino con herrajes plateados. Ideal para el día a día.' },
  { id: 2, nombre: 'Cinturón clásico', categoria: 'Cinturones', precio: 4500, stock: 0, imagen: 'imagenes/cinturon.jpg', descripcion: 'Cinturón de cuero negro con hebilla metálica. Un clásico que nunca falla.' },
  { id: 3, nombre: 'Gorra urbana', categoria: 'Gorras', precio: 6000, stock: 12, imagen: 'imagenes/gorra.jpg', descripcion: 'Gorra urbana bordada, talle único con ajuste trasero. Estilo street.' },
  { id: 4, nombre: 'Collar dorado', categoria: 'Bijouterie', precio: 3200, stock: 5, imagen: 'imagenes/collar.jpg', descripcion: 'Collar bañado en oro de 18k, delicado y versátil para cualquier look.' },
  { id: 5, nombre: 'Mochila urbana', categoria: 'Mochilas', precio: 18500, stock: 3, imagen: 'imagenes/mochila.jpg', descripcion: 'Mochila con compartimentos múltiples y correas acolchadas. Práctica y con estilo.' },
  { id: 6, nombre: 'Pulsera tejida', categoria: 'Bijouterie', precio: 2100, stock: 20, imagen: 'imagenes/pulsera.jpg', descripcion: 'Pulsera tejida a mano con cierre de plata. Cada pieza es única.' },
 ];

  retornar(): Accesorio[] {
    return this.accesorios;
  }
}