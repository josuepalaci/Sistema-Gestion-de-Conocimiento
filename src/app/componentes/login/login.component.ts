import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string;
  password:string;

  constructor(
    private router: Router,
    private flashMessages: FlashMessagesService
  ) { }

  ngOnInit(): void {
  }

  login(){
    this.flashMessages.show("Error al logear",{
      cssClass: 'alert-success', timeout: 1500
    });
    this.router.navigate(['/']);
  }

}
