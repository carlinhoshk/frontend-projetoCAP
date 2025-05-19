import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-professor-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard-container">
      <header>
        <h1>Dashboard do Professor</h1>
        <button (click)="logout()">Sair</button>
      </header>
      <main>
        <p>Bem-vindo, {{ userEmail }}!</p>
        <!-- Adicione aqui o conteúdo do dashboard do professor -->
      </main>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 20px;
    }
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    button {
      padding: 8px 16px;
      background-color: #ff4444;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background-color: #cc0000;
    }
  `]
})
export class DashboardComponent {
  userEmail: string | null;
  userId: number | null;

  constructor(private loginService: LoginService) {
    const currentUser = this.loginService.getCurrentUser();
    this.userEmail = currentUser?.email || null;
    this.userId = currentUser?.id || null;
  }

  logout() {
    this.loginService.logout();
  }
}