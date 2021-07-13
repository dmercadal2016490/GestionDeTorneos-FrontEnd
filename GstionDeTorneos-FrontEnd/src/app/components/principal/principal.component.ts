import { Component, OnInit } from '@angular/core';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  user;
  constructor(private restUser:RestUserService) {
    this.user = this.restUser.getUser();
  }

  ngOnInit(): void {
  }

}
