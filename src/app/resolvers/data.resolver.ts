import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Observable, of } from "rxjs";

const departments = ['Marketing', 'Sales', 'Other'];

@Injectable({
  providedIn: 'root'
})
export class DataResolver implements Resolve<any> {
  resolve(): Observable<any> {
    // TODO: call from a service
    return of(departments);//of te combierte el arreglo en un Observable
  }
}

