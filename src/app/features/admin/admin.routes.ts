import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./panel/panel').then(m => m.Panel)
  },
  {
    path: 'nuevo',
    loadComponent: () => import('./formulario/formulario').then(m => m.Formulario)
  },
  {
    path: 'editar/:id',
    loadComponent: () => import('./formulario/formulario').then(m => m.Formulario)
  },
];
