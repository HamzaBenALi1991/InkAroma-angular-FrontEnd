import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FantasyRoutingModule } from './fantasy-routing.module';
import { FantasyComponent } from './fantasy.component';


@NgModule({
  declarations: [
    FantasyComponent
  ],
  imports: [
    CommonModule,
    FantasyRoutingModule
  ]
})
export class FantasyModule { }
