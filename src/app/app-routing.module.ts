import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarComponent } from './componentes/agregar/agregar.component';
import { ConsejosComponent } from './componentes/consejos/consejos.component';
import { DireccionEjecutivaComponent } from './componentes/direccion-ejecutiva/direccion-ejecutiva.component';
import { ErrorComponent } from './componentes/error/error.component';
import { HistoricosComponent } from './componentes/historicos/historicos.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { ProblemasSolucionesComponent } from './componentes/problemas-soluciones/problemas-soluciones.component';
import { RegistroComponent } from './componentes/registro/registro.component';

const routes: Routes = [
  {path: '', component: InicioComponent , },
  {path: 'direccion', component: DireccionEjecutivaComponent , },
  {path: 'historicos', component: HistoricosComponent , },
  {path: 'consejos', component: ConsejosComponent , },
  {path: 'problemas', component: ProblemasSolucionesComponent , },
  {path: 'login', component: LoginComponent , },
  {path: 'registro', component: RegistroComponent , },
  {path: 'agregar', component: AgregarComponent , },

  {path: '**', component: ErrorComponent , },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
