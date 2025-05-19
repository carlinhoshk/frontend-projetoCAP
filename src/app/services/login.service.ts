import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

interface AuthResponse {
  token: string;
  email: string;
  roles: string[];
  nome: string;
  id: number; // Novo campo para armazenar o id retornado pelo backend
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = `${environment.apiUrl}/api/auth`;
  private currentUserSubject = new BehaviorSubject<AuthResponse | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {
    // Recuperar usuário do localStorage ao iniciar
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

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

  login(email: string, password: string): Observable<AuthResponse> {
    // Limpa qualquer token antigo antes de tentar um novo login
    this.logout();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    console.log('Enviando requisição de login para:', `${this.apiUrl}/login`);

    return this.httpClient.post<AuthResponse>(
      `${this.apiUrl}/login`, 
      { email, password },
      { headers }
    ).pipe(
      tap(authResponse => {
        if (!authResponse || !authResponse.token) {
          throw new Error('Resposta inválida do servidor');
        }
        // Salvar no localStorage
        localStorage.setItem('currentUser', JSON.stringify(authResponse));
        this.currentUserSubject.next(authResponse);
        // Redireciona baseado no tipo de usuário
        if (authResponse.roles.includes('ROLE_PROFESSOR')) {
          this.router.navigate(['/professor/dashboard']);
        } else if (authResponse.roles.includes('ROLE_ALUNO')) {
          this.router.navigate(['/aluno/dashboard']);
        } else {
          console.error('Roles não reconhecidas:', authResponse.roles);
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
          errorMessage += `Erro: ${error.error.message}`;
        } else {
          errorMessage += `Erro ${error.status}: ${error.error?.message || 'Ocorreu um erro inesperado'}`;
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isProfessor(): boolean {
    return this.currentUserSubject.value?.roles.includes('ROLE_PROFESSOR') ?? false;
  }

  isAluno(): boolean {
    return this.currentUserSubject.value?.roles.includes('ROLE_ALUNO') ?? false;
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  getToken(): string | null {
    return this.currentUserSubject.value?.token ?? null;
  }

  getCurrentUser(): AuthResponse | null {
    return this.currentUserSubject.value;
  }
}