import { Route } from '@angular/compiler/src/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Pregunta } from 'src/app/models/pregunta.model';
import { LoginService } from 'src/app/services/login.service';

import { PreguntasService } from "../../services/preguntas.service";

@Component({
  selector: 'app-problemas-soluciones',
  templateUrl: './problemas-soluciones.component.html',
  styleUrls: ['./problemas-soluciones.component.css']
})
export class ProblemasSolucionesComponent implements OnInit {

  //filtros
  area: String = 'problema';
  fillFecha: string;
  fillArea: string;
  fillTitulo: String;
  preguntaFiltro: Pregunta [];
  controlFil: boolean = true;

  preguntas: Pregunta [];
  respuesta:never;
  respuestas = [];
  loggedInUser: string;

  @ViewChild("respuestaForm") respuestaForm: NgForm;
  
  pregunt: Pregunta = {
    area: '',
    fecha: '',
    id: '',
    pregunta: '',
    respuesta: [],
    email:''
  }

  constructor(
    private preguntaServicio: PreguntasService,
    private loginService: LoginService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.preguntaServicio.getPreguntas().subscribe(
      preguntas => {this.preguntas = preguntas;});

    this.loginService.getAuth().subscribe(
      auth => {this.loggedInUser = auth.email;});
  }

  getPregunta(id:string){
    this.preguntaServicio.getPregunta(id).subscribe(
      pregu => {this.pregunt = pregu}
    );
  }

  addRespuesta(){
        this.pregunt.respuesta.push(this.respuesta);
    this.preguntaServicio.updatePregunta(this.pregunt)
    this.respuestaForm.reset();
  }

  eliminarPregunta(id: Pregunta){
    this.preguntaServicio.deletePregunta(id);
    this.pregunt.area ='';
    this.pregunt.fecha ='';
    this.pregunt.id ='';
    this.pregunt.pregunta= '';
    this.pregunt.respuesta= [];
    this.pregunt.email='';
    this.router.navigate(['problemas']);
  }

//para lista de filtrado
filtroConsejo(fecha: string, area: string, titulo: string){
    
  this.preguntaFiltro = [];
  // 3 existen
  if (fecha && area && titulo) {
    this.preguntas.filter((item) => (item.area===area && item.fecha==fecha && item.pregunta.toLowerCase().includes(titulo.toLowerCase()) ) ? this.preguntaFiltro.push(item) : 0 );
  }
  // 2 existen
  if (fecha && area && !titulo) {
    this.preguntas.filter((item) => (item.area===area && item.fecha==fecha ) ? this.preguntaFiltro.push(item) : 0 );
  }
  if (fecha && !area && titulo) {
    this.preguntas.filter((item) => (item.area===area && item.pregunta.toLowerCase().includes(titulo.toLowerCase())) ? this.preguntaFiltro.push(item) : 0 );
  }
  if (!fecha && area && titulo) {
    this.preguntas.filter((item) => (item.area===area && item.pregunta.toLowerCase().includes(titulo.toLowerCase())) ? this.preguntaFiltro.push(item) : 0 );
  }
  // 1 existe 
  if (!fecha && !area && titulo) {
    this.preguntas.filter((item) => (item.pregunta.toLowerCase().includes(titulo.toLowerCase())) ? this.preguntaFiltro.push(item) : 0 );
    console.log("titulo solo");
  }
  if (!fecha && area && !titulo) {
    this.preguntas.filter((item) => (item.area===area) ? this.preguntaFiltro.push(item) : 0 );
  }
  if (fecha && !area && !titulo) {
    this.preguntas.filter((item) => (item.fecha==fecha) ? this.preguntaFiltro.push(item) : 0 );
  }
  if(!fecha && !area && !titulo){
    this.preguntaFiltro = this.preguntas;
    alert('Filtros Vacios, No se pudo filtrar!');
  }

  this.controlFiltro(false);
}


  controlFiltro(valor: boolean){
    this.controlFil = valor;
    this.pregunt = {
      area: '',
      fecha: '',
      id: '',
      pregunta: '',
      respuesta: [],
      email:''
    };
  }

}
