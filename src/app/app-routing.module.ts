import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProfessorDashboardComponent } from './components/professor-dashboard/professor-dashboard.component';
import { AlunoDashboardComponent } from './components/aluno-dashboard/aluno-dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { PaginaProfessorComponent } from './pages/pagina-professor/pagina-professor.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'professor/dashboard',
    component: ProfessorDashboardComponent,
    canActivate: [AuthGuard],
    data: { role: 'ROLE_PROFESSOR' }
  },
  {
    path: 'pagina-professor',
    component: PaginaProfessorComponent,
    canActivate: [AuthGuard],
    data: { role: 'ROLE_PROFESSOR' }
  },
  {
    path: 'professor/turmas',
    component: PaginaProfessorComponent, // Temporariamente usando o mesmo componente
    canActivate: [AuthGuard],
    data: { role: 'ROLE_PROFESSOR' }
  },
  {
    path: 'professor/atividades',
    component: PaginaProfessorComponent, // Temporariamente usando o mesmo componente
    canActivate: [AuthGuard],
    data: { role: 'ROLE_PROFESSOR' }
  },
  {
    path: 'aluno/dashboard',
    component: AlunoDashboardComponent,
    canActivate: [AuthGuard],
    data: { role: 'ROLE_ALUNO' }
  },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 