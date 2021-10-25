import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FantasyComponent } from './fantasy.component';

const routes: Routes = [{ path: '', component: FantasyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FantasyRoutingModule { }
