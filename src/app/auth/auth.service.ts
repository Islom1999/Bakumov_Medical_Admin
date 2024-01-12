import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from 'src/types/login.type';
import { Tokens } from 'src/types/token.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(data: Login) {
    return this.http
      .post<Tokens>(`${environment.apiUrl}/auth/signin/local`, data)
      .pipe(
        tap((tokens) => {
          if (tokens.access_token && tokens.refresh_token) {
            this.setTokens(tokens);
          }
        })
      );
  }

  refreshToken() {
    return this.http
      .post<Tokens>(`${environment.apiUrl}/auth/refresh`, {})
      .pipe(
        tap((tokens) => {
          console.log('tokens', tokens);
          if (tokens.access_token && tokens.refresh_token) {
            this.setTokens(tokens);
          }
        })
      );
  }

  getToken() {
    const access_token = localStorage.getItem('access_token');
    const refresh_token = localStorage.getItem('refresh_token');

    return { access_token, refresh_token };
  }

  isAuthenticated(){
    const token = this.getToken()
    if (token.access_token && token.refresh_token) return true
    else return false 
  }

  private setTokens(tokens: Tokens) {
    localStorage.setItem('access_token', tokens.access_token);
    localStorage.setItem('refresh_token', tokens.refresh_token);
  }
}
