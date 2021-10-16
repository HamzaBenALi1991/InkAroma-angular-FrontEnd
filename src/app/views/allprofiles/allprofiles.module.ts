import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllprofilesRoutingModule } from './allprofiles-routing.module';
import { AllprofilesComponent } from './allprofiles.component';


@NgModule({
  declarations: [
    AllprofilesComponent
  ],
  imports: [
    CommonModule,
    AllprofilesRoutingModule
  ]
})
export class AllprofilesModule { }
