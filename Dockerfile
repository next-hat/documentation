FROM node:24.14.0-alpine AS builder

RUN npm install --global pnpm@12.9.1 \
    && mkdir -p /home/node/app \
    && chown node:node /home/node/app

WORKDIR /home/node/app
COPY --chown=node:node package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY --chown=node:node apps/documentation/package.json ./apps/documentation/package.json
COPY --chown=node:node packages/ui/package.json ./packages/ui/package.json
USER node

ENV NEXT_TELEMETRY_DISABLED=1

RUN pnpm install --frozen-lockfile --prod=false
COPY --chown=node:node . .
RUN pnpm check && pnpm typecheck && pnpm build && node scripts/verify-export.mjs

FROM nginx:1.29-alpine3.22-slim

WORKDIR /etc/nginx/conf.d

COPY --from=builder /home/node/app/apps/documentation/out /home/node/app

COPY ./server.nginx ./default.conf
