import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetectiveComponent } from './detective.component';

const routes: Routes = [{ path: '', component: DetectiveComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetectiveRoutingModule { }
