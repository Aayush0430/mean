import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'mock_auth_token';
  private token = 'anejnsnnesnfkesnkfjwt2u38dhi83jd';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  loginTokenStore(email: string): Observable<any> {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.tokenKey, this.token + email);
    }
    return of({ token: this.token }).pipe(delay(500));
  }

  logout(): void {
    // Only remove token if in browser
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.tokenKey);
    }
  }

  isLoggedIn(): boolean {
    // Only check localStorage if in browser, otherwise return false
    return (
      isPlatformBrowser(this.platformId) &&
      !!localStorage.getItem(this.tokenKey)
    );
  }

  getToken(): string | null {
    // Only get token if in browser, otherwise return null
    return isPlatformBrowser(this.platformId)
      ? localStorage.getItem(this.tokenKey)
      : null;
  }
}
