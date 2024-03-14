import { Component } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent {

  respuesta1!: unknown;
  respuesta2!: unknown;
  respuesta3!: unknown;
  respuesta4!: unknown;

  promesa1 = () => {
    return new Promise((resolve, reject) => {
      setTimeout(function () { //Para demorar la respuesta una poco
        resolve("Promesa cumplida.");
      }, 2000);
    });
  }
  llamarPromesaFulfilled(): void {
    this.respuesta1 = "Pendiente...";
    this.promesa1().then((resp) => {
      this.respuesta1 = resp;
    }).catch((error) => {
    });
  }

  promesa2 = () => {
    return new Promise((resolve, reject) => {
      setTimeout(function () { //Para demorar la respuesta una poco
        reject(new Error("Promesa incumplida, se generó un error."));
      }, 2000);
    });
  }
  llamarPromesaRejected(): void {
    this.respuesta2 = "Pendiente...";
    this.promesa2().then((resp) => {
    }).catch((error) => {
      this.respuesta2 = error.message;
    });
  }

  promesa3 = () => {
    return new Promise(function (resolve, reject) {
      setTimeout(() => resolve(1), 500);
    }).then(function (result) {
      return new Promise(function (resolve, reject) {
        setTimeout(() => resolve(parseInt(String(result)) + 1), 500);
      });
    }).then(function (result) {
      return new Promise(function (resolve, reject) {
        setTimeout(() => resolve(parseInt(String(result)) + 1), 500);
      });
    }).then(function (result) {
      return new Promise(function (resolve, reject) {
        setTimeout(() => resolve(parseInt(String(result)) + 1), 500);
      });
    });
  }
  llamarPromesaEnCadena(): void {
    this.respuesta3 = "Pendiente...";
    this.promesa3().then((resp) => {
      this.respuesta3 = resp;
    }).then().catch((error) => {
      this.respuesta3 = error.message;
    });
  }

  promesa4 = (numb: number) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(numb + 1);
      }, 1000);
    });
  }
  llamarPromesaEnCadena2(): void {
    this.respuesta4 = "Pendiente...";
    this.promesa4(0).then((resp) => {
      this.respuesta4 = resp;
      return this.promesa4(parseInt(String(resp)))
    }).then((resp) => {
      this.respuesta4 = resp;
      return this.promesa4(parseInt(String(resp)))
    }).then((resp) => {
      this.respuesta4 = resp;
      return this.promesa4(parseInt(String(resp)))
    }).then((resp) => {
      this.respuesta4 = resp;
    })
  }

}
