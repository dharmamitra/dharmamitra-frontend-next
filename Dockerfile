FROM node:20
WORKDIR /app

COPY ./package.json ./yarn.lock ./
RUN yarn

COPY . .

ARG VERSION
RUN yarn build:$VERSION

EXPOSE 3000
CMD [ "yarn", "start" ]
