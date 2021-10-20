import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookreviewComponent } from './bookreview.component';

const routes: Routes = [
  {
    path: '', component: BookreviewComponent, data: {
      title: 'Book-Review'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookreviewRoutingModule { }
