import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {  MatInputModule, MatSnackBarModule, MatFormFieldModule } from '@angular/material';

import { FieldErrorDisplayModule } from '../field-error-display/field-error-display.module';

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    FieldErrorDisplayModule
  ]
})
export class ForgotpasswordModule { }
