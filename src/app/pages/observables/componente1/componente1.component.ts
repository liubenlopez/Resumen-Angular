import { Component } from '@angular/core';
import { Ciudad } from 'src/app/interfaces/ciudad';
import { ComunicacionService } from 'src/app/servicios/comunicacion.service';

@Component({
  selector: 'app-componente1',
  templateUrl: './componente1.component.html',
  styleUrls: ['./componente1.component.css']
})
export class Componente1Component {
  contador: number = 0;
  interval: any;
  ciudades: Ciudad[] = [
    { _id: '2', name: 'Madrid' },
    { _id: '3', name: 'Berlin' },
    { _id: '4', name: 'París' },
    { _id: '5', name: 'La Habana' },
    { _id: '6', name: 'Lima' },
    { _id: '7', name: 'Santo Domingo' },
    { _id: '8', name: 'Buenos Aires' },
    { _id: '9', name: 'Montevideo' },
    { _id: '10', name: 'Santiago de Chile' },
  ];

  constructor(private readonly comunicacionSvc: ComunicacionService) { }

  iniciarEnvio(): void {
    this.interval = setInterval(() => {
      if (this.contador == this.ciudades.length) {
        clearInterval(this.interval);
        this.contador = 0;
      } else {
        this.comunicacionSvc.setCity(this.ciudades[this.contador]);
        this.contador++;
      }
    }, 1000);
  }
}
