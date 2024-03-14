import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-view-child-example',
  templateUrl: './view-child-example.component.html',
  styleUrls: ['./view-child-example.component.css']
})
export class ViewChildExampleComponent {
  //@ViewChild Para obtener elementos de la vista (Sirve para obtener componentes y directivas)
  @ViewChild('formularioViewChild') formularioViewChild!: NgForm;
  @ViewChild(NgModel) primerInputQueEncuentre!: NgModel;
  @ViewChild('input') input!: ElementRef;

  ngAfterViewInit(): void {
    this.primerInputQueEncuentre.valueChanges?.subscribe(res => {
      console.log(res);
    });
  }

  clickContainer(){
    this.input.nativeElement.focus();
    this.input.nativeElement.value = "Valor del input";
  }

  onSubmit(): void {
    console.log('Form values', this.formularioViewChild.value);
  }
}
