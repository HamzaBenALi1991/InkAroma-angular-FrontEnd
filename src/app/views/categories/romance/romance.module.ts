import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RomanceRoutingModule } from './romance-routing.module';
import { RomanceComponent } from './romance.component';


@NgModule({
  declarations: [
    RomanceComponent
  ],
  imports: [
    CommonModule,
    RomanceRoutingModule
  ]
})
export class RomanceModule { }
