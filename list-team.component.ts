import { Component, OnInit } from '@angular/core';
import { RestTeamService } from '../../services/restTeam/rest-team.service';
import { Team } from 'src/app/models/team';


@Component({
  selector: 'app-list-Team',
  templateUrl: './list-team.component.html',
  styleUrls: ['./list-team.component.css']
})
export class ListTeamComponent implements OnInit {
  teams;
  teamSelected:Team;
  search2;
  team:Team;

  constructor(private restTeam:RestTeamService) {
    this.team = new Team('','','','','','','','','',[]);
  }

  ngOnInit(): void {
    this.listTeams()
    this.teams = localStorage.getItem('teams');
    this.teamSelected = JSON.parse(localStorage.getItem('teamSelected'));
  }

  listTeams(){
    this.restTeam.getTeam().subscribe((res:any)=>{
      if(res){
        this.teams = res.team;
        localStorage.setItem('teams', JSON.stringify(this.teams));
        alert(res.message)
      }else{
        alert(res.message)
      }
    },
    (error:any) => alert(error.error.message)
    )
  }

  obetenerData(selectedUser){
    this.team = selectedUser;
    localStorage.setItem('teamSelected', JSON.stringify(selectedUser)) ;
  }

  borrarData(){
    localStorage.removeItem('teamSelected');
  }
}