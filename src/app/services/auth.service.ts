import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/users';
  private isAuthenticated = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient, private router: Router) {}

  private hasToken(): boolean {
    return typeof window !== 'undefined' && !!localStorage.getItem('token');
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData).pipe(
        tap((response: any) => {
            if (response.user?.token) {
              localStorage.setItem('token', response.user.token);
              localStorage.setItem('user', JSON.stringify(response.user));
              this.isAuthenticated.next(true);
            }
          })
    );
  }

  login(credentials: {email: string, password: string}): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
        tap((response: any) => {
            if (response.user?.token) {
              localStorage.setItem('token', response.user.token);
              localStorage.setItem('user', JSON.stringify(response.user));
              this.isAuthenticated.next(true);
            }
          })
    );
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }


  resetPassword(payload: { email: string; newPassword: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, payload);
  }

  verifyResetCode(payload: { email: string; resetCode: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify-reset-code`, payload);
  }

  logout(): Observable<any> {
    // First, clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Call the backend logout endpoint
    return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
      tap(() => {
        // Update the authentication state
        this.isAuthenticated.next(false);
        // Navigate to login page after successful logout
        this.router.navigate(['/login']);
      }),
      catchError((error: HttpErrorResponse) => {
        // Even if the backend call fails, we still want to clear the local state
        this.isAuthenticated.next(false);
        this.router.navigate(['/login']);
        return throwError(() => new Error(error.message || 'An error occurred during logout'));
      })
    );
  }

  isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  getCurrentUser(): any {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  getToken(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  }
}
