import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DramaRoutingModule } from './drama-routing.module';
import { DramaComponent } from './drama.component';


@NgModule({
  declarations: [
    DramaComponent
  ],
  imports: [
    CommonModule,
    DramaRoutingModule
  ]
})
export class DramaModule { }
