import { Component, OnInit } from '@angular/core';
import { Liga } from 'src/app/models/liga';
import { RestLigaService } from 'src/app/services/restLiga/rest-liga.service';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import { Router } from '@angular/router';
import { CONNECTION } from '../../services/global';

@Component({
  selector: 'app-update-liga',
  templateUrl: './update-liga.component.html',
  styleUrls: ['./update-liga.component.css']
})
export class UpdateLigaComponent implements OnInit {
  user;
  liga;
  ligas;
  ligaSelected;
  uri;

  constructor(private restLiga : RestLigaService, private restUser: RestUserService, private route: Router) {
    this.uri = CONNECTION.URI
    this.user = this.restUser.getUser();
    this.liga = JSON.parse(localStorage.getItem('ligaSelected'))
    this.ligaSelected = new Liga('','','','',null,null)
    console.log(this.ligas)
  }

  ngOnInit(): void {
  }

  updateLiga(){
    this.restLiga.updateLiga(this.user._id, this.liga).subscribe((res:any)=>{
      if(res.ligaUpdated){
        alert(res.message);
        localStorage.setItem('user', JSON.stringify(this.user));
        this.route.navigateByUrl('misLigas')
      }else{
        alert(res.message);
        this.restUser.getUser();
        this.user.liga
      }
    })
  }

}
