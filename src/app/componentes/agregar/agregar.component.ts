import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Consejo } from 'src/app/models/consejo.model';
import { Historico } from 'src/app/models/historico.model';
import { Pregunta } from 'src/app/models/pregunta.model';
import { ConsejosService } from 'src/app/services/consejos.service';
import { HistoricosService } from 'src/app/services/historicos.service';
import { PreguntasService } from 'src/app/services/preguntas.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  opcion=0;
  @ViewChild("consejoForm") consejoForm: NgForm;
  @ViewChild("preguntaform") preguntaform: NgForm;
  @ViewChild("historicoForm") historicoForm: NgForm;

  consejo: Consejo = {
    area:'',
    descripcion:'',
    id:'',
    titulo:'',
    fecha:'',
    idDoc:''
  };

  hisotrico: Historico = {
    area:'',
    fecha:'',
    descripcion:'',
    id:'',
    titulo:'',
    idDoc: ''
  };

  pregunta: Pregunta = {
    area: '',
    fecha: '',
    id: '',
    pregunta: '',
    respuesta: []
  };
  pipe = new DatePipe('en-US');

  constructor(
    private consejoService: ConsejosService,
    private historicoService: HistoricosService,
    private preguntasService: PreguntasService,
    private flashMessages: FlashMessagesService
  ) { }

  ngOnInit(): void {
  }

  // METODOS PARA AGREGAR CONTENIDO *************************
  
  addConsejo({value, valid}: {value:Consejo, valid: boolean}){
    if (!valid) {
      this.flashMessages.show('porfavor llenaló correctamente', {
        cssClass: 'alert-danger', timeout: 2500
      });
    }
    else {
      // agregar un nuevo componente
      this.flashMessages.show('Consejo agregado', {
        cssClass: 'alert-success', timeout: 2500
      });
      value.idDoc = "qwe";
      const now = Date.now();
      value.fecha = this.pipe.transform(now, 'short');

      this.consejoService.addConsejo(value);
      this.consejoForm.resetForm();
      this.opcion = 0;
      
    } 
  }

  addPregunta({value, valid}: {value:Pregunta, valid: boolean}){
    if (!valid) {
      this.flashMessages.show('porfavor llenaló correctamente', {
        cssClass: 'alert-danger', timeout: 2500
      });
    }
    else {
      // agregar un nuevo componente
      this.flashMessages.show('Pregunta agregada', {
        cssClass: 'alert-success', timeout: 2500
      });
      
      const now = Date.now();
      value.fecha = this.pipe.transform(now, 'short');

      this.preguntasService.addPregunta(value);
      this.preguntaform.resetForm();
      this.opcion = 0;
      
    } 
  }

  addHistorico({value, valid}: {value:Historico, valid: boolean}){
    
    if (!valid) {
      this.flashMessages.show('porfavor llenaló correctamente', {
        cssClass: 'alert-danger', timeout: 2500
      });
    }
    else {
      // agregar un nuevo componente
      this.flashMessages.show('Pregunta agregada', {
        cssClass: 'alert-success', timeout: 2500
      });
      // value.idDoc = "qwe";
      
      const now = Date.now();
      value.fecha = this.pipe.transform(now, 'short');

      this.historicoService.addHistorico(value);
      this.historicoForm.resetForm();
      this.opcion = 0;
      
    }

  }

}
