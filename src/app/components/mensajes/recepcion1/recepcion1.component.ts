import { Component } from '@angular/core';
import { MensajesService } from 'src/app/servicios/mensajes.service';

@Component({
  selector: 'app-recepcion1',
  templateUrl: './recepcion1.component.html',
  styleUrls: ['./recepcion1.component.css']
})
export class Recepcion1Component {

  mensajes!: string[];

  constructor(public mensajesService: MensajesService) {
  }

  getMessages(): string[] {
    this.mensajes = this.mensajesService.getMessages();
    return this.mensajes;
  }

  deleteMessage(index: number) {
    this.mensajesService.removeMessage(index);
  }

}
