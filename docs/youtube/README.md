# YouTube Configuration

Everything you need to configure on YouTube itself, and every ID the site pulls from YouTube. Read in this order:

1. **[channel-setup.md](channel-setup.md)** — one-time channel creation, branding, verification, YPP prerequisites. Do this before uploading video #1.
2. **[ids-and-config.md](ids-and-config.md)** — the reference. Every YouTube ID the site consumes, where to find each, and where in the code it goes. **The file to keep open while you set up.**
3. **[playlists.md](playlists.md)** — which playlists to create so the site's category pages have somewhere to link. Includes the naming convention and per-playlist description template.
4. **[per-video-config.md](per-video-config.md)** — the per-upload checklist: chapters, tags, description, cards, playlist assignments, pinned comment, Shorts cut.

## What Belongs Where

| Concern | Lives in | Edited via |
|---|---|---|
| Channel-level identity (channelId, handle, uploads playlist) | [site/src/lib/config.ts](../../src/lib/config.ts) `YOUTUBE` block | git or (later) Cloudflare env vars |
| Category → playlist mapping | [site/src/lib/config.ts](../../src/lib/config.ts) `CATEGORY_PLAYLISTS` | git |
| Per-recipe video URL | Recipe frontmatter `videoUrl` in [site/src/content/recipes/*.md](../../src/content/recipes/) | git |
| Description template, tags, chapters | Per upload in YouTube Studio | YouTube Studio UI |
| Analytics + monetization | YouTube Studio | YouTube Studio UI |

## Quick Sanity Check

Once you've completed the setup, the following should be true. This is your acceptance criteria for "YouTube is configured":

- [ ] Channel is a **Brand Account**, not a personal account
- [ ] Handle is set (e.g. `@yourchannel`) — displayed under channel name
- [ ] Custom channel URL is claimed (needs 100 subs + 30 days + banner + avatar)
- [ ] Phone verified — unlocks custom thumbnails and >15 min uploads
- [ ] Channel banner + avatar uploaded (see [channel-setup.md](channel-setup.md) for specs)
- [ ] "About" section has: 1-sentence hook, weekly upload cadence promise, link to `shopthisrecipe.com`, business email
- [ ] Ten initial playlists created (see [playlists.md](playlists.md))
- [ ] `YOUTUBE.channelId`, `.handle`, `.uploadsPlaylistId` set in [config.ts](../../src/lib/config.ts)
- [ ] `CATEGORY_PLAYLISTS` populated for at least Occasion (weeknight, meal-prep) and Cuisine (Italian, Mexican, American)

Once those boxes are ticked, every category landing page on the site auto-links to its matching YouTube playlist.
