import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-professor-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './professor-dashboard.component.html',
  styleUrls: ['./professor-dashboard.component.css']
})
export class ProfessorDashboardComponent implements OnInit {
  professorEmail: string | null = null;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.professorEmail = localStorage.getItem('userEmail');
  }

  logout(): void {
    this.loginService.logout();
  }
} 