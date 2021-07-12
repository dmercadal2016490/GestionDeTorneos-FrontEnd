import { Component, OnInit } from '@angular/core';
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
export class LigasComponent implements OnInit {
  ligas;
  user;
  liga: Liga;
  public uri:string;

  constructor(private restUser: RestUserService, private restLiga: RestLigaService, private route: Router) {
    this.uri = CONNECTION.URI
  }

  ngOnInit(): void {
    this.liga = new Liga('','','','',null,null)
    this.user = this.restUser.getUser();
    this.ligas = this.user.ligas;
    console.log(this.user._id)
  }

  onSubmit(){
    this.restLiga.saveLiga(this.user._id, this.liga).subscribe((res:any)=>{
      if(res.ligaPush){
        alert(res.message)
        this.user = res.ligaPush
        localStorage.setItem('user', JSON.stringify(this.user));
        this.route.navigateByUrl('misLigas');
      }else{
        alert(res.message)
      }
    },error=> alert(error.error.message))
  }

  obtenerData(liga){
    this.liga = liga;
    localStorage.setItem('ligaSelected',JSON.stringify(liga))
    console.log(liga);
    this.route.navigateByUrl('administrarLiga')
  }
}
