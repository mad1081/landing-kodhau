# KodHau Landing — Features

## Overview

Single-page marketing landing for **KodHau**, an online coding and programming education platform. Built with Nuxt 3, Vue 3, and Tailwind CSS. Desktop-first, responsive, minimal design focused on conversion.

## Page Structure

- **Top navigation** — Brand on the left (logo placeholder + “KodHau”), centered section links (Problem / Solution / Features / Proof), and Login + Register actions on the right.
- **Hero** — Bold developer-focused headline, subheadline for beginners & self-taught developers, primary CTA (“Start learning”), secondary CTA (“See the learning flow”).
- **Problem** — Three pain points: no plan, tutorial mode, wrong order.
- **Solution / Product** — Four cards with inline SVG icons: structured curriculum, real coding practice, modern stack, clarity and focus.
- **Key Features** — Six feature cards in a grid with inline SVG icons (flat, on-palette).
- **Social Proof** — Credibility section with two real-feeling testimonials (no placeholder text).
- **Call to Action** — Final CTA and a single primary button (“Register and start”).
- **Footer** — Product name (KodHau), current year, and placeholder links (Terms, Privacy).

## Tech Stack

- **Vue 3** — Composition API, `<script setup>`
- **Nuxt 3** — File-based routing, `app/pages/index.vue` as home
- **Tailwind CSS v4** — Utility-only styling, no custom CSS
- **TypeScript** — Used in script where needed

## Design

- Flat, minimal layout. No animations, gradients, glassmorphism, or heavy shadows.
- Single palette: primary (blue-600), neutral background (white / slate-50), text (slate-900 / slate-600).
- Large, readable typography; consistent spacing; no carousels or popups.
- Inline icons are SVGs embedded in the page (no icon library dependency).

## Routes

| Path   | Description        |
|--------|--------------------|
| `/`    | Landing (index)    |
| `/blog`| Blog (existing)    |

## Dependencies

No new dependencies. Uses existing Nuxt stack: `@nuxt/a11y`, `@nuxt/eslint`, `@nuxt/fonts`, `@nuxt/image`, `@tailwindcss/vite`, `tailwindcss`, `nuxt`, `vue`, `vue-router`.

## Files Touched

- `app/pages/index.vue` — Full landing content and layout, sticky top navigation, inline SVG icons for cards, and `useHead` for title/meta description.
