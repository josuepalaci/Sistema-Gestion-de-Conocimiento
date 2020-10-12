import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  opcion=1;

  constructor() { }

  ngOnInit(): void {
  }

  addConsejo(){
    alert('consejo')
  }

  addPregunta(){
    alert('pregunta')

  }

  addHistorico(){
    alert('historico')

  }

}
