import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule, SETTINGS } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DireccionEjecutivaComponent } from './componentes/direccion-ejecutiva/direccion-ejecutiva.component';
import { ProblemasSolucionesComponent } from './componentes/problemas-soluciones/problemas-soluciones.component';
import { ConsejosComponent } from './componentes/consejos/consejos.component';
import { HistoricosComponent } from './componentes/historicos/historicos.component';
import { CabeceroComponent } from './componentes/cabecero/cabecero.component';
import { PiePaginaComponent } from './componentes/pie-pagina/pie-pagina.component';
import { ErrorComponent } from './componentes/error/error.component';
import { LoginComponent } from './componentes/login/login.component';
import { AgregarComponent } from './componentes/agregar/agregar.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { EditarComponent } from './componentes/editar/editar.component';
import { ConfigComponent } from './componentes/config/config.component';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    DireccionEjecutivaComponent,
    ProblemasSolucionesComponent,
    ConsejosComponent,
    HistoricosComponent,
    CabeceroComponent,
    PiePaginaComponent,
    ErrorComponent,
    LoginComponent,
    AgregarComponent,
    RegistroComponent,
    InicioComponent,
    EditarComponent,
    ConfigComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firestore, 'SDGDC'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FlashMessagesModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    { provide: SETTINGS, useValue:{}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
