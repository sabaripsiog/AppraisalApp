import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotpasswordComponent } from './forgotpassword.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'forgotPassword',
    component: ForgotpasswordComponent,
    data: { showHeader: true, showNavbar: false, showWelcomeCard: false }
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgotpasswordRoutingModule { }
