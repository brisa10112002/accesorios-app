import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDestacarStock]'
})
export class DestacarStockDirective {
  constructor(
    private elemento: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {}

  @Input()
  set appDestacarStock(stock: number) {
    const pocoStock = stock <= 3;

    this.renderer.setStyle(this.elemento.nativeElement, 'color', pocoStock ? '#b3261e' : '#aaa');
    this.renderer.setStyle(this.elemento.nativeElement, 'font-weight', pocoStock ? '600' : '400');
  }
}
