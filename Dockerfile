FROM node:lts AS builder

ENV NODE_ENV=production
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN corepack enable && \
    corepack prepare pnpm@9.15.9 --activate && \
    pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

FROM node:alpine AS runtime

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./

RUN corepack enable && \
    corepack prepare pnpm@9.15.9 --activate && \
    pnpm install --frozen-lockfile --prod

ENV HOST=0.0.0.0
ENV PORT=4321

EXPOSE 4321
CMD ["node", "dist/server/entry.mjs"]
