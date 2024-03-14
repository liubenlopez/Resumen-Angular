import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { Ciudad } from '../interfaces/ciudad';

const initCity: Ciudad = {
  _id: '1',
  name: 'Washington D.C.'
}

@Injectable({
  providedIn: 'root'
})
export class ComunicacionService {
  private ciudad$ = new BehaviorSubject<Ciudad>(initCity);

  constructor() { }

  get SelectedCity$(): Observable<Ciudad> {
    return this.ciudad$.asObservable();
  }

  setCity(city: Ciudad): void {
    this.ciudad$.next(city);
  }

}
