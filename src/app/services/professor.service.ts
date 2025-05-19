import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Professor } from '../types/pontuacao.types';
import { environment } from '../../environments/environment';
import { TurmaDTO } from '../types/turma.types';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {
  private apiUrl = `${environment.apiUrl}/api/professores`;

  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Professor[]> {
    return this.http.get<Professor[]>(`${this.apiUrl}`);
  }

  getProfessor(id: number): Observable<Professor> {
    return this.http.get<Professor>(`${this.apiUrl}/${id}`);
  }

  criar(professor: Professor): Observable<Professor> {
    return this.http.post<Professor>(`${this.apiUrl}`, professor);
  }

  atualizar(id: number, professor: Professor): Observable<Professor> {
    return this.http.put<Professor>(`${this.apiUrl}/${id}`, professor);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getTurmasPorProfessor(professorId: number): Observable<TurmaDTO[]> {
    return this.http.get<TurmaDTO[]>(`${this.apiUrl}/${professorId}/turmas`);
  }
} 