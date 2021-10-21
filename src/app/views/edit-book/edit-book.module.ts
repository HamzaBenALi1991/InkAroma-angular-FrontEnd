import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditBookRoutingModule } from './edit-book-routing.module';
import { EditBookComponent } from './edit-book.component';


@NgModule({
  declarations: [
    EditBookComponent
  ],
  imports: [
    CommonModule,
    EditBookRoutingModule
  ]
})
export class EditBookModule { }
