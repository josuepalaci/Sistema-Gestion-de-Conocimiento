import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {


  userColeccion: AngularFirestoreCollection<User>;
  userDoc: AngularFirestoreDocument<User>;
  users: Observable<User[]>;
  user: Observable<User>;


  constructor(
    private db: AngularFirestore
  ) { 
    this.userColeccion = db.collection('user', ref => ref.orderBy('iduser','asc'));
  }

  // ----------- PROCESOS CRUD -------------------------------

  getUsers(): Observable<User[]>{
    this.users = this.userColeccion.snapshotChanges().pipe(map(
      cambio => {
        return cambio.map(accion => {
          const datos = accion.payload.doc.data() as User;
          datos.id = accion.payload.doc.id;
          return datos;
        })
      }
    ));
    return this.users;
  }

  addUser(user: User){
    this.userColeccion.add(user);
  }

  getUser(id: string){
    this.userDoc = this.db.doc<User>(`user/${id}`);
    this.user = this.userDoc.snapshotChanges().pipe(map(
      accion => {
        if(accion.payload.exists === false){
          return null;
        } else {
          const datos = accion.payload.data() as User;
          datos.id = accion.payload.id;
          return datos;
        }
      }
    ));
    return this.user;
  }


  updateUser(user: User){
    this.userDoc = this.db.doc(`user/${user.id}`);
    this.userDoc.update(user);
  }

  deleteUser(user: User){
    this.userDoc = this.db.doc(`user/${user.id}`);
    this.userDoc.delete();
  }

}
