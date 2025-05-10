import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-aluno-dashboard',
  templateUrl: './aluno-dashboard.component.html',
  styleUrls: ['./aluno-dashboard.component.css']
})
export class AlunoDashboardComponent implements OnInit {
  alunoEmail: string | null = null;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.alunoEmail = localStorage.getItem('userEmail');
  }

  logout(): void {
    this.loginService.logout();
  }
} 