import { Component, OnInit } from '@angular/core';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import { User } from '../../models/user';
import { CONNECTION } from '../../services/global';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  user;
  public token;
  public uri:string;

  constructor(private restUser:RestUserService, private router:Router,) {
    this.user = this.restUser.getUser();
    this.token = this.restUser.getToken();
    this.uri = CONNECTION.URI
   }

  ngOnInit(): void {
  }

  onSubmit(){
    delete this.user.password;
    delete this.user.role;
    this.restUser.updateUser(this.user).subscribe((res:any)=>{
      if(res.userUpdated){
        delete res.userUpdated.password;
        localStorage.setItem('user', JSON.stringify(res.userUpdated));
        alert(res.message);
        this.router.navigateByUrl('user')
      }else{
        alert(res.message);
        this.user = this.restUser.getUser();
      }
    },
    (error:any) => alert(error.error.message)
    )
  }

}
