import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  loginAuthentication(userName) {
    localStorage.setItem('token', userName  );
    this.router.navigate(['/home']);

  }

  isAuthenticated() {
    return localStorage.getItem('token') != null;
  }

  logout(): void {
    this.clearStorage();
    this.router.navigate(['/login']);
  }

  clearStorage(): void {
    localStorage.clear();
  }
}
