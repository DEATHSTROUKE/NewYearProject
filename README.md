# New Year Project

A monorepo project built with NX, containing frontend, admin panel, backend, and Telegram bot applications.

## Prerequisites

- Node.js
- PostgreSQL
- yarn (recommended)

## Project Structure

- `apps/frontend` - Main frontend application
- `apps/admin` - Admin panel
- `apps/backend` - NestJS backend server
- `apps/bot` - Telegram bot

## Getting Started

1. Install dependencies:
```bash
yarn install
```

2. Set up environment variables:
Create a `.env` file in the root directory with required variables.

3. Set up the database:
```bash
# Start Drizzle Studio
yarn db:studio

# Push database changes
yarn db:push

# Generate migrations
yarn db:generate

# Run migrations
yarn db:migrate

# Seed the database
yarn db:seed
```

## Development

Run all applications:
```bash
yarn dev
```

Or run specific applications:

```bash
# Frontend
yarn dev:front

# Admin Panel
yarn dev:admin

# Backend
yarn dev:back

# Telegram Bot
yarn dev:bot
```

## Additional Commands

```bash
# Format code with Prettier
yarn lint:prettier

# Generate API client for admin panel
yarn admin:orval

# Build all applications
yarn build
```

## Tech Stack

- Frontend & Admin: React, MUI Joy, React Query
- Backend: NestJS, DrizzleORM
- Database: PostgreSQL
- Bot: Puregram
- Tools: Nx, Orval, DrizzleKit
