# Base
FROM oven/bun:canary-debian as base

RUN apt-get update && apt-get install -y openssl && apt-get clean

WORKDIR /app

COPY --from=node:20.8.0 /usr/local/bin/node /usr/local/bin/node
COPY package.json ./
COPY bun.lockb ./

RUN bun install

COPY . .

RUN bunx prisma generate

# Production
FROM base as prod
RUN bun run build
CMD bun run start:prod

# Development
FROM base as dev
CMD bun run start:dev
