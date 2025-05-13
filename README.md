# Frontend Projeto CAP

Este é o frontend do Projeto CAP, uma aplicação web desenvolvida em Angular 18 que fornece uma interface moderna e responsiva para interação com o sistema.

## 🚀 Tecnologias Utilizadas

- Angular 18.2.0
- Node.js 18
- Docker
- NGX-Toastr para notificações
- RxJS para programação reativa

## 📋 Pré-requisitos

- Node.js 18 ou superior
- NPM (Node Package Manager)
- Docker (opcional, para containerização)
- Git

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/frontend-projetoCAP.git
cd frontend-projetoCAP
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm start
```

A aplicação estará disponível em `http://localhost:4200`

## 🏗️ Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento
- `npm run build` - Compila o projeto para produção
- `npm test` - Executa os testes unitários
- `npm run watch` - Compila o projeto em modo de observação
- `npm run e2e` - Executa os testes end-to-end

## 🐳 Docker

### Construir a imagem
```bash
docker build -t frontend-projetocap .
```

### Executar o container
```bash
docker run -d -p 4200:4200 frontend-projetocap
```

## 🔄 CI/CD

O projeto utiliza GitHub Actions para CI/CD com os seguintes estágios:

1. Build e testes
2. Criação de release no GitHub
3. Construção e push da imagem Docker
4. Testes de integração
5. Deploy automático

### Configuração do CI/CD

Para utilizar o CI/CD, configure os seguintes secrets no GitHub:

- `DOCKERHUB_USERNAME`: Seu usuário do Docker Hub
- `DOCKERHUB_TOKEN`: Token de acesso do Docker Hub

## 📦 Estrutura do Projeto

```
frontend-projetoCAP/
├── src/                    # Código fonte
├── dist/                   # Build compilado
├── .github/workflows/      # Configurações do GitHub Actions
├── Dockerfile             # Configuração do Docker
└── package.json           # Dependências e scripts
```

## 🤝 Contribuindo

1. Faça o fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## ✨ Autor
Carlinhoshk
Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

---

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
