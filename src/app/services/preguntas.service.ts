import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Pregunta } from "../models/pregunta.model";

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {

  preguntasColeccion: AngularFirestoreCollection<Pregunta>;
  preguntaDoc: AngularFirestoreDocument<Pregunta>;
  preguntas: Observable<Pregunta[]>;
  pregunta: Observable<Pregunta>;

  constructor(
    private db: AngularFirestore
  ) {
    this.preguntasColeccion = db.collection('preguntas', ref => ref.orderBy('fecha','asc'));
   }

  //-------- PROCESOS CRUD ----------------------------------
   getPreguntas(): Observable<Pregunta[]>{
    //obteniendo clientes
    this.preguntas = this.preguntasColeccion.snapshotChanges()
    .pipe(
        map( cambios => {
            return cambios.map( accion => {
                const datos = accion.payload.doc.data() as Pregunta;
                datos.id = accion.payload.doc.id;
                // console.log(accion.payload.doc.data());
                    return datos;
                })
        })
    );
    // console.log(this.preguntas);
    return this.preguntas;
  }

  addPregunta(pregunta: Pregunta){
    this.preguntasColeccion.add(pregunta);
  }

  getPregunta(id: string){
    this.preguntaDoc = this.db.doc<Pregunta>(`preguntas/${id}`);
    this.pregunta = this.preguntaDoc.snapshotChanges().pipe(
      map(
        action => {
          if(action.payload.exists === false){
            return null;
          } else {
            const datos = action.payload.data() as Pregunta;
            datos.id = action.payload.id;
            return datos;
          }
        }
      )
    );
    return this.pregunta; 
  }

  updatePregunta(pregunta: Pregunta){
    this.preguntaDoc = this.db.doc(`preguntas/${pregunta.id}`);
    this.preguntaDoc.update(pregunta);
  }

  deletePregunta(pregunta: Pregunta){
    this.preguntaDoc = this.db.doc(`pregunta/${pregunta.id}`);
    this.preguntaDoc.delete();
  }

}
