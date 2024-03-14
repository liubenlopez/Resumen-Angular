import { Component } from '@angular/core';

@Component({
  selector: 'app-pipes-personalizadas',
  templateUrl: './pipes-personalizadas.component.html',
  styleUrls: ['./pipes-personalizadas.component.css']
})
export class PipesPersonalizadasComponent {
  ciudades: string[] = ['Washington D. C.', 'Madrid', 'Berlin']
  selection: string = '';
  textToPipe: string = 'Texto a transformar en mayúscula';
  filter: string = '';
  tienePermiso: boolean = false;
}
