import { Component, OnInit } from '@angular/core';
import { Consejo } from "../../models/consejo.model";

import { ConsejosService } from "../../services/consejos.service";

@Component({
  selector: 'app-consejos',
  templateUrl: './consejos.component.html',
  styleUrls: ['./consejos.component.css']
})
export class ConsejosComponent implements OnInit {

  consejos: Consejo [];
  consejo: Consejo = {
    area:'',
    descripcion:'',
    id:'',
    titulo:'',
    fecha:'',
    idDoc:''
  };

  constructor(
    private consejoService: ConsejosService
  ) { }

  ngOnInit(): void {
    this.consejoService.getConsejos().subscribe(
      consej => {
        this.consejos = consej;
        // console.log(this.consejos);        
      }
    );
  }


  getConsejo(id: string){
    this.consejoService.getConsejo(id).subscribe(
      conse => {this.consejo = conse}
    );
  }




}
