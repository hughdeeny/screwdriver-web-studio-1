# Screwdriver Marketing

Marketing site for [Screwdriver Marketing](https://github.com/hughdeeny/screwdriver-web-studio-1) — Adelaide-based websites and lead systems for tradies and local service businesses.

Built with [Astro](https://astro.build) and Tailwind CSS v4.

## Commands

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
npm run preview  # preview production build
```

## Structure

- `src/pages/index.astro` — homepage
- `src/data/site.ts` — copy and content constants
- `src/components/` — ContactForm, TrackedLink, LeadFlowVisual
- `src/layouts/Layout.astro` — HTML shell, meta, tracking script
- `src/styles/global.css` — theme tokens and utilities
