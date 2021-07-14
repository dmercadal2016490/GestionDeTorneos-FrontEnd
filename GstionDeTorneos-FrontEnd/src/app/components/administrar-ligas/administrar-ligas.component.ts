import { Component, OnInit, DoCheck } from '@angular/core';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import { RestLigaService } from 'src/app/services/restLiga/rest-liga.service';
import { RestMarcadorService } from 'src/app/services/restMarcador/rest-marcador.service';
import { Liga } from '../../models/liga';
import { Team } from '../../models/team';
import { Router } from '@angular/router';
import { ResourceLoader } from '@angular/compiler';
import { UploadImageService } from 'src/app/services/uploadImage/upload-image.service';
import { CONNECTION } from '../../services/global';
import { Marcador } from 'src/app/models/marcador';
import { formatCurrency } from '@angular/common';

@Component({
  selector: 'app-administrar-ligas',
  templateUrl: './administrar-ligas.component.html',
  styleUrls: ['./administrar-ligas.component.css']
})
export class AdministrarLigasComponent implements OnInit, DoCheck {

  constructor(private restUser: RestUserService, private restLiga: RestLigaService, private route: Router, private uploadTeam:UploadImageService, private setMarcador:RestMarcadorService) {
    this.uri = CONNECTION.URI
  }
  teams;
  team: Team;
  user;
  liga;
  equipo;
  marcador;
  ligaSelected: Liga;
  teamSelected: Team;
  public filesToUpload:Array<File>;
  public token;
  message;
  public uri:string;
  ngOnInit(): void {
    this.liga = this.restLiga.getLiga();
    this.team = new Team('','','',null,null,null,null,null,'',[])
    this.marcador = new Marcador('',null, null, null, [],[])
    this.ligaSelected =   JSON.parse(localStorage.getItem('ligaSelected'));
    this.teams = localStorage.getItem('teams');
    this.teamSelected = JSON.parse(localStorage.getItem('teamSelected'));
    this.user = this.restUser.getUser();
    this.verTeams();
    this.token = this.restUser.getToken();

    /*this.restLiga.verTeams(this.user._id, this.liga._id).subscribe((res:any)=>{
      if(res){
        res.forEach(element =>{
          element.forEach(elementoTeam =>{
            this.equipo.push(elementoTeam)
            localStorage.setItem('equipo1', JSON.stringify(this.equipo))
            this.teams.push(elementoTeam)
          })
        });
      }else{
        alert('No existe el equipo')
      }
    })*/
  }

  ngDoCheck(){
    this.restLiga.getLiga();
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

  saveMarcador(){
    this.setMarcador.saveMarcador(this.liga._id, this.marcador).subscribe((res:any)=>{
      if(res){
        alert('Marcador añadido ^-^')
        this.marcador = res;
        localStorage.setItem('marcador', JSON.stringify(this.marcador))
      }else{
        alert('No se creo el marcador')
      }
    }, error => console.log(<any>error))
  }

  uploadImage(){
    this.uploadTeam.fileRequestLiga(this.user._id,this.ligaSelected._id ,[], this.filesToUpload, this.token, 'image')
      .then((res:any)=>{
        if(res.liga){
          this.liga.image = res.ligaImage;
          this.liga = res.liga;
          localStorage.setItem('user', JSON.stringify(this.user));
          alert('Imagen de liga subida con exito');
          this.route.navigateByUrl('misLigas')
        }else{
          alert(res.message)
        }
      },
      (error:any) => alert(error.error.message)
      )
  }

  uploadImageTeam(){
    this.uploadTeam.fileRequestTeam(this.user._id,this.teamSelected._id ,[], this.filesToUpload, this.token, 'image')
      .then((res:any)=>{
        if(res.team){
          this.team.logo = res.teamImage;
          localStorage.setItem('teamSelected', JSON.stringify(this.teamSelected));
          alert('Imagen de equipo subida con exito');
        }else{
          alert(res.message)
        }
      },
      (error:any) => alert('Error al subir la imagen')
      )
  }

  fileChange(fileInput){
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload)
  }

  fileChange2(fileInput2){
    this.filesToUpload = <Array<File>>fileInput2.target.files;
    console.log(this.filesToUpload)
  }

  obtenerData(teamsSelected){
    this.team = teamsSelected;
    localStorage.setItem('teamSelected',JSON.stringify(teamsSelected))
    console.log(teamsSelected);
  }
}