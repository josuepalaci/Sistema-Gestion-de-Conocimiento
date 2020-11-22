import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/firestore";
import { database } from 'firebase';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Direccion } from "../models/direccion.model";

@Injectable({
  providedIn: 'root'
})
export class DireccionService {

  direccionColeccion: AngularFirestoreCollection<Direccion>;
  direccionDoc: AngularFirestoreDocument<Direccion>;
  direccionTodo: Observable<Direccion[]>;
  direccion: Observable<Direccion>;

  constructor(private db: AngularFirestore) {
    this.direccionColeccion = db.collection('direccion', ref => ref.orderBy('puesto','desc'));
  }

  //--------------- PROCESOS CRUD ----------------------------------

  getPersonal(): Observable<Direccion[]>{
    this.direccionTodo = this.direccionColeccion.snapshotChanges().pipe(map( cambios => {
      return cambios.map( accion => {
        const datos = accion.payload.doc.data() as Direccion;
        datos.id = accion.payload.doc.id;
        return datos;
      })
    }));
    return this.direccionTodo;
  }

  getPersona(id: string){
    this.direccionDoc = this.db.doc<Direccion>(`direccion/${id}`);
    this.direccion = this.direccionDoc.snapshotChanges().pipe(
      map(accion => {
        if(accion.payload.exists === false){
          return null;
        } else {
          const datos = accion.payload.data() as Direccion;
          datos.id = accion.payload.id;
          return datos;
        }
      })
    );
    return this.direccion;
  }

  addPersona(persona: Direccion){
    this.direccionColeccion.add(persona);
  }

  updateDireccion(persona: Direccion){
    this.direccionDoc = this.db.doc(`direccion/${persona.id}`);
    this.direccionDoc.update(persona);
  }

  deleteDireccion(perso: Direccion){
    this.direccionDoc = this.db.doc(`direccion/${perso.id}`);
    this.direccionDoc.delete();
  }

}
