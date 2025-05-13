import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class UserTypeGuard implements CanActivate {
  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  canActivate(): boolean {
    const userType = this.loginService.getUserType();
    
    if (!userType) {
      this.router.navigate(['/login']);
      return false;
    }

    const currentRoute = this.router.url;
    
    if (userType === 'PROFESSOR' && !currentRoute.startsWith('/professor')) {
      this.router.navigate(['/professor/dashboard']);
      return false;
    }

    if (userType === 'ALUNO' && !currentRoute.startsWith('/aluno')) {
      this.router.navigate(['/aluno/dashboard']);
      return false;
    }

    return true;
  }
} 