# Money Saving Planner Pro

Production-ready savings planner built with Next.js 14 App Router, TypeScript, TailwindCSS, and Zustand.

## Features
- 3-step goal wizard with custom title/emoji, currency formatting, and date picker
- Automatic daily/weekly/monthly plan calculation
- Dashboard with animated progress and required-per-period amounts
- Deposit/withdraw transactions with newest-first timeline
- PDF export report via jsPDF
- Theme + language toggles, archive and delete goal
- Reminder scheduling with Web Notification API
- PWA setup using next-pwa + manifest + installable metadata
- Privacy Policy and Terms pages

## Structure
- `app/` routes: dashboard, create, settings, privacy, terms
- `components/` reusable UI and feature modules
- `store/` Zustand persistent state
- `lib/` calculation, formatting, reminder utilities
- `public/` PWA assets
