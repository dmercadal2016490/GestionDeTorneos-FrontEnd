import { Component, OnInit } from '@angular/core';
import { RestTeamService } from '../../services/restTeam/rest-team.service';

@Component({
  selector: 'app-components-listar-team',
  templateUrl: './list-team.components.html',
  styleUrls: ['./list-team.component.css']
})
export class ListTeamComponent implements OnInit {
  team:[];
  search2;

  constructor(private restTeam:RestTeamService) { }

  ngOnInit(): void {
    this.listTeam();
  }

  listTeam(){
    this.restTeam.getTeam().subscribe((res:any)=>{
      if(res){
        this.team= res;
      }else{
        alert('No hay Teams');
      }
    },
    error => alert(error.error))
  }
}