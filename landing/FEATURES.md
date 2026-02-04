# KodHau Landing — Features

## Overview

Single-page marketing landing for **KodHau**, an online coding and programming education platform. Built with Nuxt 3, Vue 3, and Tailwind CSS. Desktop-first, responsive, minimal design focused on conversion.

## Page Structure

- **Top navigation** — Brand on the left (logo placeholder + "KodHau"), centered section links (Problem / Solution / Features / Proof), and Login + Register actions on the right.
- **Hero** — Headline "Learn to code your dreams and design your future" with highlighted "code" (amber) and "design" (blue) words. Checkered grid background with radial fade at corners. Draggable tech logos (HTML5, CSS3, Python, Swift, PostgreSQL) that are semi-transparent by default, opaque on hover, and can be repositioned by drag-and-drop. CTAs: "Explore Course" (primary amber) and "Join Free Course" (secondary outline).
- **Problem** — Three pain points: no plan, tutorial mode, wrong order.
- **Solution / Product** — Four cards with inline SVG icons: structured curriculum, real coding practice, modern stack, clarity and focus.
- **Key Features** — Six feature cards in a grid with inline SVG icons (flat, on-palette).
- **Social Proof** — Credibility section with two real-feeling testimonials (no placeholder text).
- **Call to Action** — Final CTA and a single primary button ("Register and start").
- **Footer** — Product name (KodHau), current year, and placeholder links (Terms, Privacy).

## Tech Stack

- **Vue 3** — Composition API, `<script setup>`
- **Nuxt 3** — File-based routing, `app/pages/index.vue` as home
- **Tailwind CSS v4** — Utility-only styling, no custom CSS
- **TypeScript** — Used in script where needed

## Design

- Flat, minimal layout. No gradients, glassmorphism, or heavy shadows.
- Single palette: primary (blue-600, amber-400/500), neutral background (white / slate-50), text (slate-900 / slate-600).
- Large, readable typography; consistent spacing; no carousels or popups.
- Inline icons are SVGs embedded in the page (no icon library dependency).
- Hero section has a checkered grid background with radial fade for soft edges.
- Draggable tech logos use native drag events (mouse and touch) with `requestAnimationFrame` for smooth 60fps movement.
- Logos use `transform: translate3d()` for GPU-accelerated positioning.
- Smooth opacity transitions (20% → 100%) with 300ms ease-out timing.

## Routes

| Path   | Description        |
|--------|--------------------|
| `/`    | Landing (index)    |
| `/blog`| Blog (existing)    |

## Dependencies

No new dependencies. Uses existing Nuxt stack: `@nuxt/a11y`, `@nuxt/eslint`, `@nuxt/fonts`, `@nuxt/image`, `@tailwindcss/vite`, `tailwindcss`, `nuxt`, `vue`, `vue-router`.

## Files Touched

- `app/pages/index.vue` — Full landing content and layout, sticky top navigation, hero with checkered background and draggable tech logos, inline SVG icons, and `useHead` for title/meta description.
