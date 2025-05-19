# Build da aplicação Angular
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps --no-fund --loglevel=error
COPY . .
RUN npm run build -- --configuration=production

# Imagem final com NGINX
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist/login-page .
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 4200
CMD ["nginx", "-g", "daemon off;"]