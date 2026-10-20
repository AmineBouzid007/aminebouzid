# Amine Bouzid, portfolio

Next.js 16 (App Router) + React 19 + TypeScript. No other dependencies, no environment variables.

## Deploy on Vercel
1. Push this folder to a GitHub repo (or run `npx vercel` inside it).
2. Import it on vercel.com/new. Vercel detects Next.js; leave every setting on default.

## Edit content
- `lib/data.ts`: projects, services, all texts in French and English, email, phone, WhatsApp link.
- `public/assets/`: your images. Each project lists its screenshots in `lib/data.ts` (`shots`).
  Files that do not exist are skipped, so a coloured placeholder shows until you add them.
  Profile photo: `public/assets/profile.jpg` (shown in About when present).
- `app/globals.css`: colours are the variables at the top (`--bg`, `--fg`, `--acc`, light and dark).

## Run locally
    npm install
    npm run dev

## What is in it
- Hero grid (`components/GridHero.tsx`): canvas lattice that bends around the cursor, ripples on click, and a drifting ghost cursor on touch screens or when idle.
- Name (`components/HeroName.tsx`): variable-font letters swell near the cursor.
- Project previews warp on hover (SVG displacement filter).
- FR/EN, light/dark, and a pause-motion button. Preferences are remembered; `prefers-reduced-motion` is respected.
