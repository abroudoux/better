FROM node:22-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

ENV DATABASE_URL="postgresql://postgres:mysecretpassword@better-db:5432/better-db"

RUN pnpm run build

RUN pnpm run generate
RUN pnpm run migrate

EXPOSE 5173

CMD ["pnpm", "run", "dev"]