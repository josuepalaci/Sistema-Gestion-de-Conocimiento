import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Pregunta } from 'src/app/models/pregunta.model';

import { PreguntasService } from "../../services/preguntas.service";

@Component({
  selector: 'app-problemas-soluciones',
  templateUrl: './problemas-soluciones.component.html',
  styleUrls: ['./problemas-soluciones.component.css']
})
export class ProblemasSolucionesComponent implements OnInit {

  preguntas: Pregunta [];
  respuesta:never;
  respuestas = [];
  @ViewChild("respuestaForm") respuestaForm: NgForm;
  
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

  addRespuesta(){

        // console.log(this.pregunt.respuesta);
        
        // this.respuestas = this.pregunt.respuesta;
      // this.respuestas.push(this.respuesta);
        this.pregunt.respuesta.push(this.respuesta);

        // console.log(this.respuestas);
        // console.log(this.pregunt);
    
    this.preguntaServicio.updatePregunta(this.pregunt)
    this.respuestaForm.reset();
    
  }

}
