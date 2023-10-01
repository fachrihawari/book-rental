# Base
FROM node:20.8.0-bookworm-slim as base

RUN apt-get update && apt-get install -y openssl && apt-get clean
RUN npm i -g bun

WORKDIR /app

COPY package.json ./
COPY bun.lockb ./

RUN bun install

COPY . .

RUN npx prisma generate

# Production
FROM base as prod
RUN npm run build
CMD npm run start:prod

# Development
FROM base as dev
CMD npm run start:dev
