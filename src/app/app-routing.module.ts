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

import { AuthGuard } from "../../src/app/guard/auth.guard";
import { EditarComponent } from './componentes/editar/editar.component';

const routes: Routes = [
  {path: '', component: InicioComponent , canActivate: [AuthGuard]},
  {path: 'direccion', component: DireccionEjecutivaComponent , canActivate: [AuthGuard]},
  {path: 'historicos', component: HistoricosComponent , canActivate: [AuthGuard]},
  {path: 'consejos', component: ConsejosComponent , canActivate: [AuthGuard]},
  {path: 'problemas', component: ProblemasSolucionesComponent , canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent , },
  {path: 'registro', component: RegistroComponent , },
  {path: 'agregar', component: AgregarComponent , canActivate: [AuthGuard]},
  {path: 'editar/:area/:id', component: EditarComponent , canActivate: [AuthGuard]},

  {path: '**', component: ErrorComponent , },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
