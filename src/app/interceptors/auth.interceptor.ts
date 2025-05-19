import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();
    console.log(`[AuthInterceptor] Request para: ${request.url}`);
    console.log(`[AuthInterceptor] Token presente: ${!!token}`);

    // Não adiciona o token para a rota de login
    if (request.url.includes('/api/auth/login')) {
      console.log('[AuthInterceptor] Requisição de login, sem token');
      return next.handle(request);
    }

    if (token) {
      const cloned = request.clone({
        headers: request.headers
          .set('Authorization', `Bearer ${token}`)
          .set('Content-Type', 'application/json')
      });
      console.log('[AuthInterceptor] Token adicionado à requisição');
      return next.handle(cloned).pipe(
        tap(event => {
          console.log(`[AuthInterceptor] Resposta: `, event);
        }),
        catchError((error: HttpErrorResponse) => {
          console.error(`[AuthInterceptor] Erro HTTP: ${error.status} - ${error.message}`);
          if (error.status === 401) {
            console.log('[AuthInterceptor] Erro 401, redirecionando para login');
            // Token inválido ou expirado
            this.authService.logout();
            this.router.navigate(['/login']);
          }
          return throwError(() => error);
        })
      );
    }

    console.log('[AuthInterceptor] Sem token, requisição original enviada');
    return next.handle(request);
  }
} 