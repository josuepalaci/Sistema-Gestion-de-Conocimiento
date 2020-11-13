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

  //filtros
  area: String = 'consejo'
  fillFecha: string;
  fillArea: string;
  fillTitulo: String;
  consejoFiltro: Consejo [];
  controlFil: boolean = true;

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

  // para optener uno 
  getConsejo(id: string){
    this.consejoService.getConsejo(id).subscribe(
      conse => {this.consejo = conse}
    );
  }

  //para lista de filtrado
  filtroConsejo(fecha: string, area: string, titulo: string){
    
    this.consejoFiltro = [];
    // 3 existen
    if (fecha && area && titulo) {
      this.consejos.filter((item) => (item.area===area && item.fecha==fecha && item.titulo.toLowerCase().includes(titulo.toLowerCase()) ) ? this.consejoFiltro.push(item) : 0 );
    }
    // 2 existen
    if (fecha && area && !titulo) {
      this.consejos.filter((item) => (item.area===area && item.fecha==fecha ) ? this.consejoFiltro.push(item) : 0 );
    }
    if (fecha && !area && titulo) {
      this.consejos.filter((item) => (item.area===area && item.titulo.toLowerCase().includes(titulo.toLowerCase())) ? this.consejoFiltro.push(item) : 0 );
    }
    if (!fecha && area && titulo) {
      this.consejos.filter((item) => (item.area===area && item.titulo.toLowerCase().includes(titulo.toLowerCase())) ? this.consejoFiltro.push(item) : 0 );
    }
    // 1 existe 
    if (!fecha && !area && titulo) {
      this.consejos.filter((item) => (item.titulo.toLowerCase().includes(titulo.toLowerCase())) ? this.consejoFiltro.push(item) : 0 );
      console.log("titulo solo");
    }
    if (!fecha && area && !titulo) {
      this.consejos.filter((item) => (item.area===area) ? this.consejoFiltro.push(item) : 0 );
    }
    if (fecha && !area && !titulo) {
      this.consejos.filter((item) => (item.fecha==fecha) ? this.consejoFiltro.push(item) : 0 );
    }
    if(!fecha && !area && !titulo){
      this.consejoFiltro = this.consejos;
      alert('Filtros Vacios, No se pudo filtrar!');
    }

    this.controlFiltro(false);
  }
  
  controlFiltro(valor: boolean){
    this.controlFil = valor;
    this.consejo = {
      area:'',
      descripcion:'',
      id:'',
      titulo:'',
      fecha:'',
      idDoc:'',
      email:''
    };
  }

}
