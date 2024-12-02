import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { RegisterResponse } from '../interfaces/registerResponse';
import { RouteService } from './route.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5000/api/auth';

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private http: HttpClient,
    private router: Router,
    private routeService: RouteService) {}

  register(user: { username: string; email: string; password: string }) {

    return this.http.post<RegisterResponse>(`${this.apiUrl}/register`, user);
  }
      
  getToken(): string | null {
    // Skontrolujeme, či sme v prehliadači
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('authToken');
    }
    return null; // Na serveri nie je localStorage dostupné
  }

  login(email: string, password: string) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password });
  }

  saveToken(token: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('authToken', token);
    }
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('authToken'); // Používame rovnaký kľúč ako v saveToken()
    }
    this.routeService.clearLastVisitedPage(); // Clear last visited page
    this.router.navigate(['/']); // Redirect to home 
  }  

  isLoggedIn(): boolean {
    const token = this.getToken();
    return token !== null;
  }
  
}
