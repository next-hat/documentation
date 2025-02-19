FROM node:22.14-alpine AS builder

RUN apk add git

USER node

# Create app directory (with user `node`)
RUN mkdir -p /home/node/app
# Set is as cwd
WORKDIR /home/node/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY --chown=node package*.json ./

ENV NODE_ENV=production

# Install dependencies
RUN npm install --legacy-peer-deps

# Bundle app source code
COPY --chown=node . .
COPY --chown=node ./.git ./.git

RUN npm run build

FROM nginx:1.27-alpine3.21-slim

WORKDIR /etc/nginx/conf.d

COPY --from=0 /home/node/app/build /home/node/app

COPY ./server.nginx ./default.conf
