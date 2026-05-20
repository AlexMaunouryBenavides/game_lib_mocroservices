# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`catalog` is a NestJS REST API for a game library. It exposes endpoints for managing a `Game` catalog backed by a SQLite database via Prisma ORM.

## Commands

All commands must be run from the `catalog/` directory.

```bash
# Install dependencies
npm install

# Start dev server with hot-reload (port 3002)
npm run start:dev

# Build
npm run build

# Lint (auto-fixes)
npm run lint

# Format (auto-fixes)
npm run format

# Run all unit tests
npm run test

# Run a single test file
npx jest src/app.controller.spec.ts

# Run tests in watch mode
npm run test:watch

# Run e2e tests
npm run test:e2e

# Run tests with coverage
npm run test:cov
```

## Database (Prisma + SQLite)

The database file is `dev.db` (SQLite), configured via `DATABASE_URL=file:./dev.db` in `.env`.

Prisma client is generated into `generated/prisma/` (not the default location). Import from `generated/prisma/client`, not `@prisma/client`.

```bash
# Generate Prisma client after schema changes
npx prisma generate

# Create and apply a migration
npx prisma migrate dev --name <migration_name>

# Apply existing migrations (e.g. on a fresh clone)
npx prisma migrate deploy

# Open Prisma Studio (DB GUI)
npx prisma studio
```

The Prisma adapter uses `@prisma/adapter-better-sqlite3` (Driver Adapters pattern), initialized in [src/db/prisma.service.ts](src/db/prisma.service.ts).

## Architecture

- **[src/main.ts](src/main.ts)** — Bootstrap; listens on `PORT` env var, defaults to 3002.
- **[src/app.module.ts](src/app.module.ts)** — Root module; imports `GameModule`.
- **[src/db/prisma.service.ts](src/db/prisma.service.ts)** — Wraps `PrismaClient` as a NestJS `Injectable`. Provided directly inside feature modules (not a global module).
- **[src/game/](src/game/)** — The only feature module so far:
  - `game.module.ts` — declares `GameController`, provides `GameService` and `PrismaService`.
  - `game.service.ts` — thin CRUD layer over Prisma (`game`, `games`, `createGame`, `updateGame`, `deleteGame`).
  - `game.controller.ts` — currently exposes `GET /game/:id` only.

When adding new feature domains, follow the same pattern: `<feature>.module.ts` → `<feature>.service.ts` → `<feature>.controller.ts`, with `PrismaService` injected at module level.

## Key Conventions

- Prisma types are imported from `generated/prisma/client` (configured by `moduleFormat: "cjs"` in `prisma/schema.prisma`).
- `tsconfig.json` uses `baseUrl: "./"`, so paths like `generated/prisma/client` resolve from the project root.
- `strictNullChecks` is on; `noImplicitAny` is off.
