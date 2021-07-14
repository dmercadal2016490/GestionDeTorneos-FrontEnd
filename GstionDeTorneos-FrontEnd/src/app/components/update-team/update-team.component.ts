import { Component, OnInit } from '@angular/core';
import { Team } from '../../models/team';
import { RestTeamService } from 'src/app/services/restTeam/rest-team.service';
import { RestLigaService } from 'src/app/services/restLiga/rest-liga.service';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import { Router } from '@angular/router'
import { ResourceLoader } from '@angular/compiler';
import { CONNECTION } from '../../services/global';

@Component({
  selector: 'app-update-team',
  templateUrl: './update-team.component.html',
  styleUrls: ['./update-team.component.css']
})
export class UpdateTeamComponent implements OnInit {
  user;
  teamSelected;
  liga;
  team;
  public uri: string;

  constructor(private restUser: RestUserService,private restTeam: RestTeamService, private restLiga: RestLigaService, private route: Router) {
    this.uri = CONNECTION.URI
    this.user = this.restUser.getUser();
    this.team = JSON.parse(localStorage.getItem('teamSelected'));
    this.liga = JSON.parse(localStorage.getItem('ligaSelected'))
    this.teamSelected = new Team('','','',null,null,null,null,null,'',[]);
  }

  ngOnInit(): void {
  }

  updateTeam(){
    this.restTeam.updateTeam(this.user._id, this.liga._id, this.team).subscribe((res: any)=>{
      if(res.teamUpdated){
        alert(res.message);
        localStorage.setItem('teamSelected', JSON.stringify(res.teamUpdated))
        this.route.navigateByUrl('administrarLiga')
      }else{
        alert(res.message)
      }
    },error => console.log(<any>error))
  }

  removeTeam(){
    this.restTeam.deleteTeam(this.user._id, this.liga._id, this.team._id).subscribe((res: any)=>{
      if(res.teamPull){
        alert(res.message)
        localStorage.setItem('ligaSelected', JSON.stringify(res.teamPull));
        localStorage.removeItem('teamSelected')
        this.route.navigateByUrl('administrarLiga')
        this.liga = JSON.parse(localStorage.getItem('teamSelected'));
        this.team = JSON.parse(localStorage.getItem('teamSelected'));

      }else{
        alert(res.message)
      }
    })
  }

}
