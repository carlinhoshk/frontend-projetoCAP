import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = '/api/students'; // URL da sua API

  constructor(private http: HttpClient) { }

  assignPoints(studentId: string, points: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${studentId}/assign-points`, { points });
  }
} 