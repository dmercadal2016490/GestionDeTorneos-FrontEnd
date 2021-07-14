import { Component, OnInit, DoCheck } from '@angular/core';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import { RestLigaService } from 'src/app/services/restLiga/rest-liga.service';
import { Liga } from '../../models/liga'
import { Router } from '@angular/router';
import { ResourceLoader } from '@angular/compiler';
import { CONNECTION } from '../../services/global';
import { UploadImageService } from 'src/app/services/uploadImage/upload-image.service';

@Component({
  selector: 'app-ligas',
  templateUrl: './ligas.component.html',
  styleUrls: ['./ligas.component.css']
})
export class LigasComponent implements OnInit, DoCheck {
  ligas;
  user;
  liga: Liga;
  ligaSelected;
  public uri:string;
  public filesToUpload:Array<File>;
  public token;

  constructor(private restUser: RestUserService, private restLiga: RestLigaService, private route: Router, private uploadLiga:UploadImageService) {
    this.uri = CONNECTION.URI
  }

  ngOnInit(): void {
    this.liga = new Liga('','','','',null,null)
    this.user = this.restUser.getUser();
    this.ligas = this.user.ligas;
    this.token = this.restUser.getToken();
  }

  ngDoCheck(){
    this.restLiga.getLiga();
    this.restUser.getUser();
  }

  onSubmit(){
    this.restLiga.saveLiga(this.user._id, this.liga).subscribe((res:any)=>{
      if(res.ligaPush){
        alert(res.message)
        localStorage.setItem('user', JSON.stringify(res.ligaPush));
        this.route.navigateByUrl('misLigas');
      }else{
        alert(res.message)
      }
    },error=> alert(error.error.message))
  }

  obtenerData(liga){
    this.liga = liga;
  }

  obtenerDatos(liga){
    this.liga = liga;
    localStorage.setItem('ligaSelected', JSON.stringify(this.liga))
  }

  updateLiga(){
    this.restLiga.updateLiga(this.user._id, this.liga).subscribe((res:any)=>{
      if(res.ligaUpdated){
        alert(res.message);
        localStorage.setItem('user', JSON.stringify(this.user));
        this.route.navigateByUrl('misLigas')
      }else{
        alert(res.message);
      }
    })
  }

  removeLiga(){
    this.restLiga.deleteLiga(this.user._id, this.liga._id).subscribe((res:any)=>{
      if(res.ligaPull){
        alert(res.message);
        localStorage.setItem('user', JSON.stringify(res.ligaPull));
        this.user = this.restUser.getUser();
        this.ligas = this.user.ligas;
      }else{
        alert(res.message)
      }
    },error => alert(error.error.message))
  }

  uploadImage(){
    this.uploadLiga.fileRequestLiga(this.user._id,this.liga._id ,[], this.filesToUpload, this.token, 'image')
      .then((res:any)=>{
        if(res.liga){
          this.liga.ligaImg = res.ligaImage;
          this.liga = res.liga;
          localStorage.setItem('user', JSON.stringify(this.user));
          alert('Imagen de liga subida con exito');
          this.route.navigateByUrl('misLigas')
        }else{
          alert(res.message)
        }
      }, error => console.log(<any>error))
  }

  fileChange(fileInput){
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload)
  }
}
