FROM node:alpine as build-stage

WORKDIR /usr/app
COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:latest

COPY nginx/app.conf /etc/nginx/nginx.conf
COPY --from=build-stage /usr/app/dist /usr/share/nginx/html

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]