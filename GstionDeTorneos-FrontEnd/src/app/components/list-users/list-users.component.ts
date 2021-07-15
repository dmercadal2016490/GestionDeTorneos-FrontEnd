import { Component, OnInit } from '@angular/core';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  users;
  userSelected:User;
  user:User;

  constructor(private restUser:RestUserService, private route: Router) {
  }

  ngOnInit(): void {
    this.listUsers()
    this.users = localStorage.getItem('users');
    this.user = new User('','','','','','','','',[]);
    this.userSelected = JSON.parse(localStorage.getItem('userSelected'));
  }

  listUsers(){
    this.restUser.getUsers().subscribe((res:any)=>{
      if(res){
        alert(res.message)
        this.users = res.users;
        localStorage.setItem('users', JSON.stringify(this.users));
        console.log(res.users)
      }else{
        alert(res.message)
      }
    },(error:any) => alert(error.error.message)
    )
  }

  obetenerData(selectedUser){
    this.user = selectedUser;
    localStorage.setItem('userSelected', JSON.stringify(selectedUser)) ;
  }

  borrarData(){
    localStorage.removeItem('userSelected');
  }

  updateUsers(){
    this.restUser.adminUpdateUsers(this.user._id, this.user).subscribe((res:any)=>{
      if(res.userUpdated){
        alert(res.message)
        this.users = res.users;
        localStorage.setItem('users', JSON.stringify(this.users));
        console.log(res.users)
        this.route.navigateByUrl('principal')
      }else{
        alert(res.message)
      }
    })
  }

  eliminarUsers(){
    this.restUser.adminDeleteUsers(this.user._id).subscribe((res:any)=>{
      if(res.userRemoved){
        alert(res.message)
        this.users = res.users;
        localStorage.setItem('users', JSON.stringify(this.users));
        console.log(res.users)
        this.route.navigateByUrl('principal')
      }else{
        alert(res.message)
      }
    })
  }

}
