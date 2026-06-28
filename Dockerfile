# ─────────────────────────────────────────────
# Stage 1: deps — install dependencies
# ─────────────────────────────────────────────
FROM node:22-alpine AS deps

# Install pnpm directly — avoids corepack/packageManager version issues
RUN npm install -g pnpm@10.33.0

WORKDIR /app

# Copy manifests (layer-cache friendly)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# --ignore-scripts: skips any postinstall hooks (husky etc.)
# --frozen-lockfile: reproducible build from lockfile
RUN pnpm install --frozen-lockfile --ignore-scripts

# ─────────────────────────────────────────────
# Stage 2: builder — compile the Vite/React Router SPA
# ─────────────────────────────────────────────
FROM node:22-alpine AS builder

RUN npm install -g pnpm@10.33.0

WORKDIR /app

# Bake VITE_ env vars at build time
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_PROJECT_ID
ARG VITE_SUPABASE_PUBLISHABLE_KEY

ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_PROJECT_ID=$VITE_SUPABASE_PROJECT_ID
ENV VITE_SUPABASE_PUBLISHABLE_KEY=$VITE_SUPABASE_PUBLISHABLE_KEY

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# react-router build → outputs to /app/build/client (static assets)
RUN pnpm build

# ─────────────────────────────────────────────
# Stage 3: runner — nginx serves the static SPA
# ─────────────────────────────────────────────
FROM nginx:1.27-alpine AS runner

# Remove default nginx page
RUN rm -rf /usr/share/nginx/html/*

# Copy built SPA static output
COPY --from=builder /app/build/client /usr/share/nginx/html

# nginx config: SPA fallback (all routes → index.html)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
