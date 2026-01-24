# Stage 1: Build the app
FROM node:22-alpine AS build

WORKDIR /app

COPY ./package.json ./yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

# Optional: Copy a custom nginx config for React Router support
# COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
