import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appSubrayar]'
})
export class SubrayarDirective {

  @HostBinding('style.backgroundColor') bgColor: string | null = '#bce3ff';
  @HostBinding('style.padding') padding: string | null = '0.5rem';

  @Input() set appSubrayar(value: string) {
    this.bgColor = value || '#bce3ff';
  }


  @HostListener('mouseleave')
  onMouseLeave() {
    this.bgColor = "#ffffbc";
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.bgColor = "yellow";
  }

  constructor() {

  }

}
