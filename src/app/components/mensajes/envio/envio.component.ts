import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MensajesService } from 'src/app/servicios/mensajes.service';

@Component({
  selector: 'app-envio',
  templateUrl: './envio.component.html',
  styleUrls: ['./envio.component.css']
})
export class EnvioComponent {
  mensajeVar: string = "";

  constructor(public mensajesService: MensajesService) { }

  enviarFormulario(formulario: NgForm) {
    console.log(formulario.form.value);
    this.mensajesService.addMessage(this.mensajeVar);
    this.mensajeVar = "";
  }
}
