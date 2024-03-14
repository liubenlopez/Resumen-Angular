import { Component } from '@angular/core';

@Component({
  selector: 'app-directivas-basicas',
  templateUrl: './directivas-basicas.component.html',
  styleUrls: ['./directivas-basicas.component.css']
})
export class DirectivasBasicasComponent {
  equipo1: string[] = ["Pepe", "Carlos", "Marla", "Tito"];
  equipo2: string[] = ["María", "Robert", "Laura", "Pau"];
  equipoSeleccionado!: string[];
  dia: number = 0;

  seleccionarEquipo(equipo: string) {
    if (equipo == "equipo1") {
      this.equipoSeleccionado = this.equipo1;
    } else {
      this.equipoSeleccionado = this.equipo2;
    }
  }

  validateDay(valor: string): void {
    this.dia = Number(valor);
  }
}
