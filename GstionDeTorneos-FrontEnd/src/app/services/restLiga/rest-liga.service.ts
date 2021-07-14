import { Injectable } from '@angular/core';
import { RestUserService } from '../restUser/rest-user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { CONNECTION } from '../global'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestLigaService {

  public token;
  public liga;

  public uri:string
  public httpOptions ={
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  private extractData(res:Response){
    let body = res;
    return body || [] || {}
  }

  constructor(private http: HttpClient, private restUser: RestUserService) { 
    this.uri = CONNECTION.URI;
  }

  saveLiga(idUser, liga){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.restUser.getToken()
    })
    let params = JSON.stringify(liga);
    return this.http.post(this.uri+'createLiga/'+idUser, params, {headers:headers})
    .pipe(map(this.extractData))
  }

  getLiga(){
    let liga = JSON.parse(localStorage.getItem('ligaSelected'));
    if(liga != undefined || liga != null){
      this.liga = liga
    }else{
      this.liga = null;
    }
    return this.liga;
  }

  verTeams(idUser, idLiga){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.restUser.getToken()
    })
    return this.http.get(this.uri+idUser+'/verTeams/'+idLiga, {headers:headers})
    .pipe(map(this.extractData))
  }

  updateLiga(idUser, liga){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.restUser.getToken()
    })
    let params = JSON.stringify(liga);
    return this.http.put(this.uri+idUser+'/updateLiga/'+liga._id, params,{headers:headers})
    .pipe(map(this.extractData))
  }

  deleteLiga(idUser, idLiga){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.restUser.getToken()
    })
    return this.http.put(this.uri+idUser+'/deleteLiga/'+idLiga,null,{headers:headers})
    .pipe(map(this.extractData))
  }
}
