import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  email: string;
  newpass:string;

  constructor(
    private router: Router,
    private flashMessages: FlashMessagesService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.loginService.getAuth().subscribe( auth =>{
      if(auth){
        this.email = auth.email;
        
      }
    });
  }

  cambio(){
    
      this.loginService.cambioPass().subscribe(
        auth => {
          auth.updatePassword(this.newpass)
          .then(
            us=>{
              this.flashMessages.show("Contraseñas actualizada",{
                cssClass: 'alert-success', timeout: 2500
              });
            }
          ).catch(
            err=>{
              this.flashMessages.show("Contraseñas no se pudo actualizar",{
                cssClass: 'alert-danger', timeout: 2500
              });
            }
          )
        }
      )

  }

}
