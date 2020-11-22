import { ConstantPool } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Direccion } from 'src/app/models/direccion.model';
import { DireccionService } from 'src/app/services/direccion.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  // CREDENCIALES 
  emailU: string;
  passwordU: string;

  @ViewChild("consejoForm") consejoForm: NgForm;

  direccion: Direccion = {
    id:'',
    puesto:'',
    nombre:'',
    funcion:'',
    jefe:'',
    email:''
  }


  constructor(
    private flashMessages: FlashMessagesService,
    private router: Router,
    private logignService: LoginService,
    private direccionServices: DireccionService
  ) { }

  ngOnInit(): void {
  }

  registro({value, valid}: {value:Direccion, valid: boolean}){
    if (!valid) {
      this.flashMessages.show('Por favor llenalo correctamente', {
        cssClass: 'alert-danger', timeout: 2500
      });
    } else {

      this.logignService.registrarse(this.emailU, this.passwordU)
      .then( res => {
        this.direccion.email = this.emailU;
        this.direccionServices.addPersona(this.direccion);
        this.router.navigate(['/']);
      }).catch( error => {
        this.flashMessages.show(error.message, {
          cssClass: 'alert-danger', timeout: 2500
        })
      })
      
    }
  }


}
