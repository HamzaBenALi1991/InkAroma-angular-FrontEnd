import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// Routing
import { ValidationFormsRoutingModule } from './validation-forms-routing.module';

import { ValidationFormsComponent } from './validation-forms.component';

@NgModule({
  declarations: [
    ValidationFormsComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ValidationFormsRoutingModule
  ],
  providers: [],
  bootstrap: [ValidationFormsComponent]
})
export class ValidationFormsModule { }
