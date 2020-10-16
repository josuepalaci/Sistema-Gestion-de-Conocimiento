import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cabecero',
  templateUrl: './cabecero.component.html',
  styleUrls: ['./cabecero.component.css']
})
export class CabeceroComponent implements OnInit {

  isloggedIn: boolean;
  loggedInUser: string;
  isAdmin:string = 'admin@gdc.com'
  // permitirRegistro: boolean;

  constructor(
    private loginService: LoginService,
    private router: Router,
    // private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loginService.getAuth().subscribe(
      auth => {
        if(auth){
          this.isloggedIn = true;
          this.loggedInUser = auth.email;
        } else {
          this.isloggedIn = false;
        }
      }
    );

  }

  logOut(){
    this.loginService.logOut();
    this.isloggedIn = false;
    this.router.navigate(['/login']);
  }


}
