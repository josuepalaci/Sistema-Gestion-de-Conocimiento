import { Component, OnInit } from '@angular/core';
import { Direccion } from "../../models/direccion.model";

import { DireccionService } from "../../services/direccion.service";

@Component({
  selector: 'app-direccion-ejecutiva',
  templateUrl: './direccion-ejecutiva.component.html',
  styleUrls: ['./direccion-ejecutiva.component.css']
})
export class DireccionEjecutivaComponent implements OnInit {

  personal: Direccion[];
  personaA: Direccion = {
    funcion:'',
    jefe:'',
    nombre:'',
    puesto:'',
    id: ''
  };

  constructor(
    private direccionService: DireccionService
  ) { }

  ngOnInit(): void {
    this.direccionService.getPersonal().subscribe(
      employes => {
        this.personal = employes;
        // console.log(this.personal);
      }
    );
  }

  getPersona(id: string){
    // console.log(id);
    this.direccionService.getPersona(id).subscribe(
      per => { this.personaA = per; }
    );
    
  }


}
