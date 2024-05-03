FROM node:20-alpine3.19 as dependencies
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:20-alpine3.19 as builder
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN yarn build

FROM node:20-alpine3.19 as runner

ARG APP=/app

ENV APP_USER=runner
RUN addgroup -S $APP_USER \
    && adduser -S $APP_USER -G $APP_USER \
    && mkdir -p ${APP}

RUN chown -R $APP_USER:$APP_USER ${APP}

WORKDIR /app

COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json