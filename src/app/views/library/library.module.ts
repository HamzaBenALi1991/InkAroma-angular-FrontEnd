import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibraryRoutingModule } from './library-routing.module';
import { LibraryComponent } from './library.component';
import { AddBookComponent } from './component/add-book/add-book.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SpecificBookComponent } from './component/specific-book/specific-book.component';


@NgModule({
  declarations: [
    LibraryComponent,
    AddBookComponent,
    SpecificBookComponent
  ],
  imports: [
    CommonModule,
    LibraryRoutingModule,
    ReactiveFormsModule
  ]
})
export class LibraryModule { }
