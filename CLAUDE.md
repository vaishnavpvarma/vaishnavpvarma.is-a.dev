# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for a computational biologist (Vaishnav P Varma). Built with React + Vite + TypeScript, featuring a terminal/boot-loader aesthetic theme.

## Development Commands

```bash
# Install dependencies (uses Bun)
bun install

# Start dev server (runs on port 8080)
bun run dev

# Build for production
bun run build

# Run tests
bun run test

# Run tests in watch mode
bun run test:watch

# Lint
bun run lint
```

## Architecture

### Data Layer
- **src/data.json** — Single source of truth for all portfolio content (profile, experience, projects, patent, blog posts). Edit this file to update content.

### Routing
- React Router v6 with nested routes under `SiteLayout`
- All custom routes must be added **above** the catch-all `"*"` route in `App.tsx`
- Route structure:
  - `/` — Index page
  - `/experience` — Experience page
  - `/projects` — Projects listing
  - `/projects/:id` — Project detail page
  - `/patent` — Patent page
  - `/gallery` — Gallery page
  - `/blog` — Blog page

### Component Organization
- `src/components/` — Reusable components (Hero, Experience, Projects, etc.)
- `src/components/ui/` — shadcn/ui components
- `src/pages/` — Route-level page components
- `src/hooks/` — Custom React hooks
- `src/lib/` — Utility functions

### Key Components
- **BootLoader** — Terminal-style boot sequence animation
- **NanoporeSignal** — Visual nanopore sequencing signal visualization
- **RouteTransition** — Page transition animations
- **SiteLayout** — Main layout wrapper with navbar/footer

### Tech Stack
- React 18 with SWC
- TypeScript
- Tailwind CSS (shadcn/ui)
- React Router v6
- TanStack Query
- Vitest for testing
- Bun as package manager

### Path Aliases
- `@/` → `src/`
- `@/components` → `src/components`
- `@/lib` → `src/lib`
- `@/hooks` → `src/hooks`

## Adding New Routes

1. Create page component in `src/pages/`
2. Import in `App.tsx`
3. Add `<Route>` inside the `<Route element={<SiteLayout />}>` wrapper
4. **Important:** Add above the catch-all `"*` route

## Content Updates

Edit `src/data.json` to update:
- Profile information
- Experience entries
- Projects
- Patent details
- Blog posts
- Social links

## Testing

Test files in `src/test/`. Run single test:
```bash
bun run test -- example.test.ts
```
