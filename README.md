# Shop This Recipe — Landing Site

Static Astro site for the cooking-channel affiliate landing page. Every YouTube video links here; every recipe page is a one-click path from "I want to cook this" to "the ingredients are in my cart." Ships as a static site, hosts on GitHub Pages for free.

## What's In Here

- **Astro 4** — static site generator, ~0 KB of JS per page except where explicitly needed
- **Tailwind CSS** — styling
- **Content collections** — recipes are markdown files, validated at build via Zod
- **Typed taxonomy** — cuisine, dietary, spice, occasion, method, protein, meal-type, budget; category landing pages generated automatically
- **JSON-LD Recipe schema** — Google shows rich results (image, prep time, servings, cuisine, dietary)
- **Multi-retailer shop buttons** — Instacart, Walmart, Amazon Fresh, plus per-ingredient Amazon links
- **Social actions** — Save to Pinterest, Print (with clean print CSS), Email to self via `mailto:`
- **Local favorites** — heart button + `/saved` page, all in `localStorage` (no accounts)
- **YouTube playlist wiring** — category pages auto-link to matching YouTube playlists once you set the IDs

## Local Development

Requires Node 20+.

```bash
cd cookware/site
npm install
npm run dev
```

Open http://localhost:4321. Files under `src/` hot-reload.

## Adding a Recipe

Create a new markdown file at `src/content/recipes/your-slug.md`. Use [creamy-tuscan-chicken.md](src/content/recipes/creamy-tuscan-chicken.md) as a template. Frontmatter is Zod-validated — the build fails loudly if a field is missing or malformed. Full taxonomy options live in [src/lib/taxonomy.ts](src/lib/taxonomy.ts).

## Configuration Before Deploying

Two files, both in the repo (no host-specific dashboards required):

### [src/lib/config.ts](src/lib/config.ts)
All non-secret configuration. Set:
- `SITE.name`, `SITE.channelName`, `SITE.contactEmail`, etc.
- `AMAZON_TAG`, `WALMART_CID`, `INSTACART_IMPACT_BASE`
- `YOUTUBE.channelId`, `YOUTUBE.handle`, `YOUTUBE.uploadsPlaylistId` — see [docs/youtube/ids-and-config.md](docs/youtube/ids-and-config.md)
- `CATEGORY_PLAYLISTS` — fill in as you create YouTube playlists
- `ANALYTICS_SCRIPT` — paste a Plausible/Umami/Fathom snippet if you want analytics

### [astro.config.mjs](astro.config.mjs)
Set `site` to your production URL. If you're using a GitHub-hosted subpath (`https://user.github.io/repo/`), also uncomment and set `base`.

### <a id="secrets"></a>Secrets — `.env`
Genuine secrets (Mailgun API key, YouTube Data API key) never go in `config.ts`. Copy `.env.example` to `.env` locally, and set them as **repository secrets** in GitHub for production (Settings → Secrets and variables → Actions). The build workflow reads them at build time.

## Deploying to GitHub Pages (Free, Recommended)

Astro → GitHub Pages using the built-in workflow (already committed at [.github/workflows/deploy.yml](.github/workflows/deploy.yml)).

### One-time setup

1. **Push to GitHub:**
   ```bash
   cd cookware/site
   git init
   git add .
   git commit -m "Initial landing site"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/cookware-site.git
   git push -u origin main
   ```

2. **Enable Pages:** GitHub → your repo → **Settings → Pages**. Set **Source** to **GitHub Actions** (not "Deploy from a branch").

3. **First deploy:** The workflow runs automatically on push. Watch it under the **Actions** tab. Takes 60–90 seconds. Your site is live at `https://YOUR-USERNAME.github.io/YOUR-REPO/` (subpath) or your custom domain when configured.

### Custom domain

1. Buy a domain (~$10–15/yr). Namecheap, Porkbun, Cloudflare Registrar all fine.
2. In your registrar, add these DNS records:
   - `A` records for `@` pointing to GitHub's IPs: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` record for `www` → `YOUR-USERNAME.github.io`
3. GitHub → **Settings → Pages → Custom domain** → enter your domain → **Save**.
4. Tick **Enforce HTTPS** once the certificate provisions (~10 minutes).
5. Update [astro.config.mjs](astro.config.mjs)'s `site` field to the new URL. Push and it'll rebuild.

**Total cost: ~$10–15/yr for the domain. Hosting is $0.**

### Alternative hosts (if you outgrow GitHub Pages)

