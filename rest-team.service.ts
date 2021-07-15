import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { RestUserService } from '../restUser/rest-user.service';
import { CONNECTION } from '../global'
import { Router } from '@angular/router';
import { Team } from 'src/app/models/team';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestTeamService {

  public team;

  public uri:string
  public httpOptions ={
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  public httpOptionsAuth ={
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization' : this.restUser.getToken()
    })
  }

  constructor(private http: HttpClient, private restUser: RestUserService) { 
    this.uri = CONNECTION.URI;
  }

  private extractData(res:Response){
    let body = res;
    return body || [] || {}
  }

  saveTeam(idUser, idLiga, team){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.restUser.getToken()
    })
    let params = JSON.stringify(team);
    return this.http.put(this.uri+idUser+'/saveTeam/'+idLiga, params, {headers:headers})
    .pipe(map(this.extractData))
  }

  updateTeam(idUser, idLiga, team){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.restUser.getToken()
    })
    let params = JSON.stringify(team);
    return this.http.put(this.uri+idUser+'/updateTeam/'+idLiga+'/'+team._id, params, {headers: headers})
    .pipe(map(this.extractData))
  }

  deleteTeam(idUser, idLiga, idTeam){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.restUser.getToken()
    })
    return this.http.put(this.uri+idUser+'/deleteTeam/'+idLiga+'/'+idTeam, null, {headers: headers})
    .pipe(map(this.extractData))
  }
  getTeam(){
    let team = JSON.parse(localStorage.getItem('teamSelected'));
    if(team != undefined || team != null){
      this.team = team
    }else{
      this.team = null;
    }
    return this.http.get(this.uri + 'team/')
    .pipe(map(this.extractData))
  }
  
}
