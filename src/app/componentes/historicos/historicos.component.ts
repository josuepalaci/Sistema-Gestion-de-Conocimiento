import { Component, OnInit } from '@angular/core';
import { Historico } from "../../models/historico.model";
import { HistoricosService } from "../../services/historicos.service";

@Component({
  selector: 'app-historicos',
  templateUrl: './historicos.component.html',
  styleUrls: ['./historicos.component.css']
})
export class HistoricosComponent implements OnInit {

  historicos: Historico[];
  hisotrico: Historico = {
    area:'',
    fecha:'',
    descripcion:'',
    id:'',
    titulo:''
  };

  constructor(
    private historicoService:HistoricosService
  ) { }

  ngOnInit(): void {
    this.historicoService.getHistoricos().subscribe(
      histo => {
        this.historicos = histo;
        console.log(this.historicos);
      }
    )
  }

}
