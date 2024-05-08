FROM node:20
WORKDIR /app

COPY ./package.json ./yarn.lock ./
RUN yarn

COPY . .

ARG BUILD_SCRIPT
RUN yarn $BUILD_SCRIPT

EXPOSE 3000
CMD [ "yarn", "start" ]
