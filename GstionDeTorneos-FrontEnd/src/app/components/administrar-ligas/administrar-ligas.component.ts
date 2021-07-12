import { Component, OnInit } from '@angular/core';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import { RestLigaService } from 'src/app/services/restLiga/rest-liga.service';
import { Liga } from '../../models/liga';
import { Team } from '../../models/team';
import { Router } from '@angular/router';
import { ResourceLoader } from '@angular/compiler';

@Component({
  selector: 'app-administrar-ligas',
  templateUrl: './administrar-ligas.component.html',
  styleUrls: ['./administrar-ligas.component.css']
})
export class AdministrarLigasComponent implements OnInit {

  constructor(private restUser: RestUserService, private restLiga: RestLigaService, private route: Router) { }
  teams;
  team: Team;
  user;
  liga;
  equipo;
  ligaSelected: Liga;
  ngOnInit(): void {
    this.liga = this.restLiga.getLiga();
    this.team = new Team('','','',null,null,null,null,null,[])
    this.ligaSelected =   JSON.parse(localStorage.getItem('ligaSelected'))
    this.teams = localStorage.getItem('teams');
    this.user = this.restUser.getUser();
    console.log(this.teams)
    this.verTeams();
  }

  verTeams(){
    this.restLiga.verTeams(this.user._id, this.liga._id).subscribe((res:any)=>{
      if(res){
        this.teams = res.teams.teams;
        localStorage.setItem('teams', JSON.stringify(this.teams));
        console.log(res.teams.teams)
      }else{
        alert(res.message)
      }
    })
  }
}
