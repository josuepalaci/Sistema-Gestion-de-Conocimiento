import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Consejo } from "../models/consejo.model";

@Injectable({
  providedIn: 'root'
})
export class ConsejosService {

  consejosColeccion: AngularFirestoreCollection<Consejo>;
  consejoDoc: AngularFirestoreDocument<Consejo>;
  consejos: Observable<Consejo[]>;
  consejo: Observable<Consejo>;

  constructor(private db: AngularFirestore) { 
    this.consejosColeccion = db.collection('consejos', ref => ref.orderBy('fecha','asc'));
  }

  // ----------- PROCESOS CRUD -------------------------------

  getConsejos(): Observable<Consejo[]>{

    this.consejos = this.consejosColeccion.snapshotChanges().pipe(
      map(cambios => {
        return cambios.map(accion => {
          const datos = accion.payload.doc.data() as Consejo;
          datos.id = accion.payload.doc.id;
          return datos;
        })
      })
    );
    return this.consejos;
  } 

  addConsejo(consejo: Consejo){
    this.consejosColeccion.add(consejo);
  }

  getConsejo(id: string){
    this.consejoDoc = this.db.doc<Consejo>(`consejos/${id}`);
    this.consejo = this.consejoDoc.snapshotChanges().pipe(
      map( accion => {
        if(accion.payload.exists === false){
          return null;
        } else {
          const datos = accion.payload.data() as Consejo;
          datos.id = accion.payload.id;
          return datos;
        }
      })
    );
    return this.consejo;
  }

  updateConsejo(consejo: Consejo){
    this.consejoDoc = this.db.doc(`consejos/${consejo.id}`);
    this.consejoDoc.update(consejo);
  }

  deleteConsejo(consejo: Consejo){
    this.consejoDoc = this.db.doc(`consejos/${consejo.id}`);
    this.consejoDoc.delete();
  }

}
