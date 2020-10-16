import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Consejo } from "../../models/consejo.model";

import { ConsejosService } from "../../services/consejos.service";

@Component({
  selector: 'app-consejos',
  templateUrl: './consejos.component.html',
  styleUrls: ['./consejos.component.css']
})
export class ConsejosComponent implements OnInit {

  loggedInUser: string;

  consejos: Consejo [];
  consejo: Consejo = {
    area:'',
    descripcion:'',
    id:'',
    titulo:'',
    fecha:'',
    idDoc:'',
    email:''

  };

  constructor(
    private loginService: LoginService,
    private consejoService: ConsejosService
  ) { }

  ngOnInit(): void {
    this.consejoService.getConsejos().subscribe(
      consej => {
        this.consejos = consej;       
      }
    );

    this.loginService.getAuth().subscribe(
      auth => {this.loggedInUser = auth.email;});
  }


  getConsejo(id: string){
    this.consejoService.getConsejo(id).subscribe(
      conse => {this.consejo = conse}
    );
  }




}
