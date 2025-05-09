import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlunoService } from '../../services/aluno.service';
import { ProfessorService } from '../../services/professor.service';
import { Aluno, Professor, TipoPonto, PontosFormData, AlunoPontos, Pontuacao } from '../../types/pontuacao.types';

@Component({
  selector: 'app-pagina-professor',
  templateUrl: './pagina-professor.component.html',
  styleUrls: ['./pagina-professor.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class PaginaProfessorComponent implements OnInit {
  form: FormGroup;
  alunos: Aluno[] = [];
  professor: Professor | null = null;
  tiposPonto = Object.values(TipoPonto);
  alunosSelecionados: Set<number> = new Set();
  
  constructor(
    private fb: FormBuilder,
    private alunoService: AlunoService,
    private professorService: ProfessorService
  ) {
    this.form = this.fb.group({
      observacaoGeral: ['', Validators.required],
      dataRegistro: [new Date(), Validators.required]
    });
  }

  ngOnInit() {
    this.carregarDados();
  }

  private carregarDados() {
    // TODO: Substituir por ID do professor logado
    const professorId = 1;
    
    this.professorService.getProfessor(professorId).subscribe(
      professor => this.professor = professor
    );

    this.alunoService.getAlunos().subscribe(
      alunos => this.alunos = alunos
    );
  }

  toggleSelecaoAluno(alunoId: number) {
    if (this.alunosSelecionados.has(alunoId)) {
      this.alunosSelecionados.delete(alunoId);
    } else {
      this.alunosSelecionados.add(alunoId);
    }
  }

  selecionarTodos() {
    if (this.alunosSelecionados.size === this.alunos.length) {
      this.alunosSelecionados.clear();
    } else {
      this.alunosSelecionados = new Set(this.alunos.map(a => a.id));
    }
  }

  salvarPontos(tipo: TipoPonto, pontos: number) {
    if (!this.professor) return;

    const alunosPontos: AlunoPontos[] = Array.from(this.alunosSelecionados).map(alunoId => ({
      alunoId,
      pontuacoes: [{
        tipo,
        pontos
      }]
    }));

    const dados: PontosFormData = {
      professorId: this.professor.id,
      alunosPontos,
      observacaoGeral: this.form.get('observacaoGeral')?.value || '',
      dataRegistro: this.form.get('dataRegistro')?.value
    };

    this.alunoService.salvarPontos(dados).subscribe(
      response => {
        console.log('Pontos salvos com sucesso', response);
        // TODO: Adicionar feedback visual de sucesso
      },
      error => {
        console.error('Erro ao salvar pontos', error);
        // TODO: Adicionar feedback visual de erro
      }
    );
  }
} 