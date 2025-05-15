# Frontend Projeto CAP

Este é o frontend do Projeto CAP, uma aplicação web desenvolvida em Angular 16 que fornece uma interface moderna e responsiva para interação com o sistema.

## 🚀 Tecnologias Utilizadas

- Angular 16.2.0
- Node.js 20
- NGX-Toastr para notificações
- RxJS para programação reativa

## 📋 Pré-requisitos

- Node.js 20 ou superior
- NPM (Node Package Manager)
- Git

## 🔧 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/carlinhoshk/frontend-projetoCAP.git
cd frontend-projetoCAP
```

2. Instale as dependências:

```bash
npm install --legacy-peer-deps
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

## 📦 Executando a Versão de Produção

Para executar a versão compilada da aplicação (pasta dist):

1. Construa a aplicação:

```bash
npm run build
```

2. Instale o pacote `serve` globalmente:

````bash
npm install -g serve
ng build```

3. Execute a aplicação compilada:

```bash
serve -s dist/login-page -l 4200
````

A aplicação estará disponível em `http://localhost:4200`

## 🔄 CI/CD

O projeto utiliza GitHub Actions para CI/CD com os seguintes estágios:

1. Build e testes
2. Criação de release no GitHub
3. Publicação de artefatos

### Configuração do CI/CD

Para utilizar o CI/CD, configure os seguintes secrets no GitHub:

- `GITHUB_TOKEN`: Token de acesso do GitHub (automaticamente configurado)

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

---

Para obter mais ajuda sobre o Angular CLI, use `ng help` ou consulte a página [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).
