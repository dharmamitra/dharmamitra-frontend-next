FROM node:20
WORKDIR /app

COPY ./package.json ./yarn.lock ./

RUN corepack enable

RUN yarn set version stable

RUN yarn install --immutable

COPY . .

ARG VERSION
RUN yarn build:$VERSION

EXPOSE 3000
CMD [ "yarn", "start" ]
