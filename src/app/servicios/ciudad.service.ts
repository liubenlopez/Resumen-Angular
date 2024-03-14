import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ciudad } from '../interfaces/ciudad';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {
  private API: string = ''
  constructor(private readonly http: HttpClient) { }

  setAPI(api: string) {
    this.API = api + "/ciudades";
  }

  agregarCiudad(ciudadNombre: string): Observable<Ciudad> {
    const body = { name: ciudadNombre };
    return this.http.post<Ciudad>(this.API, body);
  }

  obtenerCiudades(): Observable<Ciudad[]> {
    return this.http.get<Ciudad[]>(this.API);
  }

  obtenerCiudad(id: string): Observable<Ciudad[]> {
    return this.http.get<Ciudad[]>(`${this.API}/${id}`);
  }

  actualizarCiudad(ciudad: Ciudad): Observable<void> {
    const body = { name: ciudad.name };
    return this.http.put<void>(`${this.API}/${ciudad._id}`, body);
  }

  eliminarCiudad(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }

}
