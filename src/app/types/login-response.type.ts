export type LoginResponse = {
    token: string;
    userType: 'PROFESSOR' | 'ALUNO';
    email: string;
}