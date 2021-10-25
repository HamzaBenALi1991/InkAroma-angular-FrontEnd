import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookreviewRoutingModule } from './bookreview-routing.module';
import { BookreviewComponent } from './bookreview.component';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    BookreviewComponent,
    
  ],
  imports: [
    CommonModule,
    BookreviewRoutingModule,
    ReactiveFormsModule,
    
  ]
  ,
})
export class BookreviewModule { }
