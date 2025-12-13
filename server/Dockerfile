FROM node:20.19.0-alpine AS base

WORKDIR /app

FROM base AS deps
COPY server/package.json server/yarn.lock ./server/
WORKDIR /app/server
RUN yarn install --frozen-lockfile && yarn cache clean

FROM base AS runner
COPY --from=deps /app/server/node_modules ./node_modules
COPY server ./server
COPY api ./api

ENV PATH="/app/node_modules/.bin:$PATH"
WORKDIR /app/server
EXPOSE 3001
CMD ["yarn", "dev"]
