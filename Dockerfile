# Estágio de build
FROM node:18-alpine as builder
WORKDIR /app

# Configurações para evitar problemas com esbuild
ENV NODE_OPTIONS=--max-old-space-size=4096
ENV ESBUILD_BINARY_PATH=/app/node_modules/esbuild/bin/esbuild

# Instalar dependências primeiro (layer de cache)
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copiar e construir o projeto
COPY . .
RUN npm run build -- --configuration=production

# Estágio de produção
FROM nginx:alpine
# Copiar os arquivos compilados para o diretório do servidor nginx
COPY --from=builder /app/dist/login-page/browser/ /usr/share/nginx/html/

# Configurar Nginx para usar a porta 4200
RUN echo 'server {\n\
    listen 4200;\n\
    server_name localhost;\n\
    root /usr/share/nginx/html;\n\
    index index.html index.htm;\n\
    location / {\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
}' > /etc/nginx/conf.d/default.conf

EXPOSE 4200
CMD ["nginx", "-g", "daemon off;"] 