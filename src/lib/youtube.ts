import { YOUTUBE, CATEGORY_PLAYLISTS } from "./config";

/**
 * URL builders + tiny parsers for YouTube references. Pure functions;
 * no API calls. Anything that needs live data (view counts, latest video)
 * would use the YouTube Data API — not implemented in this MVP.
 */

/** Playlist watch URL for a given playlist ID. */
export function playlistUrl(id: string): string {
  return `https://www.youtube.com/playlist?list=${encodeURIComponent(id)}`;
}

/** Video watch URL for a given 11-char video ID. */
export function videoUrl(id: string): string {
  return `https://www.youtube.com/watch?v=${encodeURIComponent(id)}`;
}

/**
 * Extract a video ID from any YouTube URL shape:
 *   youtu.be/<id>
 *   youtube.com/watch?v=<id>
 *   youtube.com/shorts/<id>
 *   youtube.com/embed/<id>
 * Returns null if we can't recognize the shape.
 */
export function videoIdFromUrl(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname === "youtu.be") {
      return u.pathname.slice(1).split("/")[0] || null;
    }
    if (u.hostname.endsWith("youtube.com")) {
      const v = u.searchParams.get("v");
      if (v) return v;
      const parts = u.pathname.split("/").filter(Boolean);
      if (parts[0] === "shorts" || parts[0] === "embed") {
        return parts[1] ?? null;
      }
    }
    return null;
  } catch {
    return null;
  }
}

/** Embed URL from a video ID (privacy-enhanced by default). */
export function embedUrl(id: string): string {
  return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}`;
}

/**
 * Given a category (type, slug), return the playlist ID if we've mapped one
 * in config.ts — else null. Used by the category landing page to render or
 * skip the "Watch on YouTube" CTA.
 */
export function playlistFor(type: string, slug: string): string | null {
  return CATEGORY_PLAYLISTS[type]?.[slug] ?? null;
}

/** Full channel URL (handle-based). */
export function channelUrl(): string {
  return YOUTUBE.channelUrl;
}
