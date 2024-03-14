import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingComponent } from './routing.component';
import { CursosComponent } from './cursos/cursos.component';
import { AboutComponent } from './about/about.component';
import { RouterModule } from '@angular/router';
import { QueryParamsComponent } from './query-params/query-params.component';
import { RestringidoComponent } from './restringido/restringido.component';
import { HijoComponent } from './restringido/hijo/hijo.component';
import { ResolverComponent } from './resolver-component/resolver.component';



@NgModule({
  declarations: [
    RoutingComponent,
    CursosComponent,
    AboutComponent,
    QueryParamsComponent,
    RestringidoComponent,
    HijoComponent,
    ResolverComponent
  ],
  imports: [
    CommonModule,
    RouterModule, //Para que funcione el router-outlet en el componente tiene que agregarse el RouterModule 
  ],
  exports: [
    RoutingComponent //Para uso compartido del componente hay que exportarlo
  ]
})
export class RoutingModule { }
