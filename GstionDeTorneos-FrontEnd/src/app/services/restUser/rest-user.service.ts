import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { CONNECTION } from '../global'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestUserService {
  public uri:string
  public httpOptions ={
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  public httpOptionsAuth ={
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization' : this.getToken()
    })
  }

  public user;
  public token;
  public hotel;

  private extractData(res: Response){
    let body = res;
    return body || [] || {};
  }

  constructor(private http: HttpClient) { 
    this.uri = CONNECTION.URI;
  }

  getUser(){
    let user = JSON.parse(localStorage.getItem('user'));
    if(user != undefined || user != null){
      this.user = user
    }else{
      this.user = null;
    }
    return this.user;
  }

  getToken(){
    let token = localStorage.getItem('token');
    if(token != undefined || token != null){
      this.token = token;
    }else{
      this.token = null
    }
    return this.token;
  }

  login(user, token){
    user.gettoken = token;
    let params = JSON.stringify(user);
    return this.http.post(this.uri + 'login' , params, this.httpOptions)
      .pipe(map(this.extractData));
  }

  register(user){
    let params = JSON.stringify(user);
    return this.http.post(this.uri + 'register', params, this.httpOptions)
      .pipe(map(this.extractData))
  }

  updateUser(usurioActualizar){
    let params = JSON.stringify(usurioActualizar);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });
    return this.http.put(this.uri + 'updateUser/'+ usurioActualizar._id, params, {headers:headers})
      .pipe(map(this.extractData))
  }

  deleteUser(idUser, password){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });
    return this.http.put(this.uri+'deleteUser/'+idUser, {password: password}, {headers:headers})
      .pipe(map(this.extractData))
  }

  saveUser(user, idAdmin){
    let params = JSON.stringify(user);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });
    return this.http.post(this.uri + 'saveUser/' + idAdmin, params, {headers:headers})
      .pipe(map(this.extractData));
  }

  getUsers(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });
    return this.http.get(this.uri + 'getUsers', {headers:headers})
      .pipe(map(this.extractData))
  }

  adminDeleteUsers(idUser){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });
    return this.http.delete(this.uri + 'adminDeleteUser/'+idUser, {headers:headers})
    .pipe(map(this.extractData))
  }

  adminUpdateUsers(idUser, user){
    let params = JSON.stringify(user);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });
    return this.http.put(this.uri + 'adminUpdateUser/'+idUser,params, {headers:headers})
    .pipe(map(this.extractData))
  }

  verLigas(idUser){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });
    return this.http.get(this.uri + 'getLigas/'+idUser, {headers:headers})
    .pipe(map(this.extractData))
  }

  editarLigasAdmin(idUser, liga){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });
    let params = JSON.stringify(liga);
    return this.http.put(this.uri+idUser+'/updateLigaAdmin/'+liga._id, params, {headers:headers})
    .pipe(map(this.extractData))
  }

  eliminarLigaAdmin(idUser, idLiga){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });
    return this.http.put(this.uri+idUser+'/deleteLigaAdmin/'+idLiga, {headers:headers})
    .pipe(map(this.extractData))
  }
}
