import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  constructor() { }

  private messages: string[] = [];

  addMessage(message: string) {
    this.messages.push(message);
  }

  removeMessage(index: number) {
    this.messages = this.messages.filter((message, ind) => ind != index);
    console.log(this.messages)
  }

  getMessages() {
    return this.messages;
  }

}
