# YouTube IDs and Site Config

The reference doc. Every YouTube ID the site uses, how to find each, and where in the code it goes. Keep this open while doing the initial YouTube setup.

## The IDs You Need

| ID | Prefix | Length | What it is | Where site uses it |
|---|---|---|---|---|
| Channel ID | `UC` | 24 chars | Your channel's stable identifier | `YOUTUBE.channelId` |
| Handle | `@` | Variable | Your channel's human-readable URL | `YOUTUBE.handle` |
| Uploads playlist ID | `UU` | 24 chars | Auto-generated playlist of every video you upload | `YOUTUBE.uploadsPlaylistId` |
| Playlist ID | `PL` | 34 chars | Any playlist you create | `CATEGORY_PLAYLISTS[type][slug]` and recipe frontmatter |
| Video ID | (none) | 11 chars | Any single video | Extracted from recipe `videoUrl` |

## Finding Each ID

### Channel ID (starts with `UC`)

1. Sign in to YouTube Studio (studio.youtube.com).
2. **Settings → Channel → Advanced settings**.
3. Under "Channel ID" — copy the 24-character string starting with `UC`.

Alternative (public): visit your channel's page, click **Share channel** on the About tab, then **Copy channel ID**.

The channel ID never changes even if you rename the channel.

### Handle (starts with `@`)

1. YouTube Studio → **Settings → Channel → Basic info** → "Handle".
2. Full URL is `https://youtube.com/@yourhandle`.

Handles can be changed once every 14 days. The channel ID cannot change.

### Uploads Playlist ID (starts with `UU`)

Every channel has an auto-generated playlist containing every public/unlisted video, in upload order. Useful for a "Latest video" widget on the site.

**Trick:** the uploads playlist ID is your channel ID with `UC` → `UU`. So if your channel ID is `UCabcd1234EFGH`, your uploads playlist ID is `UUabcd1234EFGH`. Just substitute the first two characters.

Verify by visiting `https://www.youtube.com/playlist?list=UUabcd1234EFGH` — you should see your uploads listed there.

### Playlist ID (starts with `PL`)

1. Open the playlist page on youtube.com.
2. The URL is `https://www.youtube.com/playlist?list=PLxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` — the value after `list=` is the ID (34 characters starting with `PL`).

Playlists you create yourself always start with `PL`. YouTube-generated playlists (uploads, favorites, watch later) use other prefixes (`UU`, `LL`, `WL`).

### Video ID (11 characters)

The 11-character string after `v=` in a video URL, or after `youtu.be/`:

- `https://www.youtube.com/watch?v=dQw4w9WgXcQ` → `dQw4w9WgXcQ`
- `https://youtu.be/dQw4w9WgXcQ` → `dQw4w9WgXcQ`

The site parses this automatically from a recipe's `videoUrl` frontmatter field. You don't have to enter the ID separately.

## Where Each ID Goes in the Code

### Channel-level: `site/src/lib/config.ts`

```ts
export const YOUTUBE = {
  channelId: "UCxxxxxxxxxxxxxxxxxxxxxx",         // From: Studio → Settings → Channel → Advanced
  handle: "@yourchannel",                         // From: Studio → Settings → Channel → Basic info
  channelUrl: "https://youtube.com/@yourchannel", // Same as above with prefix
  uploadsPlaylistId: "UUxxxxxxxxxxxxxxxxxxxxxx",  // channelId with "UC" → "UU"
};
```

### Category → Playlist mapping: `site/src/lib/config.ts`

Populated as you create playlists. Only fill entries for playlists that actually exist — the site skips missing entries. See [playlists.md](playlists.md) for which to create first.

```ts
export const CATEGORY_PLAYLISTS: Record<string, Record<string, string>> = {
  occasion: {
    "weeknight":  "PLxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "meal-prep":  "PLxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "date-night": "PLxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  },
  cuisine: {
    "italian": "PLxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "mexican": "PLxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  },
  dietary: {
    "vegetarian": "PLxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "keto":       "PLxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  },
  method: {
    "sheet-pan": "PLxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  },
};
```

### Per-recipe: recipe frontmatter

Already exists. Each recipe file at `site/src/content/recipes/*.md`:

```yaml
---
title: "..."
videoUrl: "https://youtu.be/dQw4w9WgXcQ"  # → parsed to video ID for embed
---
```

## The One-Time Setup Table (Fill This In)

Print / copy this and fill it in as you complete setup. Once filled, transfer the values to [config.ts](../../src/lib/config.ts).

```
Channel ID:            UC______________________
Handle:                @____________________
Uploads playlist ID:   UU______________________  (= channel ID with UC → UU)
Channel URL:           https://youtube.com/@____________________

Playlists (create as you go — see playlists.md for the initial slate):
  Occasion: Weeknight       PL__________________________________
  Occasion: Meal Prep       PL__________________________________
  Occasion: Kid-Friendly    PL__________________________________
  Occasion: Date Night      PL__________________________________
  Cuisine:  Italian         PL__________________________________
  Cuisine:  Mexican         PL__________________________________
  Cuisine:  American        PL__________________________________
  Dietary:  Vegetarian      PL__________________________________
  Dietary:  Keto            PL__________________________________
  Method:   Sheet Pan       PL__________________________________
```

## Optional: YouTube Data API (For Future Widgets)

**Not needed for MVP.** Only relevant later if you want to show live data on the site (latest video, view counts, subscriber count).

1. Create a project at [console.cloud.google.com](https://console.cloud.google.com).
2. Enable **YouTube Data API v3**.
3. Create an **API key** under Credentials.
4. Restrict the key:
   - **Application restrictions:** HTTP referrers → `https://shopthisrecipe.example.com/*` and `http://localhost:*/*`
   - **API restrictions:** YouTube Data API v3 only
5. Free quota: 10,000 units/day. A "latest video" widget uses ~1 unit per page view = fine for millions of visits.

**When you add the key**, store it as `PUBLIC_YOUTUBE_API_KEY` in Cloudflare Pages environment variables, not in `config.ts` (it should never be in git even though it's referrer-restricted — belt and suspenders).

## What NOT to Confuse

- **Channel handle vs channel ID.** Handle can change; channel ID cannot. Use channel ID for anything programmatic; use handle for anything human-visible (URL, share text).
- **Uploads playlist ID vs channel ID.** They differ only in the first two characters (`UU` vs `UC`). They're not interchangeable in the API.
- **Video ID vs playlist ID.** Video IDs are 11 characters, no prefix. Playlist IDs are 34 characters starting with `PL`. If you paste a video URL where a playlist URL is expected (or vice versa) the site will show the wrong thing.
- **Channel-name spelling.** The channel *name* (display text) can be edited many times, but every rename is a subtle brand-erosion event. Pick one and stick with it.
