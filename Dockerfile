# Imagem única - build e execução
FROM node:20-alpine
WORKDIR /app

# Configurações para evitar problemas com esbuild
ENV NODE_OPTIONS=--max-old-space-size=4096
ENV ESBUILD_BINARY_PATH=/app/node_modules/esbuild/bin/esbuild
ENV NPM_CONFIG_LEGACY_PEER_DEPS=true

# Instalar dependências
COPY package*.json ./
RUN npm install --legacy-peer-deps --no-fund --loglevel=error

# Copiar arquivos do projeto
COPY . .

# Construir a aplicação em modo produção
RUN npm run build -- --configuration=production

# Instalar servidor http simples globalmente
RUN npm install -g serve

# Expor porta 4200
EXPOSE 4200

# Comando para iniciar o servidor na porta 4200
CMD ["serve", "-s", "dist/login-page/browser", "-l", "4200"] 