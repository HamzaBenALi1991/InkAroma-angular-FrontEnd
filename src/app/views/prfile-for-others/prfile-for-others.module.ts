import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrfileForOthersRoutingModule } from './prfile-for-others-routing.module';
import { PrfileForOthersComponent } from './prfile-for-others.component';


@NgModule({
  declarations: [
    PrfileForOthersComponent
  ],
  imports: [
    CommonModule,
    PrfileForOthersRoutingModule
  ]
})
export class PrfileForOthersModule { }
