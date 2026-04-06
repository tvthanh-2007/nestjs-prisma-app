FROM node:22-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN NODE_TLS_REJECT_UNAUTHORIZED=0 pnpm prisma generate

CMD ["pnpm", "start:dev"]
