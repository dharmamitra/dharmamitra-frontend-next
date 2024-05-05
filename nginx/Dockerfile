FROM nginx:latest

COPY ./default.conf /etc/nginx/conf.d/default.conf

COPY ./default.conf.template /etc/nginx/conf.d/default.conf.template

RUN envsubst '$BASE_PATH' </etc/nginx/conf.d/default.conf.template >/etc/nginx/conf.d/default.conf

ENTRYPOINT [ "nginx" ]

CMD [ "-g", "daemon off;" ]
