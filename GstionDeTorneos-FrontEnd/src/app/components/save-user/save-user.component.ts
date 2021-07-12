import { Component, OnInit } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { User } from '../../models/user';
import { RestUserService } from '../../services/restUser/rest-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-save-user',
  templateUrl: './save-user.component.html',
  styleUrls: ['./save-user.component.css']
})
export class SaveUserComponent implements OnInit {
  public user: User;
  public username: string;
  public usuario;
  public token;
  public optionsRol = ['ROLE_ADMIN', 'ROLE_USER'];

  constructor(private restUser:RestUserService, private router:Router) {
    this.user = new User('','','','','','','','',[]);
    this.token = restUser.getToken();
    this.usuario = restUser.getUser();
  }

  ngOnInit(): void {
  }

  onSubmit(statusForm){
    this.restUser.saveUser(this.user, this.usuario._id).subscribe((res:any)=>{
      if(res.userSaved){
        alert(res.message);
        this.user = new User('','','','','','','','',[]);
        statusForm.reset();
        this.router.navigateByUrl('principal');
      }else{
        alert(res.message);
      }
    },
    (error:any) => alert(error.error.message)
    )
  }

}
