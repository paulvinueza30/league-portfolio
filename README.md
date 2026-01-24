# League of Legends Portfolio

A personal portfolio website inspired by the League of Legends client, designed to provide an immersive and interactive user experience. This project mimics the game's UI/UX while showcasing professional skills, projects, and real-time development statistics.

![Project Preview](public/league-p.png)

## About

This project is a technical playground that combines modern web technologies with game design principles. It features a fully interactive 3D "Summoner's Rift" section, a "Champ Select" interface for viewing projects, and a serverless backend that caches real-time data from various platforms (GitHub, LeetCode) to display personal progress.

## Features

- **Immersive UI/UX**: Custom-built interface mimicking the League of Legends client using **React** and **Tailwind CSS**.
- **3D Playground**: An interactive 3D scene of the Summoner's Rift built with **React Three Fiber (R3F)** and **Rapier** physics, allowing users to navigate using point-and-click mechanics.
- **Real-Time Stats**: A cached progress API built with **Upstash Redis** and **Vercel Functions** to display live GitHub commits, LeetCode solutions, and other metrics.
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
- **Serverless**: Vercel Functions
- **Database/Caching**: Upstash Redis
- **APIs**: GitHub API, LeetCode Query, Riot API 
