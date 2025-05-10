import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'professor',
        canActivate: [AuthGuard],
        data: { role: 'ROLE_PROFESSOR' },
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                loadComponent: () => import('./components/professor-dashboard/professor-dashboard.component').then(m => m.ProfessorDashboardComponent)
            }
        ]
    },
    {
        path: 'aluno',
        canActivate: [AuthGuard],
        data: { role: 'ROLE_ALUNO' },
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                loadComponent: () => import('./components/aluno-dashboard/aluno-dashboard.component').then(m => m.AlunoDashboardComponent)
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];
