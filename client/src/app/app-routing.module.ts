import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent }  from './components/home/home.component';
import { LoginComponent }  from './components/login/login.component';
import { RegisterComponent }  from './components/register/register.component';
import { DashboardComponent }  from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FriendComponent } from './components/friend/friend.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
{ path:'',component:HomeComponent},
{ path:'login',component:LoginComponent},
{ path:'register',component:RegisterComponent},
{ path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
{ path:'profile',component:ProfileComponent,canActivate:[AuthGuard]},
{ path:'friend',component:FriendComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
