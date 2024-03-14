import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ciudad } from 'src/app/interfaces/ciudad';
import { CiudadService } from 'src/app/servicios/ciudad.service';

@Component({
  selector: 'app-peticioneshttp',
  templateUrl: './peticioneshttp.component.html',
  styleUrls: ['./peticioneshttp.component.css']
})
export class PeticioneshttpComponent {
  spinnerClosed: boolean = false;
  endpointChecked: boolean = false;
  pasosParaGenerarEndpoint: boolean = true;
  endpoint: string = "";
  cargando: boolean = false;
  ciudad: Ciudad = { _id: '', name: '' };
  ciudades: Ciudad[] = [];
  ciudadGetted!: Ciudad[] | undefined;

  constructor(private readonly ciudadService: CiudadService) { }

  ngOnInit(): void {
    this.obtenerAPI();
    this.ciudadService.setAPI(this.endpoint);
    this.verificarEndpointCiudades(false);
  }

  verificarEndpoint(): void {
    this.ciudadService.setAPI(this.endpoint);
    this.verificarEndpointCiudades(true);
  }

  verificarEndpointCiudades(poblar: boolean) {
    this.ciudadService.obtenerCiudades().subscribe({
      next: ciudadesRespuesta => {
        this.guardarAPI();
        this.ciudades = [...ciudadesRespuesta];
        console.log('Cargado: ', this.ciudades);
        if (this.ciudades.length == 0 && poblar) {
          this.poblarDB()
            .then(responses => {
              console.log('Completo: ', responses);
              this.pasosParaGenerarEndpoint = false;
            })
            .catch(error => {
              console.log('Error: ', error);
            });
        }
        if (this.ciudades.length > 0) {
          this.pasosParaGenerarEndpoint = false;
        }
      },
      error: error => {
        console.error('Error:', error);
        if (poblar)
          alert("Verifique que realizó correctamente los pasos para obtener el Endpoint.");
        this.endpointChecked = true;
      },
      complete: () => {
        console.log('Complete');
        this.endpointChecked = true;
      }
    });
  }

  cargarCiudades() {
    this.endpointChecked = false;
    this.ciudadService.obtenerCiudades().subscribe({
      next: ciudadesRespuesta => {
        this.ciudades = [...ciudadesRespuesta];
        console.log('Cargado: ', this.ciudades);
      },
      error: error => {
        console.error('Error:', error);
        this.endpointChecked = true;
      },
      complete: () => {
        console.log('Complete');
        this.endpointChecked = true;
      }
    });
  }

  poblarDB(): Promise<any[]> {
    const ciudades = [
      { _id: '1', name: 'Washington D.C.' },
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
    //Promise.all es un método en JavaScript que toma un iterable de Promesas como entrada y devuelve una única Promesa 
    //que se resuelve en una matriz de los resultados de las Promesas de entrada, en el mismo orden en que se pasaron.
    //método es útil cuando desee esperar a que se completen varias operaciones asincrónicas antes de continuar con el 
    //siguiente paso de su código.
    return Promise.all(ciudades.map(ciudad => this.ciudadService.agregarCiudad(ciudad.name).subscribe(
      ciudadRespuesta => {
        console.log('Agregada: ', ciudadRespuesta);
        this.ciudades.push(ciudadRespuesta);
      }
    )));
  }

  guardarAPI(): void {
    localStorage.setItem("apiendpoint", this.endpoint);
  }

  obtenerAPI(): void {
    const apiendpoint = localStorage.getItem("apiendpoint");
    if (apiendpoint) {
      this.endpoint = apiendpoint;
    }
  }

  agregarCiudad() {
    if (this.ciudad._id == '') {
      this.ciudadService.agregarCiudad(this.ciudad.name).subscribe(ciudadRespuesta => {
        this.ciudades.push(ciudadRespuesta);
        this.ciudad = { _id: '', name: '' };
        console.log('Agregada: ', this.ciudades);
      });
    } else {
      this.ciudadService.actualizarCiudad(this.ciudad).subscribe(() => {
        const ciudadesTemp = this.ciudades.filter(c => c._id != this.ciudad._id);
        this.ciudades = [...ciudadesTemp, this.ciudad];
        this.ciudad = { _id: '', name: '' };
        console.log('Actualizada: ', this.ciudades);
      });
    }
  }

  obtenerCiudad(id: string): void {
    this.ciudadService.obtenerCiudad(id).subscribe(ciudadRespuesta => {
      this.ciudadGetted = ciudadRespuesta;
      console.log('Seleccionada', ciudadRespuesta);
    });
  }

  seleccionarCiudad(ciudad: Ciudad): void {
    this.ciudad = ciudad;
  }

  eliminarCiudad(ciudadId: string): void {
    if (confirm("Seguro que decea eliminar esta ciudad?")) {
      this.ciudadService.eliminarCiudad(ciudadId).subscribe(() => {
        this.ciudades = this.ciudades.filter(c => c._id != ciudadId);
        console.log('Eliminada: ', this.ciudades);
      });
    }
  }

  closeCiudadGetted(): void {
    this.ciudadGetted = undefined;
  }

}
