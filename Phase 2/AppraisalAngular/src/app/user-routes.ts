import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';

import { LoginComponent } from './user/login/login.component';
import { GoallistComponent } from './goallist/goallist.component';
import { AuthGuard } from './auth/auth.guard';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { SetpasswordComponent } from './setpassword/setpassword.component';
import { NotFoundComponent } from './not-found/not-found.component';



export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent,canActivate:[AuthGuard] },
   
    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: LoginComponent }]
    },
    { path : '', redirectTo:'/login', pathMatch : 'full'},

    { path: 'form', component: GoallistComponent,canActivate:[AuthGuard] },
    { path: 'forgot', component: ForgotpasswordComponent },
    { path: 'reset/:id', component: SetpasswordComponent },
    {path: '404', component: NotFoundComponent},
    {path: '**', redirectTo: '/404'}
];