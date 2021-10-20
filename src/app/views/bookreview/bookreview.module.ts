import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookreviewRoutingModule } from './bookreview-routing.module';
import { BookreviewComponent } from './bookreview.component';


@NgModule({
  declarations: [
    BookreviewComponent
  ],
  imports: [
    CommonModule,
    BookreviewRoutingModule
  ]
})
export class BookreviewModule { }
