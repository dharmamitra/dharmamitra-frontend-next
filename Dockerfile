FROM node:20
WORKDIR /app

COPY ./package.json ./yarn.lock ./
RUN yarn

COPY . .

ARG FLAVOUR
RUN yarn build:$FLAVOUR

EXPOSE 3000
CMD [ "yarn", "start" ]
