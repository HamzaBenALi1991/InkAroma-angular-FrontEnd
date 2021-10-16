import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllprofilesComponent } from './allprofiles.component';

const routes: Routes = [{ path: '', component: AllprofilesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllprofilesRoutingModule { }
