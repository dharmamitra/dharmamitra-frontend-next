FROM node:20
WORKDIR /app

COPY ./package.json ./.yarnrc.yml ./yarn.lock ./

RUN corepack enable

RUN yarn set version stable

RUN yarn install --immutable

RUN ls -la /app

COPY . .

ARG VERSION
RUN yarn build:$VERSION

EXPOSE 3000
CMD [ "yarn", "start" ]
