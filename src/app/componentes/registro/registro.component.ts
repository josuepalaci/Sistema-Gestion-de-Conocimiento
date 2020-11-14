import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  // CREDENCIALES 
  email: string;
  password: string;

  constructor(
    private flashMessages: FlashMessagesService,
    private router: Router,
    private logignService: LoginService
  ) { }

  ngOnInit(): void {
  }

  registro(){
    this.logignService.registrarse(this.email, this.password)
    .then( res => {
      this.router.navigate(['/']);
    }).catch( error => {
      this.flashMessages.show(error.message, {
        cssClass: 'alert-danger', timeout: 2500
      })
    })
}

}
