import { Component, OnInit } from '@angular/core';
import { RestUserService } from '../../services/restUser/rest-user.service'
import { RestTeamService } from 'src/app/services/restTeam/rest-team.service';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router';
import { Team } from 'src/app/models/team';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {

  team;
  user;
  ligaSelected;

  constructor(private restUser: RestUserService, private restTeam: RestTeamService, private route: Router) { }

  ngOnInit(): void {
    this.user = this.restUser.getUser();
    this.team = new Team('','','',null,null,null,null,null,'',[]);
    this.ligaSelected =   JSON.parse(localStorage.getItem('ligaSelected'))
  }

  onSubmit(){
    this.restTeam.saveTeam(this.user._id, this.ligaSelected._id, this.team).subscribe((res:any)=>{
      if(res.aumento){
        alert(res.message)
        this.ligaSelected = res.aumento
        localStorage.setItem('ligaSelected', JSON.stringify(this.ligaSelected));
        this.route.navigateByUrl('administrarLiga');
      }else{
        alert(res.message)
      }
    },error=> alert(error.error.message))

  }

}
