# syntax=docker/dockerfile:1
#
# TanStack Start + Cloudflare Vite plugin: build emits `.output/` (see wrangler / CF docs).
# Runtime uses `vite preview`, which serves the Workers build (Miniflare/workerd under the hood).
#
# Cloud Run: set container port to $PORT (default 8080). Example:
#   gcloud run deploy APP --source . --region REGION
#
# Ensure `src/data/uber-menu.generated.ts` is up to date before `docker build`
# (Docker skips `export-menu` — use `bun run build` locally when the Excel menu changes).

FROM node:22-bookworm-slim AS builder

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm ci

COPY . .

RUN npm run build:docker

# ---

FROM node:22-bookworm-slim AS runner

WORKDIR /app

ENV NODE_ENV=production

# Cloud Run sets PORT; Vite preview must bind 0.0.0.0
ENV PORT=8080
ENV HOST=0.0.0.0

# Reuse full tree so `vite preview` resolves plugins, vite.config.ts, and `.output`
COPY --from=builder /app /app

RUN chown -R node:node /app

USER node

EXPOSE 8080

CMD ["sh", "-c", "exec npx vite preview --host \"${HOST}\" --port \"${PORT}\""]
