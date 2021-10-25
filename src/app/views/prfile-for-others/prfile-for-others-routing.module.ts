import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrfileForOthersComponent } from './prfile-for-others.component';

const routes: Routes = [{ path: '', component: PrfileForOthersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrfileForOthersRoutingModule { }
