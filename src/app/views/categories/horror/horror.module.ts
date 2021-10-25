import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HorrorRoutingModule } from './horror-routing.module';
import { HorrorComponent } from './horror.component';


@NgModule({
  declarations: [
    HorrorComponent
  ],
  imports: [
    CommonModule,
    HorrorRoutingModule
  ]
})
export class HorrorModule { }
