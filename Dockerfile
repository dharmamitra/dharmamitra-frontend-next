# see: https://calvinf.com/blog/2023/11/10/node-js-20-yarn-4-and-next-js-on-docker/
FROM node:20-alpine AS base

# https://nextjs.org/telemetry
ENV NEXT_TELEMETRY_DISABLED=1 NODE_ENV=production

RUN apk update && apk upgrade && apk add --no-cache libc6-compat && apk add dumb-init

RUN corepack enable
RUN yarn set version berry

# add the group and user needed in the final image
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Install dependencies only when needed
FROM base AS builder
WORKDIR /app

COPY . .

COPY package.json yarn.lock .yarnrc.yml ./
RUN yarn install --immutable

ARG BUILD_VARIANT
RUN yarn build:${BUILD_VARIANT}

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

# copy dirs not included in the standalone build process
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

# Expose ports (for orchestrators and dynamic reverse proxies)
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["dumb-init","node","server.js"]