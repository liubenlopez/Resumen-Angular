import { Directive, ElementRef, HostBinding, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appRepetirSubrayado]'
})
export class RepetirSubrayadoDirective {

  constructor(
    private viewContainer: ViewContainerRef,
    private template: TemplateRef<any>,
    private renderer: Renderer2
  ) { }

  @Input() set appRepetirSubrayado(value: number) {
    for (var i = 0; i < value; i++) {
      let embeddedViewRef = this.viewContainer.createEmbeddedView(this.template);
      let rootNode = embeddedViewRef.rootNodes[0] as HTMLElement;
      rootNode.style.backgroundColor = '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
      rootNode.style.padding = '0.5rem';
    }
  }

}
