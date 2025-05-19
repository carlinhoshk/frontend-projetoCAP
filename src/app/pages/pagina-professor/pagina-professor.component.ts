import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormArray, FormControl } from '@angular/forms';
import { AlunoService } from '../../services/aluno.service';
import { ProfessorService } from '../../services/professor.service';
import { LoginService } from '../../services/login.service';
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
  notasForm: FormGroup;
  alunos: Aluno[] = [];
  professor: Professor | null = null;
  tiposPonto = Object.values(TipoPonto);
  alunosSelecionados: Set<number> = new Set();
  salvandoNotas = false;
  mensagemSucesso = '';
  mensagemErro = '';
  professorId: number | null = null;
  
  constructor(
    private fb: FormBuilder,
    private alunoService: AlunoService,
    private professorService: ProfessorService,
    private loginService: LoginService
  ) {
    this.form = this.fb.group({
      observacaoGeral: ['', Validators.required],
      dataRegistro: [new Date().toISOString().split('T')[0], Validators.required]
    });

    this.notasForm = this.fb.group({
      alunos: this.fb.array([])
    });
  }

  ngOnInit() {
    this.carregarDados();
  }

  private carregarDados() {
    // Obter ID do professor a partir do token JWT/localStorage
    const currentUser = this.loginService.getCurrentUser();
    
    if (currentUser) {
      // Agora o ID está disponível diretamente no currentUser
      this.professorId = currentUser.id;
      if (this.professorId) {
        this.professorService.getProfessor(this.professorId).subscribe(
          professor => this.professor = professor,
          error => {
            console.error('Erro ao buscar dados do professor:', error);
            this.mensagemErro = 'Erro ao buscar dados do professor.';
          }
        );
      } else {
        console.error('ID do professor não encontrado no usuário logado');
        this.mensagemErro = 'Não foi possível encontrar o ID do professor. Por favor, tente novamente.';
      }
    } else {
      console.error('Usuário não está logado');
      this.mensagemErro = 'Usuário não autenticado.';
    }

    this.alunoService.getAlunos().subscribe(
      alunos => {
        this.alunos = alunos;
        this.inicializarFormulariosAlunos();
      },
      error => {
        console.error('Erro ao buscar alunos:', error);
        this.mensagemErro = 'Erro ao buscar alunos.';
      }
    );
  }

  get alunosFormArray(): FormArray {
    return this.notasForm.get('alunos') as FormArray;
  }

  inicializarFormulariosAlunos() {
    this.alunos.forEach(aluno => {
      const alunoGroup = this.fb.group({
        alunoId: [aluno.id],
        nome: [aluno.nome],
        matricula: [aluno.matricula],
        selecionado: [false],
        pontuacoes: this.fb.group({})
      });
      
      this.tiposPonto.forEach(tipo => {
        (alunoGroup.get('pontuacoes') as FormGroup).addControl(
          tipo, 
          new FormControl(0, [Validators.min(0), Validators.max(10)])
        );
      });
      
      this.alunosFormArray.push(alunoGroup);
    });
  }

  toggleSelecaoAluno(index: number) {
    const controle = this.alunosFormArray.at(index).get('selecionado');
    controle?.setValue(!controle.value);
  }

  selecionarTodos() {
    const todos = this.alunosFormArray.controls.every(control => control.get('selecionado')?.value);
    this.alunosFormArray.controls.forEach(control => {
      control.get('selecionado')?.setValue(!todos);
    });
  }

  estaoTodosSelecionados(): boolean {
    return this.alunosFormArray.controls.every(control => control.get('selecionado')?.value);
  }

  salvarNotas() {
    if (!this.professor || !this.form.valid) return;
    
    this.mensagemSucesso = '';
    this.mensagemErro = '';
    this.salvandoNotas = true;

    const alunosSelecionados = this.alunosFormArray.controls
      .filter(control => control.get('selecionado')?.value)
      .map(control => {
        const alunoId = control.get('alunoId')?.value;
        const pontuacoesForm = control.get('pontuacoes') as FormGroup;
        
        const pontuacoes: Pontuacao[] = Object.keys(pontuacoesForm.controls)
          .map(tipo => ({
            tipo: tipo as TipoPonto,
            pontos: pontuacoesForm.get(tipo)?.value || 0
          }))
          .filter(p => p.pontos > 0);
        
        return {
          alunoId,
          pontuacoes
        } as AlunoPontos;
      })
      .filter(ap => ap.pontuacoes.length > 0);

    if (alunosSelecionados.length === 0) {
      this.mensagemErro = 'Selecione pelo menos um aluno e atribua pelo menos uma nota.';
      this.salvandoNotas = false;
      return;
    }

    const dados: PontosFormData = {
      professorId: this.professor.id,
      alunosPontos: alunosSelecionados,
      observacaoGeral: this.form.get('observacaoGeral')?.value || '',
      dataRegistro: new Date(this.form.get('dataRegistro')?.value)
    };

    this.alunoService.salvarPontos(dados).subscribe(
      response => {
        console.log('Notas salvas com sucesso', response);
        this.mensagemSucesso = 'Notas atribuídas com sucesso!';
        this.salvandoNotas = false;
        
        // Limpar as notas dos alunos selecionados
        this.alunosFormArray.controls
          .filter(control => control.get('selecionado')?.value)
          .forEach(control => {
            const pontuacoesForm = control.get('pontuacoes') as FormGroup;
            Object.keys(pontuacoesForm.controls).forEach(tipo => {
              pontuacoesForm.get(tipo)?.setValue(0);
            });
          });
      },
      error => {
        console.error('Erro ao salvar notas', error);
        this.mensagemErro = 'Erro ao salvar as notas. Por favor, tente novamente.';
        this.salvandoNotas = false;
      }
    );
  }

  atribuirNotaParaTodos(tipo: TipoPonto, valor: number) {
    this.alunosFormArray.controls
      .filter(control => control.get('selecionado')?.value)
      .forEach(control => {
        const pontuacoesForm = control.get('pontuacoes') as FormGroup;
        pontuacoesForm.get(tipo)?.setValue(valor);
      });
  }
}