FROM node:alpine as builder

WORKDIR /src/app

RUN npm install --silent

COPY . .

RUN node_modules/.bin/ng build --prod

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /src/app/dist/web /usr/share/nginx/html
COPY --from=builder /src/app/nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 443

CMD [ "nginx", "-g", "daemon off;" ]