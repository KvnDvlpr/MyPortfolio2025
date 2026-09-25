# MyPortfolio2025

Kevin Acebuche's portfolio — Next.js (App Router) + TypeScript + Tailwind CSS v4 + shadcn/ui (Radix, Vega preset), deployed on Vercel.

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

## Layout

- `src/app/` — routes, root layout, `globals.css` (design tokens + shadcn theme mapping)
- `src/components/ui/` — shadcn/ui components (add more with `npx shadcn@latest add <name>`)
- `public/assets/` — images, icons, CV PDF (served at `/assets/...`)
- `legacy/` — the original static HTML/CSS/JS site, kept as the reference while sections are ported. Removed once the migration is done.

## Theme

Colors are CSS variables in `src/app/globals.css`. The palette (`--bg`, `--ink`, `--brand`, `--sage`, …) is defined once per theme, and shadcn's semantic variables (`--primary`, `--muted`, …) point at it. Dark mode is `<html data-theme="dark">`, toggled by next-themes (same `theme` localStorage key as the legacy site).
