FROM node:22-alpine AS builder

RUN npm install -g pnpm

WORKDIR /app

COPY ../package.json ../pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

RUN pnpm run build

FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/build ./build

COPY ../package.json ../pnpm-lock.yaml ./

RUN npm install --only=production --legacy-peer-deps

EXPOSE 5173

CMD ["node", "build/index.js"]