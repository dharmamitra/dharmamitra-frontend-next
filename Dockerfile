FROM node:20
WORKDIR /app

COPY ./package.json ./yarn.lock ./

RUN corepack enable

RUN yarn set version stable

# debug step:
RUN yarn --version

RUN yarn install --immutable

# debug step:
RUN ls -la /app

# debug step:
RUN if [ ! -d "node_modules" ]; then echo "node_modules directory is missing"; exit 1; fi

COPY . .

ARG VERSION
RUN yarn build:$VERSION

EXPOSE 3000
CMD [ "yarn", "start" ]
