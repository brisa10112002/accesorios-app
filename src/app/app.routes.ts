import { Routes } from '@angular/router';
import { Principal } from './components/principal/principal';
import { Listado } from './components/listado/listado';
import { Login } from './components/login/login';

export const routes: Routes = [
  { path: 'principal', component: Principal },
  { path: 'listado', component: Listado },
  { path: 'login', component: Login },
  { path: '', redirectTo: 'principal', pathMatch: 'full' },
];