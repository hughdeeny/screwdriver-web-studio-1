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
## Meta Pixel (Facebook ads)

The landing funnel includes Meta Pixel tracking for ad conversion measurement.

| Event | Page |
|---|---|
| `PageView` | All pages (via `MetaPixel.astro` in layouts) |
| `ViewContent` | `/landing` only |
| `Lead` | `/landing/thank-you` only |

**Setup**

1. Copy `.env.example` to `.env` and set `PUBLIC_META_PIXEL_ID=your_pixel_id`
2. Or edit the fallback in `src/components/MetaPixel.astro`
3. Deploy, then verify with [Meta Pixel Helper](https://chrome.google.com/webstore/detail/meta-pixel-helper) (Chrome)
4. Complete the quiz at `/landing/quiz` — you should land on `/landing/thank-you` and see the `Lead` event

**External forms (GoHighLevel etc.)**  
If you embed a form instead of the native quiz, set the form’s post-submit redirect to `/landing/thank-you` in the external provider’s settings so the `Lead` event still fires.

