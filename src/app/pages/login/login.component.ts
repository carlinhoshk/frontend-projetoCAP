import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, FormRecord, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';

interface LoginForm {
  email: FormControl,
  password: FormControl
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers: [
    LoginService
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup<LoginForm>;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastrService
  ){
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  submit(){
    if (this.loginForm.valid) {
      this.loginService.login(
        this.loginForm.value.email!,
        this.loginForm.value.password!
      ).subscribe({
        next: () => {
          this.toastService.success("Login realizado com sucesso!");
        },
        error: (error) => {
          console.error('Erro no login:', error);
          this.toastService.error(error.message || "Erro ao fazer login. Verifique suas credenciais.");
        }
      });
    } else {
      if (this.loginForm.get('email')?.errors?.['required']) {
        this.toastService.error("Por favor, informe seu email.");
      } else if (this.loginForm.get('email')?.errors?.['email']) {
        this.toastService.error("Por favor, informe um email válido.");
      } else if (this.loginForm.get('password')?.errors?.['required']) {
        this.toastService.error("Por favor, informe sua senha.");
      } else if (this.loginForm.get('password')?.errors?.['minlength']) {
        this.toastService.error("A senha deve ter pelo menos 6 caracteres.");
      } else {
        this.toastService.error("Por favor, preencha todos os campos corretamente.");
      }
    }
  }

  navigate(){
    this.router.navigate(["signup"])
  }
}