FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html /usr/share/nginx/html/index.html
COPY assets /usr/share/nginx/html/assets
COPY pericia /usr/share/nginx/html/pericia
COPY contabilidade /usr/share/nginx/html/contabilidade
COPY nanook /usr/share/nginx/html/nanook
COPY rs-automacao /usr/share/nginx/html/rs-automacao

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
