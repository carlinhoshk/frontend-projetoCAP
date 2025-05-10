import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ProfessorDashboardComponent } from './components/professor-dashboard/professor-dashboard.component';
import { AlunoDashboardComponent } from './components/aluno-dashboard/aluno-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfessorDashboardComponent,
    AlunoDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { } 