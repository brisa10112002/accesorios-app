import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'principal',
    loadComponent: () => import('./features/inicio/principal').then(m => m.Principal)
  },
  {
    path: 'catalogo',
    loadChildren: () => import('./features/catalogo/catalogo.routes').then(m => m.CATALOGO_ROUTES)
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES)
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login').then(m => m.Login)
  },
  {
    path: 'carrito',
    loadComponent: () => import('./features/carrito/carrito').then(m => m.Carrito)
  },
  { path: '', redirectTo: 'principal', pathMatch: 'full' },
  {
    path: '**',
    loadComponent: () => import('./features/no-encontrado/no-encontrado').then(m => m.NoEncontrado)
  },
];
