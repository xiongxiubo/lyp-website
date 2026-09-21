FROM oven/bun:1.3.14-alpine AS bun

FROM node:24-alpine AS builder

COPY --from=bun /usr/local/bin/bun /usr/local/bin/bun
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --linker=hoisted

COPY . .
RUN NITRO_PRESET=node-server bun run build

FROM node:24-alpine AS runtime

WORKDIR /app
ENV NODE_ENV=production \
    NITRO_HOST=0.0.0.0 \
    NITRO_PORT=3000

COPY --from=builder --chown=node:node /app/.output ./.output

USER node
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
