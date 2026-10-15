import { Routes } from '@angular/router';

export const CATALOGO_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./listado/listado').then(m => m.Listado)
  },
];
