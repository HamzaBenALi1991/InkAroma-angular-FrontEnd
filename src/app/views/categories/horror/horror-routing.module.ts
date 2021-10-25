import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HorrorComponent } from './horror.component';

const routes: Routes = [{ path: '', component: HorrorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HorrorRoutingModule { }
