# syntax=docker/dockerfile:1
FROM node:20 AS base

# Install system dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    libvips-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source code
COPY . .

# Set production environment
ENV NODE_ENV=production

# Rebuild native modules and build
RUN npm rebuild @swc/core
RUN npm run build

# Create uploads directory
RUN mkdir -p public/uploads

EXPOSE 1337

ENV PORT=1337
ENV HOST=0.0.0.0

CMD ["npm", "run", "start"]
