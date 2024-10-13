FROM node:22-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

ENV DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/postgres"

RUN pnpm run build

EXPOSE 5173

CMD ["pnpm", "run", "dev"]