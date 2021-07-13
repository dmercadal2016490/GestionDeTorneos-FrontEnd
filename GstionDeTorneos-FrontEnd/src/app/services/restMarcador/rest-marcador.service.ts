import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { RestUserService } from '../restUser/rest-user.service';
import { CONNECTION } from '../global';
import { Team } from 'src/app/models/team';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestMarcadorService {
  public uri:string
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  public httpOptionsAuth={
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.restUser.getToken()
    })
  }

  constructor(private http: HttpClient, private restUser: RestUserService) {
    this.uri = CONNECTION.URI;
   }

   private extractData(res:Response){
     let body = res;
     return body || [] || {}
   }

   saveMarcador(idLiga, marcador){
     let headers = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': this.restUser.getToken()
     })
     let params = JSON.stringify(marcador);
     return this.http.put(this.uri+'setMarcador/'+idLiga, params, {headers:headers})
     .pipe(map(this.extractData))
   }
}
