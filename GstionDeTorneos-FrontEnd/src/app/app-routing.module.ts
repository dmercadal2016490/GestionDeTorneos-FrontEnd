import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { UserComponent } from './components/user/user.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { LoggedGuard } from './guards/logged.guard';
import { LoggedOutGuard } from './guards/logged-out.guard';

const routes: Routes = [
  {path:'', component:IndexComponent},
  {path:'index',canActivate:[LoggedOutGuard], component:IndexComponent},
  {path:'login',canActivate:[LoggedOutGuard], component:LoginComponent},
  {path:'register',canActivate:[LoggedOutGuard], component:RegisterComponent}, 
  {path:'principal',canActivate:[LoggedGuard], component:PrincipalComponent},
  {path:'user',canActivate:[LoggedGuard], component:UserComponent},
  {path:'updateUser',canActivate:[LoggedGuard], component:UpdateUserComponent},
  {path:'**', component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
