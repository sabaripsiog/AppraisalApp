import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';

import { LoginComponent } from './user/login/login.component';
import { GoallistComponent } from './goallist/goallist.component';
import { AuthGuard } from './auth/auth.guard';



export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent,canActivate:[AuthGuard] },
   
    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: LoginComponent }]
    },
    { path : '', redirectTo:'/login', pathMatch : 'full'},

    { path: 'form', component: GoallistComponent },
];