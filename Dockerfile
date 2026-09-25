FROM node:24.21.0-alpine3.22 AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:24.21.0-alpine3.22 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:24.21.0-alpine3.22 AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN addgroup -g 10001 -S nextjs && adduser -u 10001 -S -G nextjs nextjs
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
USER 10001:10001
EXPOSE 3000
CMD ["node", "server.js"]