GitHub Pages is fine for millions of monthly visits, but if you want deploy previews on every PR, edge functions, or better analytics:

| Host | Notes |
|---|---|
| **Netlify** | Free tier, GitHub integration, deploy previews on PRs |
| **Vercel** | Free hobby tier, similar to Netlify |
| **Cloudflare Pages** | Free tier, best CDN globally |

All three build the same repo, no site changes required.

## Collaborators / Editors

If you're bringing on Amy or a VA to add recipes, see [COLLABORATION.md](COLLABORATION.md) for the layered setup: GitHub collaborator role + branch protection + CODEOWNERS + optional path-scope check. Amy edits recipes via the GitHub web editor; every change goes through a PR that auto-deploys on merge.

## Feature Notes

### Favorites (localStorage)
Users tap the ♡ on any recipe card or detail page. Slugs are stored in `localStorage` under the key `stf:favorites`. The `/saved` page reads that key on load and shows matching recipes. Cross-tab sync works via `storage` events. No login, no server. Clearing browser data clears saves.

### Print
Every recipe page has a Print button (bottom of `SocialActions`). Print CSS in [`global.css`](src/styles/global.css) hides the nav, footer, all buttons, and shrinks the hero image so a recipe fits on one page. `window.print()` opens the native dialog.

### Email
The Email button opens a `mailto:` with pre-filled subject, description, and recipe URL. Sent from the viewer's own mail client — zero backend. If you later want a real email flow (newsletter opt-in, reply-tracking), replace this with a form → serverless function → Mailgun/Resend/ConvertKit; the plumbing is intentionally decoupled.

### Pinterest
Standard Pinterest "Pin It" URL (`pinterest.com/pin/create/button/`) with `url`, `media`, and `description` prefilled. Opens Pinterest's pin composer with the recipe's hero image already selected. Big free-traffic driver for food content.

## Rough Monthly Cost

| Item | Cost |
|---|---|
| GitHub Pages hosting | $0 |
| Domain | ~$1/mo amortized |
| Analytics (Plausible/Umami self-host / Fathom free) | $0–$14/mo |
| **Total** | **$1–$15/mo** |

## Roadmap

1. **Instacart Recipe API** — one-click cart, big affiliate revenue delta once approved
2. **YouTube embed on recipe pages** — extract video ID from `videoUrl`, embed lite YouTube player
3. **Search + multi-filter** (`/?dietary=keto&occasion=weeknight`) — small JS island for stacking filters
4. **OG image auto-generation** — per-recipe social preview cards via `@vercel/og` or similar at build time
5. **Decap CMS at /admin** — WYSIWYG editor for Amy (git-backed, no separate DB)

## Structure

```
.github/
├── CODEOWNERS                     # Path-scoped review rules
└── workflows/
    └── deploy.yml                 # GitHub Pages deploy on push to main
src/
├── content/
│   ├── config.ts                  # Recipe schema (Zod validated at build)
│   └── recipes/*.md               # One markdown file per recipe
├── layouts/
│   └── Layout.astro               # HTML shell, header, footer
├── components/
│   ├── ShopButtons.astro          # Instacart / Walmart / Amazon Fresh
│   ├── IngredientList.astro       # Per-ingredient Amazon links
│   ├── CookwareList.astro         # Gear-used affiliate links
│   ├── EmailSignup.astro          # Formspree form (unused; optional)
│   ├── CategoryBadges.astro       # Colored chips per taxonomy
│   ├── RecipeCard.astro           # Grid tile with ♡ button
│   ├── FavoriteButton.astro       # ♡ toggle backed by localStorage
│   └── SocialActions.astro        # Pinterest / Print / Email
├── pages/
│   ├── index.astro                # Homepage — recipe grid + category chips
│   ├── browse/
│   │   ├── index.astro            # All categories with counts
│   │   └── [type]/[value].astro   # Category landing pages
│   ├── saved.astro                # Your saved recipes (localStorage)
│   └── recipes/[slug].astro       # Recipe detail page
├── lib/
│   ├── config.ts                  # Non-secret config + env-var reads
│   ├── taxonomy.ts                # Categories: source of truth
│   ├── recipeCategories.ts        # (type, slug) helpers
│   ├── retailers.ts               # Retailer URL builders
│   ├── youtube.ts                 # YouTube URL builders + playlist lookup
│   └── favorites-client.ts        # localStorage favorites (browser-only)
└── styles/
    └── global.css                 # Tailwind + component classes + print CSS
```
