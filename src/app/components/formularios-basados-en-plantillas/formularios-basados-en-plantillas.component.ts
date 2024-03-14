import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Persona } from 'src/app/interfaces/persona';

@Component({
  selector: 'app-formularios-basados-en-plantillas',
  templateUrl: './formularios-basados-en-plantillas.component.html',
  styleUrls: ['./formularios-basados-en-plantillas.component.css']
})
export class FormulariosBasadosEnPlantillasComponent {
  persona: Persona = {
    nombre: "",
    edad: 0
  }

  enviarFormulario(formulario: NgForm) {
    console.log(formulario.form.value);
    alert(JSON.stringify(formulario.form.value));
  }
}
