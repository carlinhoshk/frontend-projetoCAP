export interface PontosFormData {
  professorId: number;
  alunosPontos: AlunoPontos[];
  observacaoGeral: string;
  dataRegistro: Date;
}

export interface AlunoPontos {
  alunoId: number;
  pontuacoes: Pontuacao[];
}

export interface Pontuacao {
  tipo: TipoPonto;
  pontos: number;
}

export enum TipoPonto {
  PRESENCA = 'PRESENCA',
  PARTICIPACAO = 'PARTICIPACAO',
  PERGUNTA = 'PERGUNTA'
}

export interface Aluno {
  id: number;
  nome: string;
  matricula: string;
}

export interface Professor {
  id: number;
  nome: string;
  disciplina: string;
  email?: string;
} 