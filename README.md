# 💪 FitLog — Workout Library

FitLog is a responsive, dark-mode workout library and daily training log. Browse exercises from the provided FitLog API, open detailed workout pages, add up to five lifts to today's plan, save workouts for later, and track completed lifts.

## Tech Stack
- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- Lucide React icons
- FitLog REST API
- Browser localStorage for persistence

## Key Features
1. Responsive workout library with API-powered cards.
2. Workout detail pages with specs, instructions, and actions.
3. Today's Plan and Saved tabs with live navbar counters.
4. Five-lift daily cap, live exercise/minute/calorie metrics, and completion state.
5. Duration, calorie, and rating sorting plus workout search.
6. Toast feedback for add/save/done/remove actions.
7. Loading UI and custom 404 page.
8. Persistent plan/saved data with localStorage.

## API
Primary: `https://api.abcz.workers.dev/api/fitlog`

Fallback: `https://api.api-store.workers.dev/api/fitlog`

## Run Locally
```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Build
```bash
npm run build
npm start
```

## Deployment
Deploy the project to Vercel, Netlify, Cloudflare Pages, or another Next.js-compatible host. Make sure the production host supports Next.js App Router rewrites/SPA-style fallback so direct workout and `/my-plan` refreshes resolve correctly.

## Submission
- Live Link: _add after deployment_
- GitHub Repository Link: _add after pushing_
