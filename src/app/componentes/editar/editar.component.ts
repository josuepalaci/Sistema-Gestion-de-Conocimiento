import { ValueTransformer } from '@angular/compiler/src/util';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Consejo } from 'src/app/models/consejo.model';
import { Direccion } from 'src/app/models/direccion.model';
import { Historico } from 'src/app/models/historico.model';
import { Pregunta } from 'src/app/models/pregunta.model';
import { ConsejosService } from 'src/app/services/consejos.service';
import { DireccionService } from 'src/app/services/direccion.service';
import { HistoricosService } from 'src/app/services/historicos.service';
import { PreguntasService } from 'src/app/services/preguntas.service';


@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  // PARAMETROS 
  area: String;
  id: string;

  // FORMULARIOS 
  @ViewChild("consejoForm") consejoForm: NgForm;
  @ViewChild("preguntaform") preguntaform: NgForm;
  @ViewChild("historicoForm") historicoForm: NgForm;
  @ViewChild("direccionForm") direccionForm: NgForm;

  //CONTENEDORES 
  consejo: Consejo = {
    area:'',
    descripcion:'',
    id:'',
    titulo:'',
    fecha:'',
    idDoc:'',
    email:''
  };
  pregunta: Pregunta = {
    area: '',
    fecha: '',
    id: '',
    pregunta: '',
    respuesta: [],
    email:''
  }
  historico: Historico = {
    area:'',
    fecha:'',
    descripcion:'',
    id:'',
    titulo:'',
    idDoc: '',
    email:''
  };
  direccion: Direccion = {
    id:'',
    puesto:'',
    nombre:'',
    funcion:'',
    jefe:'',
    email:''
  }
  
  constructor( 
    private router: Router, 
    private route: ActivatedRoute, 
    private flashMessages: FlashMessagesService,
    private consejoServicio: ConsejosService,
    private historicoServicio: HistoricosService,
    private preguntaServicio: PreguntasService,
    private direccionService: DireccionService
    ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    this.area = this.route.snapshot.params['area'];

    if (this.area == 'consejo') {
      this.consejoServicio.getConsejo(this.id).subscribe(conse =>  this.consejo = conse);
    }
    if (this.area == 'historico') {
      this.historicoServicio.getHistorico(this.id).subscribe(histo => this.historico = histo);
    }
    if (this.area == 'problema') {
      this.preguntaServicio.getPregunta(this.id).subscribe(pregu => this.pregunta = pregu);
    }
    if (this.area == 'personal') {
      this.direccionService.getPersona(this.id).subscribe(perso => this.direccion = perso);
    }

  }

  atras(){
    if( this.area === 'personal'){
      this.router.navigate([`/direccion`]);
    } else {
      this.router.navigate([`/${this.area}s`]);
    }
  }

  eliminar(){
    if (this.area == 'consejo') {
      this.consejoServicio.deleteConsejo(this.consejo);
      this.router.navigate([`/${this.area}s`]);
    } else if (this.area == 'problema') {
      this.consejoServicio.deleteConsejo(this.pregunta);
      this.router.navigate([`/${this.area}s`]);
    } else if (this.area == 'historico') {
      this.historicoServicio.deleteHistorico(this.historico);
      this.router.navigate([`/${this.area}s`]);
    } else if (this.area == 'personal') {
      this.direccionService.deleteDireccion(this.direccion);
      this.router.navigate([`/direccion`]);
    }
  }

  // METODOS PARA GUARDAR 

  GConsejo({value, valid}: {value: Consejo, valid: boolean}){
    // console.log(value);
    if (!valid) {
      this.flashMessages.show('porfavor llena el formulario correctamente',
        {cssClass: 'alert-danger', timeout: 2500}
      );
    } else {
      value.id = this.id;
      value.fecha = this.consejo.fecha;
      value.email = this.consejo.email;
      value.idDoc = this.consejo.idDoc;
      // console.log(value);
      
      this.consejoServicio.updateConsejo(value);
      this.router.navigate([`/${this.area}s`]);
    }
  }

  GPregunta({value, valid}: {value: Pregunta, valid: boolean}){
    if (!valid) {
      this.flashMessages.show('porfavor llena el formulario correctamente',
        {cssClass: 'alert-danger', timeout: 2500}
      );
    } else {
      value.id = this.id;
      value.email = this.pregunta.email;
      value.respuesta = this.pregunta.respuesta;
      value.fecha = this.pregunta.fecha;
      this.preguntaServicio.updatePregunta(value);
      this.router.navigate([`/${this.area}s`]);
    }
  }

  GHistorico({value, valid}: {value: Historico, valid: boolean}){
    if (!valid) {
      this.flashMessages.show('porfavor llena el formulario correctamente',
        {cssClass: 'alert-danger', timeout: 2500}
      );
    } else {
      value.idDoc = this.historico.idDoc;
      value.fecha = this.historico.fecha;
      value.fecha = this.historico.fecha;
      value.id = this.id;
      value.email = this.historico.email;
      this.historicoServicio.updateHistorico(value);
      this.router.navigate([`/${this.area}s`]);
    }
  }

  GDireccion({value, valid}: {value: Historico, valid: boolean}){
    if (!valid) {
      this.flashMessages.show('porfavor llena el formulario correctamente',
        {cssClass: 'alert-danger', timeout: 2500}
      );
    } else {

      value.id = this.id;
      // console.log(value);
      this.direccionService.updateDireccion(value);
      this.router.navigate([`/direccion`]);
      
    }
  }

}
