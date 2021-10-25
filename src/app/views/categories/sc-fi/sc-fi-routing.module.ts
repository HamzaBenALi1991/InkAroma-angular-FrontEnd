import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScFiComponent } from './sc-fi.component';

const routes: Routes = [{ path: '', component: ScFiComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScFiRoutingModule { }
