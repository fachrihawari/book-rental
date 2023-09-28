FROM node:20.7.0-alpine3.18 as base

RUN corepack enable
RUN corepack prepare pnpm@8.8.0 --activate

FROM base

WORKDIR /app

COPY package.json .
COPY pnpm-lock.yaml .
COPY patches ./patches

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm prisma generate
RUN pnpm build
