import { Directive, ElementRef, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appSubrayarColorRandom]'
})
export class SubrayarColorRandomDirective {

  constructor(private el: ElementRef) { }

  @HostBinding('style.backgroundColor') bgColor!: string;
  @HostBinding('style.padding') padding: string = '0.5rem';

  @Input() set appSubrayarColorRandom(value: string) {
    this.bgColor = '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
    // this.el.nativeElement.style.backgroundColor = '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
  }

}
