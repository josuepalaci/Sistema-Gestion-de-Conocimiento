import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Historico } from "../../models/historico.model";
import { HistoricosService } from "../../services/historicos.service";

@Component({
  selector: 'app-historicos',
  templateUrl: './historicos.component.html',
  styleUrls: ['./historicos.component.css']
})
export class HistoricosComponent implements OnInit {

  //filtros
  area: String = 'historico';
  fillFecha: string;
  fillArea: string;
  fillTitulo: String;
  histoFiltro: Historico [];
  controlFil: boolean = true;

  loggedInUser: string;

  historicos: Historico[];
  hisotrico: Historico = {
    area:'',
    fecha:'',
    descripcion:'',
    id:'',
    titulo:'',
    idDoc: '',
    email:''
  };

  constructor(
    private loginService: LoginService,
    private historicoService:HistoricosService
  ) { }

  ngOnInit(): void {
    this.historicoService.getHistoricos().subscribe(
      histo => {
        this.historicos = histo;
        // console.log(this.historicos);
      }
    );

    this.loginService.getAuth().subscribe(
      auth => {this.loggedInUser = auth.email;});
  }

  getHistorico(id: string){
    this.historicoService.getHistorico(id).subscribe(
        historico => { this.hisotrico = historico }
    );
  }

  //para lista de filtrado
  filtroConsejo(fecha: string, area: string, titulo: string){
    
    this.histoFiltro = [];
    // 3 existen
    if (fecha && area && titulo) {
      this.historicos.filter((item) => (item.area===area && item.fecha==fecha && item.titulo.toLowerCase().includes(titulo.toLowerCase()) ) ? this.histoFiltro.push(item) : 0 );
    }
    // 2 existen
    if (fecha && area && !titulo) {
      this.historicos.filter((item) => (item.area===area && item.fecha==fecha ) ? this.histoFiltro.push(item) : 0 );
    }
    if (fecha && !area && titulo) {
      this.historicos.filter((item) => (item.area===area && item.titulo.toLowerCase().includes(titulo.toLowerCase())) ? this.histoFiltro.push(item) : 0 );
    }
    if (!fecha && area && titulo) {
      this.historicos.filter((item) => (item.area===area && item.titulo.toLowerCase().includes(titulo.toLowerCase())) ? this.histoFiltro.push(item) : 0 );
    }
    // 1 existe 
    if (!fecha && !area && titulo) {
      this.historicos.filter((item) => (item.titulo.toLowerCase().includes(titulo.toLowerCase())) ? this.histoFiltro.push(item) : 0 );
      console.log("titulo solo");
    }
    if (!fecha && area && !titulo) {
      this.historicos.filter((item) => (item.area===area) ? this.histoFiltro.push(item) : 0 );
    }
    if (fecha && !area && !titulo) {
      this.historicos.filter((item) => (item.fecha==fecha) ? this.histoFiltro.push(item) : 0 );
    }
    if(!fecha && !area && !titulo){
      this.histoFiltro = this.historicos;
      alert('Filtros Vacios, No se pudo filtrar!');
    }

    this.controlFiltro(false);
  }
  
  controlFiltro(valor: boolean){
    this.controlFil = valor;
    this.hisotrico = {
      area:'',
      fecha:'',
      descripcion:'',
      id:'',
      titulo:'',
      idDoc: '',
      email:''
  
    };
  }

}
