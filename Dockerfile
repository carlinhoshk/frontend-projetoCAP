# Imagem leve para servir a aplicação
FROM node:20-alpine
WORKDIR /app

# Instalar apenas o servidor serve
RUN npm install -g serve

# Copiar apenas os arquivos de distribuição gerados durante o CI/CD
COPY dist/login-page/browser /app

# Expor porta 4199
EXPOSE 4200

# Comando para iniciar o servidor na porta 4199
CMD ["serve", "-s", "/app", "-l", "4200"] 