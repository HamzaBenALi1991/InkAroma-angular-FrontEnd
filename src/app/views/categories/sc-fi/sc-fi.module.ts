import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScFiRoutingModule } from './sc-fi-routing.module';
import { ScFiComponent } from './sc-fi.component';


@NgModule({
  declarations: [
    ScFiComponent
  ],
  imports: [
    CommonModule,
    ScFiRoutingModule
  ]
})
export class ScFiModule { }
