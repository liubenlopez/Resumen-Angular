import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-query-params',
  templateUrl: './query-params.component.html',
  styleUrls: ['./query-params.component.css']
})
export class QueryParamsComponent {
  parametro1: string = 'por defecto 0';
  parametro2: string = 'por defecto 0';
  queryparamsexample1: string = 'por defecto';
  queryparamsexample2: string = 'por defecto';

  constructor(private readonly activedRoute: ActivatedRoute, private readonly router: Router ) { }

  ngOnInit(): void {
    //Para los paramatros pasados antes del ?
    this.activedRoute.params.subscribe(
      (params) => {
        console.log(params)
        if (params['parametro1'])
          this.parametro1 = params['parametro1'];
        if (params['parametro2'])
          this.parametro2 = params['parametro2'];
      }
    );
    //Para los paramatros pasados despues del ?
    this.activedRoute.queryParams.subscribe(
      (params) => {
        console.log(params)
        if (params['param1'])
          this.queryparamsexample1 = params['param1'];
        if (params['param2'])
          this.queryparamsexample2 = params['param2'];
      }
    );
  }

  recargarConOtrosDatos(): void {
    this.router.navigate(['enrutamiento/queryparams/', '*11', '*22'], { queryParams: { param1: '*param value 1',  param2: '*param value 2' } });
  }
}
