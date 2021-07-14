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
import { AdminGuard } from './guards/admin-guard.guard';
import { LigasComponent } from './components/ligas/ligas.component';
import { AdministrarLigasComponent } from './components/administrar-ligas/administrar-ligas.component';
import { AddTeamComponent } from './components/add-team/add-team.component';
import { SaveUserComponent } from './components/save-user/save-user.component';
import { UpdateTeamComponent } from './components/update-team/update-team.component';
import { UpdateLigaComponent } from './components/update-liga/update-liga.component';
import { SaveLigaComponent } from './components/save-liga/save-liga.component';

const routes: Routes = [
  {path:'', component:IndexComponent},
  {path:'index',canActivate:[LoggedOutGuard], component:IndexComponent},
  {path:'login',canActivate:[LoggedOutGuard], component:LoginComponent},
  {path:'register',canActivate:[LoggedOutGuard], component:RegisterComponent}, 
  {path:'principal',canActivate:[LoggedGuard], component:PrincipalComponent},
  {path:'user',canActivate:[LoggedGuard], component:UserComponent},
  {path:'updateUser',canActivate:[LoggedGuard], component:UpdateUserComponent},
  {path: 'misLigas', canActivate: [LoggedGuard], component: LigasComponent},
  {path: 'administrarLiga', canActivate: [LoggedGuard], component: AdministrarLigasComponent},
  {path: 'addTeam', canActivate:[LoggedGuard], component: AddTeamComponent},
  {path: 'addLiga', canActivate: [LoggedGuard], component: SaveLigaComponent},
  {path: 'saveUser', canActivate:[AdminGuard], component:SaveUserComponent},
  {path: 'updateTeam', canActivate:[LoggedGuard], component: UpdateTeamComponent},
  {path: 'updateLiga', canActivate: [LoggedGuard], component: UpdateLigaComponent},
  {path:'**', component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
