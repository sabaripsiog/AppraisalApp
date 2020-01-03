import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppraisallogComponent } from './appraisallog/appraisallog.component';


const routes: Routes = [
  {path: '*',
  component: AppraisallogComponent
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
