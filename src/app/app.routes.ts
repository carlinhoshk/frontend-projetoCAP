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
        data: { userType: 'PROFESSOR' },
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                loadComponent: () => import('./pages/professor/dashboard/dashboard.component').then(m => m.DashboardComponent)
            }
        ]
    },
    {
        path: 'aluno',
        canActivate: [AuthGuard],
        data: { userType: 'ALUNO' },
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                loadComponent: () => import('./pages/aluno/dashboard/dashboard.component').then(m => m.DashboardComponent)
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];
