import { Component, OnInit } from '@angular/core';
import { Pregunta } from 'src/app/models/pregunta.model';

import { PreguntasService } from "../../services/preguntas.service";

@Component({
  selector: 'app-problemas-soluciones',
  templateUrl: './problemas-soluciones.component.html',
  styleUrls: ['./problemas-soluciones.component.css']
})
export class ProblemasSolucionesComponent implements OnInit {

  preguntas: Pregunta [];
  pregunt: Pregunta = {
    area: '',
    fecha: '',
    id: '',
    pregunta: '',
    respuesta: []
  }

  constructor(
    private preguntaServicio: PreguntasService
  ) { }

  ngOnInit(): void {
    this.preguntaServicio.getPreguntas().subscribe(
      preguntas => {
        this.preguntas = preguntas;
        // console.log(this.preguntas);
      }
    );
  }

  getPregunta(id:string){
    this.preguntaServicio.getPregunta(id).subscribe(
      pregu => {this.pregunt = pregu}
    );
  }


}
