import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.loginService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    const requiredUserType = route.data['userType'];
    if (requiredUserType) {
      if (requiredUserType === 'PROFESSOR' && !this.loginService.isProfessor()) {
        this.router.navigate(['/aluno/dashboard']);
        return false;
      }
      if (requiredUserType === 'ALUNO' && !this.loginService.isAluno()) {
        this.router.navigate(['/professor/dashboard']);
        return false;
      }
    }

    return true;
  }
} 