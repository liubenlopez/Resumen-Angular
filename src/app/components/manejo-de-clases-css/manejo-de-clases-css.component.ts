import { Component } from '@angular/core';

@Component({
  selector: 'app-manejo-de-clases-css',
  templateUrl: './manejo-de-clases-css.component.html',
  styleUrls: ['./manejo-de-clases-css.component.css']
})
export class ManejoDeClasesCssComponent {
  text_color: string = "text-danger";
  buttom_disabled: boolean = false;
  source: string = "../../../assets/images/vivaldi.png"
}
