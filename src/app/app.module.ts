import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
    InicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
