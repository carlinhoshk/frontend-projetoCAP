import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PaginaProfessorComponent } from './pages/pagina-professor/pagina-professor.component';

export const routes: Routes = [
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: 'professor',
        component: PaginaProfessorComponent
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    }
];
