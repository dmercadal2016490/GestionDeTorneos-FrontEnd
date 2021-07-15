//Modulos
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';

//Componentes
import { AppComponent } from './app.component';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { RestUserService } from './services/restUser/rest-user.service';
import { PrincipalComponent } from './components/principal/principal.component';
import { UserComponent } from './components/user/user.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { LigasComponent } from './components/ligas/ligas.component';
import { AdministrarLigasComponent } from './components/administrar-ligas/administrar-ligas.component';
import { AddTeamComponent } from './components/add-team/add-team.component';
import { SaveUserComponent } from './components/save-user/save-user.component';
import { UpdateTeamComponent } from './components/update-team/update-team.component';
import { UpdateLigaComponent } from './components/update-liga/update-liga.component';
import { SaveLigaComponent } from './components/save-liga/save-liga.component';
import { ListUsersComponent } from './components/list-users/list-users.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    LoginComponent,
    NotFoundComponent,
    NavbarComponent,
    RegisterComponent,
    PrincipalComponent,
    UserComponent,
    UpdateUserComponent,
    LigasComponent,
    AdministrarLigasComponent,
    AddTeamComponent,
    SaveUserComponent,
    UpdateTeamComponent,
    UpdateLigaComponent,
    SaveLigaComponent,
    ListUsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [RestUserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
