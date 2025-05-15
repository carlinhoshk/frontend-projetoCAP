import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
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

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.professorEmail = localStorage.getItem('userEmail');
  }

  logout(): void {
    this.loginService.logout();
  }

  navegarParaTurmas(): void {
    // Navegação para a página de turmas - atualize conforme a rota real
    this.router.navigate(['/professor/turmas']);
  }

  navegarParaAtribuicaoNotas(): void {
    // Navegação para a página de atribuição de notas
    this.router.navigate(['/pagina-professor']);
  }

  navegarParaAtividadesRecentes(): void {
    // Navegação para a página de atividades recentes - atualize conforme a rota real
    this.router.navigate(['/professor/atividades']);
  }
} 