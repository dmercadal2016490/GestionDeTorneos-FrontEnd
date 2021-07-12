import { Component, OnInit } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { User } from '../../models/user';
import { RestUserService } from '../../services/restUser/rest-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public user: User;
  public username: string;
  message;

  constructor(private restUser:RestUserService, private router:Router) {
    this.user = new User('','','','','','','','ROLE_USER',[]);
  }

  ngOnInit(): void {
  }

  onSubmit(register){
    this.restUser.register(this.user).subscribe((res:any)=>{
      this.message = res.message
      if(res.userSaved){
        alert(this.message);
        register.reset();
        this.router.navigateByUrl('login')
      }else{
        alert(this.message);
      }
    },
      (error:any) => alert(error.error.message)
    )
  }

}
