# Playlists — What to Create and Why

Playlists do three things for a food channel: (1) drive session watch time (autoplay to the next relevant video), (2) get you extra impressions in YouTube search ("weeknight dinners" as a playlist ranks separately from any single video), (3) give the site somewhere to link when a viewer clicks a category.

## The Initial Playlist Slate

Create these ten in the first week. Empty is fine — add videos as they publish. Order below is priority.

### Occasion Playlists (Highest Value)

These mirror what Jess actually searches for.

| # | Playlist | Description (paste as-is, edit tone) |
|---|---|---|
| 1 | **15-Minute Weeknight Dinners** | Every dinner in this playlist is done in 15 minutes or less. One pan, one sheet, one skillet — never anything harder. |
| 2 | **Meal Prep Made Easy** | Sunday cooking, weekday eating. Batch-friendly recipes that hold in the fridge for 4+ days. |
| 3 | **Dinners Kids Actually Eat** | Tested on kids who "don't eat anything." No visible green things. Sneaky vegetables permitted. |
| 4 | **Date Night at Home** | Restaurant-nice food, home-easy technique. 20 minutes or less, most under 15. |

### Cuisine Playlists

Match the biggest search-volume cuisines.

| # | Playlist | Description |
|---|---|---|
| 5 | **Easy Italian Dinners (15 Min or Less)** | The Italian recipes that got faster when I stopped believing pasta had to be complicated. |
| 6 | **Weeknight Mexican Dinners** | Tacos, quesadillas, sheet-pan fajitas. All under 20 minutes. |
| 7 | **American Comfort Food, Fast** | The dinners you grew up wanting, without the 2-hour cook time. |

### Dietary Playlists

Filter-based playlists rank very well in YouTube search because "vegetarian weeknight dinners" is its own long-tail query.

| # | Playlist | Description |
|---|---|---|
| 8 | **15-Minute Vegetarian Dinners** | Meatless Monday for people who don't want to think about it. |
| 9 | **Easy Keto Dinners** | Low-carb, high-protein, no weird ingredients. 15 minutes or less. |

### Method Playlist

Doubles as a natural home for cookware affiliate links.

| # | Playlist | Description |
|---|---|---|
| 10 | **Sheet Pan Dinners** | You chop, you dump, the oven does the work. |

## Playlist Naming Convention

Consistency helps YouTube's algorithm cluster your content and helps viewers find related videos.

**Pattern:** `[Adjective] [Category] [Modifier]`

- `15-Minute Weeknight Dinners` ✓
- `Weeknight Dinners` ✗ (missing the modifier that promises value)
- `Fast dinners you can make` ✗ (too generic, no differentiator)

**Modifiers that convert:**
- `(15 Min or Less)` — time promise
- `(Under 20 Minutes)` — same, slightly softer
- `That Actually Work` — social proof
- `For People Who Hate Cooking` — persona-matched
- `(Kid-Approved)` — kids/family playlists

## Playlist Settings

For each playlist:

- **Visibility:** Public
- **Playlist ordering:** "Manual" or "Date added (newest)" — never "Date added (oldest)," which buries new uploads
- **Playlist end:** "Recommend videos" (drives session time)
- **Allow embedding:** On

## Cross-Playlist Rules

- **A single video can be in multiple playlists.** Encouraged. A "creamy Tuscan chicken" recipe belongs in "Weeknight," "Italian," "Kid-Approved," and "Date Night at Home." Adding to all four multiplies its discoverability without any extra work.
- **Add-to-playlist on upload.** Do this at upload time via the checkbox list — it's the fastest moment to remember.

## What NOT to Do

- **Don't create empty playlists just to have them.** An empty playlist that shows up in your channel view reads as "unfinished channel."
- **Don't create too many playlists early.** Ten is enough to start. Playlists with 1 video look sad; playlists with 5+ videos look intentional.
- **Don't call playlists "Recipes" or "Videos."** Every YouTube channel has a "Videos" tab already. Playlists are for grouped, curated context — the name should signal *why* those videos are together.
- **Don't nest playlists.** YouTube doesn't support nesting; every playlist is peer-level in the sidebar.

## Wiring Playlists to the Site

Once a playlist exists:

1. Copy its ID from the URL (`list=PL...`).
2. Open [src/lib/config.ts](../../src/lib/config.ts).
3. Add the entry to `CATEGORY_PLAYLISTS`:
   ```ts
   occasion: {
     "weeknight": "PLxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
   }
   ```
4. Commit and push. Cloudflare rebuilds; the "Watch the [Weeknight] playlist" CTA appears on the corresponding `/browse/occasion/weeknight` page automatically.

## Playlist Growth Order (For Reference)

Track playlist size over time — it's a leading indicator of channel health. Rough milestones:

| Playlist age | Videos in playlist | Health signal |
|---|---|---|
| Month 1 | 2–3 videos | Fine, keep publishing |
| Month 3 | 8–12 videos | On track |
| Month 6 | 20+ videos | Healthy — first playlists earning organic search traffic |
| Month 12 | 40+ videos | Playlist likely ranking on page 1 for its target query |

If a playlist stalls (no new videos added in 60 days), either the niche isn't producing or you've drifted. Either way, prune or double down.
