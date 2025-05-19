import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Professor } from '../types/pontuacao.types';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {
  private apiUrl = `${environment.apiUrl}/api/auth`;

  constructor(private http: HttpClient) {}

  getProfessor(id: number): Observable<Professor> {
    return this.http.get<Professor>(`${this.apiUrl}/api/professores/${id}`);
  }
} 