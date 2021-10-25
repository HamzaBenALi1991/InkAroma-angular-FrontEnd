import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookComponent } from './component/add-book/add-book.component';
import { SpecificBookComponent } from './component/specific-book/specific-book.component';
import { LibraryComponent } from './library.component';

const routes: Routes = [{
  path: '', component: LibraryComponent, data: {
    title: "Library"
  },children : [
          {
            path: '',
            redirectTo: 'library'
          },
          {
            path: 'addBook',
            component: AddBookComponent,
            data: {
              title: 'AddBook'
            }
          },
          {
            path: 'Book/:id',
            component: SpecificBookComponent,
            data: {
              title: 'Book'
            }
          },
        ]

}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
