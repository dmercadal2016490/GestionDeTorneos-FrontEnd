import { Component, OnInit, DoCheck } from '@angular/core';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import { RestLigaService } from 'src/app/services/restLiga/rest-liga.service';
import { Liga } from '../../models/liga'
import { Router } from '@angular/router';
import { ResourceLoader } from '@angular/compiler';
import { CONNECTION } from '../../services/global';

@Component({
  selector: 'app-ligas',
  templateUrl: './ligas.component.html',
  styleUrls: ['./ligas.component.css']
})
export class LigasComponent implements OnInit, DoCheck {
  ligas;
  user;
  liga: Liga;
  ligaSelected;
  public uri:string;

  constructor(private restUser: RestUserService, private restLiga: RestLigaService, private route: Router) {
    this.uri = CONNECTION.URI
  }

  ngOnInit(): void {
    this.liga = new Liga('','','','',null,null)
    this.user = this.restUser.getUser();
    this.ligas = this.user.ligas;
  }

  ngDoCheck(){
    this.restLiga.getLiga();
    this.restUser.getUser();
  }

  onSubmit(){
    this.restLiga.saveLiga(this.user._id, this.liga).subscribe((res:any)=>{
      if(res.ligaPush){
        alert(res.message)
        localStorage.setItem('user', JSON.stringify(res.ligaPush));
        this.route.navigateByUrl('misLigas');
      }else{
        alert(res.message)
      }
    },error=> alert(error.error.message))
  }

  obtenerData(liga){
    this.liga = liga;
  }

  obtenerDatos(liga){
    this.liga = liga;
    localStorage.setItem('ligaSelected', JSON.stringify(this.liga))
  }

  updateLiga(){
    this.restLiga.updateLiga(this.user._id, this.liga).subscribe((res:any)=>{
      if(res.ligaUpdated){
        alert(res.message);
        localStorage.setItem('user', JSON.stringify(this.user));
        this.route.navigateByUrl('misLigas')
      }else{
        alert(res.message);
      }
    })
  }

  removeLiga(){
    this.restLiga.deleteLiga(this.user._id, this.liga._id).subscribe((res:any)=>{
      if(res.ligaPull){
        alert(res.message);
        localStorage.setItem('user', JSON.stringify(res.ligaPull));
        this.user = this.restUser.getUser();
        this.ligas = this.user.ligas;
      }else{
        alert(res.message)
      }
    },error => alert(error.error.message))
  }
}
