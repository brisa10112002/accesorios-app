import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const adminGuard: CanMatchFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.getRol() === 'admin') {
    return true;
  }

  if (!authService.estaLogueado()) {
    return router.createUrlTree(['/login']);
  }

  return router.createUrlTree(['/principal']);
};
