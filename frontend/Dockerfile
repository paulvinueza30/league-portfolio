# Stage 1: Build the app
FROM node:22-alpine AS build

WORKDIR /app

ARG VITE_APP_EMAILJS_SERVICE_ID
ARG VITE_APP_EMAILJS_TEMPLATE_ID
ARG VITE_APP_EMAILJS_PUBLIC_KEY

ENV VITE_APP_EMAILJS_SERVICE_ID=$VITE_APP_EMAILJS_SERVICE_ID
ENV VITE_APP_EMAILJS_TEMPLATE_ID=$VITE_APP_EMAILJS_TEMPLATE_ID
ENV VITE_APP_EMAILJS_PUBLIC_KEY=$VITE_APP_EMAILJS_PUBLIC_KEY

COPY ./package.json ./yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

# Optional: Copy a custom nginx config for React Router support
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
