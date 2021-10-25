import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RomanceComponent } from './romance.component';

const routes: Routes = [{ path: '', component: RomanceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RomanceRoutingModule { }
