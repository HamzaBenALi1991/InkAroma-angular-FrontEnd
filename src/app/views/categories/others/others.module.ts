import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OthersRoutingModule } from './others-routing.module';
import { OthersComponent } from './others.component';


@NgModule({
  declarations: [
    OthersComponent
  ],
  imports: [
    CommonModule,
    OthersRoutingModule
  ]
})
export class OthersModule { }
