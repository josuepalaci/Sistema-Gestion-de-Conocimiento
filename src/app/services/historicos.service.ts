import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { Action } from 'rxjs/internal/scheduler/Action';
import { map } from "rxjs/operators";
import { Historico } from "../models/historico.model";

@Injectable({
  providedIn: 'root'
})
export class HistoricosService {

  historicosColeccion: AngularFirestoreCollection<Historico>;
  historicoDoc: AngularFirestoreDocument<Historico>;
  historicos: Observable<Historico[]>;
  historico: Observable<Historico>;

  constructor(
    private db: AngularFirestore
  ) {
    this.historicosColeccion = db.collection('historicos', ref => ref.orderBy('fecha','asc'));
  }

  // ------- PROCESOS CRUD -------------------------------

  getHistoricos(): Observable<Historico[]>{

    this.historicos = this.historicosColeccion.snapshotChanges().pipe(
      map(
        cambios => {
          return cambios.map(
            accion => {
              const datos = accion.payload.doc.data() as Historico;
              datos.id = accion.payload.doc.id;
              return datos;
            }
          )
        }
      )
    );
    return this.historicos;
  }

  addHistorico(addhisto: Historico){
    this.historicosColeccion.add(addhisto);
  }

  getHistorico(id: string){
    this.historicoDoc = this.db.doc<Historico>(`historicos/${id}`);
    this.historico = this.historicoDoc.snapshotChanges().pipe(
      map( accion => {
        if(accion.payload.exists === false){
          return null;
        } else {
          const datos = accion.payload.data() as Historico;
           datos.id = accion.payload.id;
           return datos;
        }
      })
    );
    return this.historico;
  }

  updateHistorico(uHistorico: Historico){
    this.historicoDoc = this.db.doc(`historicos/${uHistorico.id}`);
    this.historicoDoc.update(uHistorico);
  }

  deleteHistorico(dHistorico: Historico){
    this.historicoDoc = this.db.doc(`historicos/${dHistorico.id}`);
    this.historicoDoc.delete();
  }

}
