---
title: "I Wanted to Self Host, So I Did..."
date: "2026-01-24"
---
## Introduction

I'm proud of who I have become in the last year. I went from playing League of Legends 12 hours a day to coding for about the same amount of time. Whether that’s "healthy" is a conversation for another day, but the result is that I’ve fallen down the rabbit hole. I’ve become a Kubernetes coper, an nvim lover, Linux enjoyer, and a Go enthusiast.

But mostly, I’ve become someone who wants to know how the "magic" works.

## The Black Box Problem

Until about two months ago, Docker was a black box to me. I was running AI-generated Linux commands blindly hoping they would just work...
I was hosting on Vercel because it was familiar but don't get me wrong, Vercel is incredible, the power of serverless functions was the only way I
could think to host my backend for getting my progress. But as I started homelabbing and messing with Kubernetes last December, I realized I was tired
of being a "hobby plan" developer.

I wanted to take responsibility for my own hosting. I wanted to move my portfolio to my own metal (or at least, Oracle's free tier metal).
Ignoring the painful process to sign up for an account it up I think its really useful check it out [here](https://www.oracle.com/cloud/free/)

## The Migration: From "Magic" to Manual

Moving off Vercel to an Oracle Cloud VPS was a crash course in reality. No more "push and forget." I had to fight with Docker logs, handle my own
build errors, and actually understand the request flow.

It was actually pretty funny, the minute I opened up the ports I had bots trying to do a GET request on my .env, it worked but they got literally
the most invaluable variables that I could care less about. Needless to say I'm glad I found it early so that I could handle it properly.

### Nginx conf file :)

```txt
location ~ /\.(env|git) {
deny all;
}
```

## Keeping It Simple (KISS)

I am a chronic over-engineer. My first instinct was to build a complex K8s cluster with a headless CMS just to host a blog I **might** update once a week.

I'm keeping it to simple

- The Stack: Docker Compose running on an Oracle VPS.
- The Content: Blog posts are just Markdown files stored in my backend directory.
- The Workflow: I push to my repo, a GitHub Action SSHs into the VPS, and the containers rebuild.

It’s not flashy, but it’s mine. I control the logs, I control the uptime, and I finally understand what’s happening under the hood.

## Reflection

If you're still on Vercel or Netlify, keep using them. They're great. But if you feel like your development skills are outgrowing the "black box" of managed hosting, go buy a cheap VPS (or grab a free one). Fighting with a Dockerfile for six hours will teach you more about engineering than six months of "easy" deployments ever will.

