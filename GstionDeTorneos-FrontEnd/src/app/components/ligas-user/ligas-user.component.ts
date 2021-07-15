import { Component, OnInit } from '@angular/core';
import { Liga } from 'src/app/models/liga';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import { User } from 'src/app/models/user';
import { CONNECTION } from '../../services/global';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ligas-user',
  templateUrl: './ligas-user.component.html',
  styleUrls: ['./ligas-user.component.css']
})
export class LigasUserComponent implements OnInit {
  user;
  users;
  liga: Liga;
  ligas;
  userSelected;


  constructor(private restUser: RestUserService, private route: Router) { }

  ngOnInit(): void {
    this.liga = new Liga('','','','',null,null)
    this.ligas = JSON.parse(localStorage.getItem('ligas'))
    this.userSelected = JSON.parse(localStorage.getItem('userSelected'))
    this.verLigas();
  }

  verLigas(){
    this.restUser.verLigas(this.userSelected._id).subscribe((res:any)=>{
      if(res.ligas){
        localStorage.setItem('ligas', JSON.stringify(res.ligas.ligas));
      }else{
        alert(res.message)
      }
    })
  }

  updateLigas(){
    this.restUser.editarLigasAdmin(this.userSelected._id, this.liga).subscribe((res: any)=>{
      if(res.ligaUpdated){
        alert(res.message);
        localStorage.setItem('ligaSelected', JSON.stringify(this.ligas))
        localStorage.setItem('ligas', JSON.stringify(this.ligas))
        this.route.navigateByUrl('verLigas')
      }else{
        alert(res.message)
      }
    })
  }

  eliminarLigas(){
    this.restUser.eliminarLigaAdmin(this.userSelected._id, this.liga._id).subscribe((res:any)=>{
      if(res.ligaPull){
        alert(res.message)
        this.ligas = res.ligas;
        localStorage.setItem('userSelected', JSON.stringify(res.ligaPull));
        localStorage.removeItem('ligaSelected')
        this.route.navigateByUrl('principal')
        console.log(res.ligas)
      }else{
        alert(res.message)
      }
    },error => console.log(<any>error))
  }

  obtenerData(selectedLiga){
    this.liga = selectedLiga;
    localStorage.setItem('ligaSelected',JSON.stringify(selectedLiga))
    console.log(selectedLiga);
  }

}
