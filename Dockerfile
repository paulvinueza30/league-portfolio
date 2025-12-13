FROM node:22.12.0-alpine AS base

WORKDIR /app

COPY ./package.json ./

RUN yarn install && yarn cache clean

COPY --exclude=./api/ . ./

ENV PORT=5173

EXPOSE 5173

CMD ["yarn" , "run" , "vite"]



