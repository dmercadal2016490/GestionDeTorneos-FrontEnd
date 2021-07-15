import { Component, OnInit } from '@angular/core';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  users;
  userSelected:User;
  user:User;

  constructor(private restUser:RestUserService) {
    this.user = new User('','','','','','','','',[]);
  }

  ngOnInit(): void {
    this.listUsers()
    this.users = localStorage.getItem('users');
    this.userSelected = JSON.parse(localStorage.getItem('userSelected'));
  }

  listUsers(){
    this.restUser.getUsers().subscribe((res:any)=>{
      if(res){
        this.users = res.users;
        localStorage.setItem('users', JSON.stringify(this.users));
        alert(res.message)
      }else{
        alert(res.message)
      }
    },
    (error:any) => alert(error.error.message)
    )
  }

  obetenerData(selectedUser){
    this.user = selectedUser;
    localStorage.setItem('userSelected', JSON.stringify(selectedUser)) ;
  }

  borrarData(){
    localStorage.removeItem('userSelected');
  }

}
