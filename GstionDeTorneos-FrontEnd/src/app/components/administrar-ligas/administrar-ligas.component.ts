import { Component, OnInit } from '@angular/core';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import { RestLigaService } from 'src/app/services/restLiga/rest-liga.service';
import { Liga } from '../../models/liga';
import { Team } from '../../models/team';
import { Router } from '@angular/router';
import { ResourceLoader } from '@angular/compiler';
import { UploadImageService } from 'src/app/services/uploadImage/upload-image.service';

@Component({
  selector: 'app-administrar-ligas',
  templateUrl: './administrar-ligas.component.html',
  styleUrls: ['./administrar-ligas.component.css']
})
export class AdministrarLigasComponent implements OnInit {

  constructor(private restUser: RestUserService, private restLiga: RestLigaService, private route: Router, private uploadTeam:UploadImageService) { }
  teams;
  team: Team;
  user;
  liga;
  equipo;
  ligaSelected: Liga;
  public filesToUpload:Array<File>;
  public token;
  ngOnInit(): void {
    this.liga = this.restLiga.getLiga();
    this.team = new Team('','','',null,null,null,null,null,[])
    this.ligaSelected =   JSON.parse(localStorage.getItem('ligaSelected'))
    this.teams = localStorage.getItem('teams');
    this.user = this.restUser.getUser();
    console.log(this.teams)
    this.verTeams();
    this.token = this.restUser.getToken();
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

  uploadImage(){
    this.uploadTeam.fileRequestLiga(this.user._id,this.liga._id ,[], this.filesToUpload, this.token, 'image')
      .then((res:any)=>{
        if(res.liga){
          this.liga.image = res.ligaImage;
          localStorage.setItem('ligaSelected', JSON.stringify(this.ligaSelected));
          alert('Imagen de liga subida con exito');
        }else{
          alert(res.message)
        }
      },
      (error:any) => alert(error.error.message)
      )
  }

  fileChange(fileInput){
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload)
  }

  obtenerData(teams){
    this.liga = teams;
    localStorage.setItem('teamSelected',JSON.stringify(teams))
    console.log(teams);
  }
}
