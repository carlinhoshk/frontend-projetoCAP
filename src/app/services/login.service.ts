import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response.type';
import { tap, catchError, throwError, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = `${environment.apiUrl}/api/auth`;

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  private decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Erro ao decodificar token:', error);
      return null;
    }
  }

  login(email: string, password: string) {
    // Limpa qualquer token antigo antes de tentar um novo login
    this.logout();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    console.log('Enviando requisição de login para:', `${this.apiUrl}/login`);

    return this.httpClient.post<{token: string}>(
      `${this.apiUrl}/login`, 
      { email, password },
      { headers }
    ).pipe(
      map(response => {
        if (!response || !response.token) {
          throw new Error('Resposta inválida do servidor');
        }

        const decodedToken = this.decodeToken(response.token);
        if (!decodedToken) {
          throw new Error('Token inválido');
        }

        // Extrai as informações do token
        const userType = decodedToken.roles?.[0]?.toUpperCase() || 'ALUNO';
        const userEmail = decodedToken.sub;

        return {
          token: response.token,
          userType: userType,
          email: userEmail
        } as LoginResponse;
      }),
      tap((response) => {
        console.log('Resposta processada:', response);
        
        // Salva os dados do usuário
        localStorage.setItem('token', response.token);
        localStorage.setItem('userType', response.userType);
        localStorage.setItem('userEmail', response.email);
        
        // Redireciona baseado no tipo de usuário
        if (response.userType === 'PROFESSOR') {
          this.router.navigate(['/professor/dashboard']);
        } else if (response.userType === 'ALUNO') {
          this.router.navigate(['/aluno/dashboard']);
        } else {
          // Caso o tipo de usuário não seja reconhecido
          this.logout();
          throw new Error('Tipo de usuário não reconhecido');
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Erro completo:', error);
        
        let errorMessage = 'Erro ao fazer login. ';
        
        if (error.status === 401) {
          errorMessage += 'Email ou senha inválidos.';
        } else if (error.status === 0) {
          errorMessage += 'Não foi possível conectar ao servidor. Verifique se o servidor está rodando.';
        } else if (error.error instanceof ErrorEvent) {
          // Erro do cliente
          errorMessage += `Erro: ${error.error.message}`;
        } else {
          // Erro do servidor
          errorMessage += `Erro ${error.status}: ${error.error?.message || 'Ocorreu um erro inesperado'}`;
        }
        
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('userEmail');
    this.router.navigate(['/login']);
  }

  getUserType(): string | null {
    return localStorage.getItem('userType');
  }

  isProfessor(): boolean {
    return this.getUserType() === 'PROFESSOR';
  }

  isAluno(): boolean {
    return this.getUserType() === 'ALUNO';
  }

  // Método para verificar se o usuário está autenticado
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Método para obter o token
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}