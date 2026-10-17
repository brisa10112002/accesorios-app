import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoStock'
})
export class EstadoStockPipe implements PipeTransform {
  transform(stock: number, minimo: number = 3): string {
    if (stock === 0) {
      return 'Sin stock';
    }

    if (stock === 1) {
      return '¡Última unidad!';
    }

    if (stock <= minimo) {
      return `¡Últimas ${stock} unidades!`;
    }

    return `${stock} unidades disponibles`;
  }
}
