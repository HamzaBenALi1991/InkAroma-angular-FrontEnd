import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetectiveRoutingModule } from './detective-routing.module';
import { DetectiveComponent } from './detective.component';


@NgModule({
  declarations: [
    DetectiveComponent
  ],
  imports: [
    CommonModule,
    DetectiveRoutingModule
  ]
})
export class DetectiveModule { }
