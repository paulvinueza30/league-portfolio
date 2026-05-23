# League of Legends Portfolio

A personal portfolio website inspired by the League of Legends client, designed to provide an immersive and interactive user experience. This project mimics the game's UI/UX while showcasing professional skills, projects, and real-time development statistics.

![Project Preview](public/league-p.png)

## About

This project is a technical playground that combines modern web technologies with game design principles. It features a fully interactive 3D "Summoner's Rift" section, a "Champ Select" interface for viewing projects, and a Go backend that caches real-time data from various platforms (GitHub, LeetCode) to display personal progress.

## Deployment

This repo is set up to deploy cleanly to a self-hosted Coolify instance using `docker-compose.yml`.

### Production services

- `frontend`: Vite app built into an Nginx container on port `80`
- `api`: Go API on port `8080`
- `redis`: Redis 7 for caching

Coolify should expose only the `frontend` service publicly. The frontend proxies `/api/*` requests to the internal `api` service, so the site and API stay on the same domain.

### Coolify setup

1. Create a new Docker Compose application in Coolify.
2. Point it at this repository and use `docker-compose.yml`.
3. Assign your public domain to the `frontend` service.
4. Do not expose the `api` or `redis` services publicly.
5. Set the required environment variables in Coolify before deploying.

### Required environment variables

- `REDIS_PWD`: Redis password used by both `api` and `redis`

### Optional backend environment variables

- `PORT`: API port, defaults to `8080`
- `RIOT_API_KEY`
- `WAKA_API_KEY`
- `LEETCODE_SESSION`
- `LEETCODE_USERNAME`
- `SELF_HOSTED_BACKEND_URL`

### Optional frontend build variables

These are injected when the frontend image is built:

- `VITE_APP_EMAILJS_SERVICE_ID`
- `VITE_APP_EMAILJS_TEMPLATE_ID`
- `VITE_APP_EMAILJS_PUBLIC_KEY`

### Local development

- `compose.dev.yml` is still the local development setup.
- Production deploys should use `docker-compose.yml`.

## Features

- **Immersive UI/UX**: Custom-built interface mimicking the League of Legends client using **React** and **Tailwind CSS**.
- **3D Playground**: An interactive 3D scene of the Summoner's Rift built with **React Three Fiber (R3F)** and **Rapier** physics, allowing users to navigate using point-and-click mechanics.
- **Real-Time Stats**: A cached progress API built with **Go** and **Redis** to display live GitHub commits, LeetCode solutions, and other metrics.
- **Smooth Animations**: High-performance animations and transitions powered by **GSAP**.
- **State Management**: efficient global state handling using **Jotai** and server state management with **TanStack Query**.

## Tech Stack

### Frontend
- **Framework**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS, Radix UI, Class Variance Authority (CVA)
- **3D & Physics**: React Three Fiber, Drei, Rapier
- **Animation**: GSAP, Framer Motion
- **State**: Jotai (Client), TanStack Query (Server)

### Backend & Infrastructure
- **Backend**: Go + Gin
- **Caching**: Redis
- **Containerization**: Docker Compose
- **APIs**: GitHub API, LeetCode Query, Riot API
