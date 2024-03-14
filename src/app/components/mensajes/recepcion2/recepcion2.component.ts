import { Component } from '@angular/core';
import { MensajesService } from 'src/app/servicios/mensajes.service';

@Component({
  selector: 'app-recepcion2',
  templateUrl: './recepcion2.component.html',
  styleUrls: ['./recepcion2.component.css']
})
export class Recepcion2Component {
  constructor(public mensajesService: MensajesService) { }

  deleteMessage(index: number) {
    this.mensajesService.removeMessage(index);
  }
}
