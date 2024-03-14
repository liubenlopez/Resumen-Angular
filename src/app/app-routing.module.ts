import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { RoutingComponent } from './pages/routing/routing.component';
import { AboutComponent } from './pages/routing/about/about.component';
import { CursosComponent } from './pages/routing/cursos/cursos.component';
import { QueryParamsComponent } from './pages/routing/query-params/query-params.component';
import { RestringidoComponent } from './pages/routing/restringido/restringido.component';
import { permisosGuard } from './guards/permisos.guard';
import { withoutSaveGuard } from './guards/without-save.guard';
import { HijoComponent } from './pages/routing/restringido/hijo/hijo.component';
import { ResolverComponent } from './pages/routing/resolver-component/resolver.component';
import { DataResolver } from './resolvers/data.resolver';
import { PeticioneshttpComponent } from './pages/peticioneshttp/peticioneshttp.component';
import { ObservablesComponent } from './pages/observables/observables.component';
import { PromesasComponent } from './pages/promesas/promesas.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  {
    path: "enrutamiento", component: RoutingComponent, children: [
      { path: 'developer', component: AboutComponent },
      { path: '', redirectTo: 'developer', pathMatch: 'full' },
      { path: 'curso', component: CursosComponent },
      { path: 'curso/:nombreCurso', component: CursosComponent },
      { path: 'queryparams/:parametro1/:parametro2', component: QueryParamsComponent },
      {
        path: 'restringido', component: RestringidoComponent, canActivate: [permisosGuard], canDeactivate: [withoutSaveGuard], children: [
          { path: 'hijo', component: HijoComponent },
          { path: '', redirectTo: 'hijo', pathMatch: 'full' },
        ]
      },
      { path: 'resolver', component: ResolverComponent, resolve: { departments: DataResolver } }, //Hasta q el resolve no tenga la data el componente no se renderisa
      {
        //Se carga cuando se va a usar
        path: 'lazyload', loadChildren: () => import('./pages/routing/lazy-load/lazyloadmodule.module').then(
          m => m.LazyloadmoduleModule
        )
      },
      { path: '**', component: PageNotFoundComponent }, //Si no machea con ninguna ruta
    ]
  },
  { path: "peticioneshttp", component: PeticioneshttpComponent },
  { path: "observables", component: ObservablesComponent },
  { path: "promesas", component: PromesasComponent },
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: '**', component: PageNotFoundComponent }, //Si no machea con ninguna ruta
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
