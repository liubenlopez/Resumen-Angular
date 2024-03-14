import { Component } from '@angular/core';
import { Ciudad } from 'src/app/interfaces/ciudad';
import { ComunicacionService } from 'src/app/servicios/comunicacion.service';

@Component({
  selector: 'app-componente2',
  templateUrl: './componente2.component.html',
  styleUrls: ['./componente2.component.css']
})
export class Componente2Component {
  ciudades: Ciudad[] = [];
  constructor(private readonly comunicacionSvc: ComunicacionService) {
    comunicacionSvc.SelectedCity$.subscribe(ciudad => this.ciudades.push(ciudad));
  }
}
