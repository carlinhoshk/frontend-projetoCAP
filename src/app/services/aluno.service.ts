import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aluno, PontosFormData } from '../types/pontuacao.types';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  private apiUrl = `${environment.apiUrl}/api/auth`;

  constructor(private http: HttpClient) {}

  getAlunos(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(`${this.apiUrl}/alunos`);
  }

  salvarPontos(pontos: PontosFormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/pontos`, pontos);
  }
} 