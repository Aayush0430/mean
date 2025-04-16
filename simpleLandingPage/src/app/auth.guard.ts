import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
} from '@angular/router';
import { AuthService } from './services/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.authService.isLoggedIn();
    const authPages = ['app-login', 'app-signup']; // Pages to restrict after login

    if (isLoggedIn && authPages.includes(route.routeConfig?.path || '')) {
      this.router.navigate(['/dashboard']); // Redirect logged-in users
      return false;
    }

    if (!isLoggedIn && !authPages.includes(route.routeConfig?.path || '')) {
      this.router.navigate(['/app-login']); // Redirect unauthenticated users
      return false;
    }

    return true;
  }
}
