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

}
