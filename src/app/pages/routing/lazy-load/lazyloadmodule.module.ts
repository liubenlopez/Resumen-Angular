import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyLoadComponent } from './lazy-load.component';
import { LazyloadmoduleRoutingModule } from './lazyloadmodule-routing.module';

@NgModule({
  declarations: [
    LazyLoadComponent
  ],
  imports: [
    CommonModule,
    LazyloadmoduleRoutingModule
  ]
})
export class LazyloadmoduleModule { }
