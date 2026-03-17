# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**旅途拾票 (Moments in Light)** — A markdown-driven travel memory app that displays collectible ticket stubs from trips. Built with React 19 + Vite 8 + TypeScript. Fully static, no backend.

## Commands

```bash
npm run data          # Regenerate src/generated/data.json from content/**/*.md
npm run dev           # Build data + start Vite dev server (port 5173)
npm run build         # Build data + tsc type check + Vite production build
npm run lint          # ESLint
npx tsc --noEmit      # Type check only (no build)
```

After modifying any `content/**/*.md` file, run `npm run data` to regenerate data.json. The dev server does NOT auto-rebuild data on markdown changes.

## Architecture

### Data Pipeline

```
content/site.md + content/trips/*.md
  → scripts/build-data.ts (gray-matter parses YAML frontmatter)
  → src/generated/data.json
  → imported in App.tsx as static data
```

Trips are sorted by `startDate` descending. Each trip contains tickets with a `template` field that maps to a React component via the registry.

### Ticket Template System

`src/utils/ticketRegistry.ts` maps template strings (e.g. `"boarding-pass"`, `"crh-ticket"`) to React components in `src/components/tickets/`. All ticket components receive `{ data: Record<string, string> }` — a flat key-value map from the markdown `data:` block.

To add a new ticket template:
1. Create component in `src/components/tickets/`
2. Register it in `ticketRegistry.ts`
3. Use the template key in trip markdown

### Dual Entry Points

- `index.html` → `src/main.tsx` → `App.tsx` (main app)
- `ticket.html` → `src/tickets-main.tsx` → `TicketGallery.tsx` (template showcase)

Both share the same component library. Vite builds both via `rollupOptions.input`.

### Theme System

Two themes: `night` (starry sky) and `day` (ocean). Applied via `data-theme` attribute on `<html>`. The `Background` component renders entirely different visuals per theme. Components use CSS module selectors like `.day {}` / `.night {}`.

## Key Conventions

- **CSS Modules** everywhere — each component has a `.module.css` file
- **Self-hosted fonts** via `@fontsource/*` packages (not Google Fonts CDN, which Safari blocks)
- **Fixed-dimension tickets** — ticket templates have specific pixel dimensions; internal spacing is compressed to fit
- **`border-radius: 4px`** on all ticket root elements to avoid bleed artifacts with the `overflow: hidden` wrapper in `TicketSlot`
- **CSS `mask` with `radial-gradient`** for transparent semicircle notches (boarding pass, museum ticket)
- **Base path** is `/moments/` (configured in vite.config.ts)
- **No state management library** — plain React hooks (useState, useCallback, useMemo)

## Content Format

Trip files (`content/trips/YYYY-MM-slug.md`):

```yaml
---
title: 上海迪士尼
country: 中国
startDate: 2026-02-14
endDate: 2026-02-16
tickets:
  - id: unique-id
    template: disney-ticket    # must match ticketRegistry key
    title: 上海迪士尼入园票
    description: ...
    photos: []                 # optional image URLs
    data:                      # template-specific fields
      parkName: "上海迪士尼乐园"
      price: "¥399"
---
```

## Image Handling for DisneyTicket

`DisneyTicket` supports an `imageUrl` field in `data`. Local images must be placed in `src/assets/` and mapped in the `imageMap` object in `DisneyTicket.tsx` (Vite asset imports, not public directory URLs).
