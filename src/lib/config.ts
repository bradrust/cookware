/**
 * Central config for the site.
 *
 * Two flavors of value live here:
 *   1. Public-ish IDs (affiliate tags, YouTube channel ID, etc.) — safe to
 *      commit to the repo. They already appear in every affiliate URL the
 *      site emits, so hiding them buys nothing.
 *   2. Genuine secrets (Mailgun API key, YouTube Data API key) — read from
 *      environment variables via `import.meta.env`. Copy `.env.example` to
 *      `.env` locally; set them in your host's dashboard for production.
 *
 * Astro exposes only variables prefixed with `PUBLIC_` to client-side code.
 * Anything without that prefix stays server-only.
 */

// ─────────────────────────────────────────────────────────────
// Site identity
// ─────────────────────────────────────────────────────────────

export const SITE = {
  name: "Shop This Recipe",
  tagline: "15-minute dinners for people who hate cooking",
  domain: "shopthisrecipe.example.com",
  channelName: "Your Channel Name",
  contactEmail: "hello@shopthisrecipe.example.com",
} as const;

// ─────────────────────────────────────────────────────────────
// Affiliate IDs (visible in outbound URLs — safe to commit)
// ─────────────────────────────────────────────────────────────

/** Amazon Associates tag, e.g. "yourtag-20". https://affiliate-program.amazon.com */
export const AMAZON_TAG = "YOUR-AMZ-TAG-20";

/** Walmart Creator CID. https://creator.walmart.com */
export const WALMART_CID = "YOUR-WMT-CID";

/**
 * Instacart Impact.com deep-link base URL (everything up to and including `url=`).
 * Leave blank to fall back to plain Instacart search — you won't be paid for
 * those clicks until you set this.
 */
export const INSTACART_IMPACT_BASE = "";

// ─────────────────────────────────────────────────────────────
// YouTube channel identity
// ─────────────────────────────────────────────────────────────
// See docs/youtube/ids-and-config.md for where to find each value.

export const YOUTUBE = {
  /** 24-char channel ID starting with "UC". Studio → Settings → Channel → Advanced. */
  channelId: "UCxxxxxxxxxxxxxxxxxxxxxx",
  /** Handle including the "@". Studio → Settings → Channel → Basic info. */
  handle: "@yourchannel",
  /** Human-visible URL — usually the handle URL. */
  channelUrl: "https://youtube.com/@yourchannel",
  /**
   * Uploads playlist ID — same as channelId with the "UC" prefix replaced by "UU".
   * Used for a "Latest video" widget on the site (not yet built).
   */
  uploadsPlaylistId: "UUxxxxxxxxxxxxxxxxxxxxxx",
} as const;

/**
 * Map category (type → slug) → YouTube playlist ID.
 * Only fill entries for playlists that actually exist — missing entries are
 * skipped silently, so the category page just doesn't show a "Watch playlist"
 * CTA until you populate this.
 *
 * See docs/youtube/playlists.md for the initial slate to create.
 */
export const CATEGORY_PLAYLISTS: Record<string, Record<string, string>> = {
  occasion: {
    // "weeknight":  "PLxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    // "meal-prep":  "PLxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    // "date-night": "PLxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    // "kid-friendly": "PLxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  },
  cuisine: {
    // "italian": "PLxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    // "mexican": "PLxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    // "american": "PLxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  },
  dietary: {
    // "vegetarian": "PLxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    // "keto":       "PLxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  },
  method: {
    // "sheet-pan": "PLxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  },
};

// ─────────────────────────────────────────────────────────────
// Optional newsletter signup
// ─────────────────────────────────────────────────────────────

/**
 * Formspree endpoint URL for the newsletter signup form.
 * Free tier: 50 submissions/month. https://formspree.io
 * Leave blank to show a "coming soon" placeholder.
 */
export const FORMSPREE_ENDPOINT = "";

// ─────────────────────────────────────────────────────────────
// Optional analytics
// ─────────────────────────────────────────────────────────────

/**
 * Any privacy-friendly script tag. Paste the whole `<script ...>` string
 * (from Plausible, Umami, Fathom, etc.) — the layout injects it verbatim.
 * Leave blank to skip.
 */
export const ANALYTICS_SCRIPT = "";

// ─────────────────────────────────────────────────────────────
// Secrets — read from env only, never commit
// ─────────────────────────────────────────────────────────────

/**
 * Mailgun / Resend / etc. API keys go here if we ever add server-side email.
 * Currently unused — the site uses `mailto:` links which need no key.
 */
export const MAILGUN_API_KEY = import.meta.env.MAILGUN_API_KEY ?? "";

/** YouTube Data API v3 key (referrer-restricted). Optional for live widgets. */
export const YOUTUBE_API_KEY = import.meta.env.PUBLIC_YOUTUBE_API_KEY ?? "";
