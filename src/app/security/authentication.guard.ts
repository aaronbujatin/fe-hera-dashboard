import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, catchError } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  if (authService.getToken) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
