import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './template/header/header.component';
import { ContainerComponent } from './template/container/container.component';
import { HomeComponent } from './pages/home/home.component';
import { SideBarComponent } from './template/side-bar/side-bar.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ManejoDeClasesCssComponent } from './components/manejo-de-clases-css/manejo-de-clases-css.component';
import { ParentComponent } from './components/input-output-comunication/parent/parent.component';
import { ChildComponent } from './components/input-output-comunication/child/child.component';
import { DirectivasBasicasComponent } from './components/directivas-basicas/directivas-basicas.component';
import { FormulariosBasadosEnPlantillasComponent } from './components/formularios-basados-en-plantillas/formularios-basados-en-plantillas.component';
import { FormulariosReactivosComponent } from './components/formularios-reactivos/formularios-reactivos.component';
import { FormulariosReactivosConFormBuilderComponent } from './components/formularios-reactivos-con-form-builder/formularios-reactivos-con-form-builder.component';
import { EnvioComponent } from './components/mensajes/envio/envio.component';
import { Recepcion1Component } from './components/mensajes/recepcion1/recepcion1.component';
import { Recepcion2Component } from './components/mensajes/recepcion2/recepcion2.component';
import { RoutingModule } from './pages/routing/routing.module';
import { DirectivasPersonalizadasComponent } from './components/directivas-personalizadas/directivas-personalizadas.component';
import { PipesPersonalizadasComponent } from './components/pipes-personalizadas/pipes-personalizadas.component';
import { CustomPipePipe } from './pipes/custom-pipe.pipe';
import { SubrayarDirective } from './directivas/subrayar.directive';
import { RepetirSubrayadoDirective } from './directivas/repetir-subrayado.directive';
import { SubrayarColorRandomDirective } from './directivas/subrayar-color-random.directive';
import { PeticioneshttpComponent } from './pages/peticioneshttp/peticioneshttp.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SpinnerInterceptor } from './interceptores/spinner.interceptor';
import { ViewChildExampleComponent } from './components/view-child-example/view-child-example.component';
import { ObservablesComponent } from './pages/observables/observables.component';
import { PromesasComponent } from './pages/promesas/promesas.component';
import { Componente1Component } from './pages/observables/componente1/componente1.component';
import { Componente2Component } from './pages/observables/componente2/componente2.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContainerComponent,
    HomeComponent,
    SideBarComponent,
    PageNotFoundComponent,
    ManejoDeClasesCssComponent,
    ParentComponent,
    ChildComponent,
    DirectivasBasicasComponent,
    FormulariosBasadosEnPlantillasComponent,
    FormulariosReactivosComponent,
    FormulariosReactivosConFormBuilderComponent,
    EnvioComponent,
    Recepcion1Component,
    Recepcion2Component,
    DirectivasPersonalizadasComponent,
    PipesPersonalizadasComponent,
    CustomPipePipe,
    SubrayarDirective,
    RepetirSubrayadoDirective,
    SubrayarColorRandomDirective,
    PeticioneshttpComponent,
    SpinnerComponent,
    ViewChildExampleComponent,
    ObservablesComponent,
    PromesasComponent,
    Componente1Component,
    Componente2Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true } //Para usar el interceptor de spinner
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
