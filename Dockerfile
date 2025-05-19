# Build da aplicação Angular
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
COPY angular.json ./
COPY tsconfig.json ./
COPY tsconfig.app.json ./
COPY tsconfig.spec.json ./
COPY karma.conf.ci.js ./
COPY karma.conf.js ./
COPY src ./src
COPY public ./public
RUN npm install --legacy-peer-deps --no-fund --loglevel=error
RUN npm run build -- --configuration=production

# Imagem final com NGINX
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist/frontend-projetoCAP .
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]