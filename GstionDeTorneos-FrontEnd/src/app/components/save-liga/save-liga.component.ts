import { Component, OnInit } from '@angular/core';
import { Liga } from 'src/app/models/liga';
import { RestLigaService } from 'src/app/services/restLiga/rest-liga.service';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-save-liga',
  templateUrl: './save-liga.component.html',
  styleUrls: ['./save-liga.component.css']
})
export class SaveLigaComponent implements OnInit {

  liga: Liga;
  public user;
  public token;

  constructor(private restLiga: RestLigaService, private restUser: RestUserService, private route: Router) {
    this.liga = new Liga('','','','',null,null)
  }

  ngOnInit(): void {
    this.user = this.restUser.getUser();
    this.token = this.restUser.getToken();
  }

  onSubmit(form){
    this.restLiga.saveLiga(this.user._id, this.liga).subscribe((res:any)=>{
      if(res.ligaPush){
        alert(res.message)
        form.reset();
        this.user = res.ligaPush;
        localStorage.setItem('user', JSON.stringify(this.user))      
      }else{
        alert(res.message)
      }
    },
    error=> alert(error.error.message))
  }
}
