/**
 * Client-side favorites. localStorage-only — no accounts, no backend, no
 * sync across devices. Each browser is its own island. Fine for the "let
 * me save this one recipe" use case; not fine as a real product feature.
 *
 * Storage shape: JSON-encoded array of recipe slugs.
 * Storage key: `stf:favorites`
 * Broadcast: dispatches "stf:favorites-changed" on window whenever mutated,
 * so multiple components on the same page (cards, headers) stay in sync.
 */

const KEY = "stf:favorites";
const EVENT = "stf:favorites-changed";

export function readFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((s) => typeof s === "string") : [];
  } catch {
    return [];
  }
}

function writeFavorites(next: string[]) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent(EVENT, { detail: next }));
  } catch {
    // Storage may be disabled (private mode, quota exceeded). No-op.
  }
}

export function isFavorite(slug: string): boolean {
  return readFavorites().includes(slug);
}

export function toggleFavorite(slug: string): boolean {
  const current = readFavorites();
  const idx = current.indexOf(slug);
  if (idx === -1) {
    writeFavorites([slug, ...current]);
    return true;
  }
  const next = [...current];
  next.splice(idx, 1);
  writeFavorites(next);
  return false;
}

export function onFavoritesChanged(handler: (favs: string[]) => void): () => void {
  const listener = (e: Event) => {
    const detail = (e as CustomEvent<string[]>).detail;
    handler(detail ?? readFavorites());
  };
  window.addEventListener(EVENT, listener);
  // Cross-tab sync: storage event fires in other tabs.
  const storageListener = (e: StorageEvent) => {
    if (e.key === KEY) handler(readFavorites());
  };
  window.addEventListener("storage", storageListener);
  return () => {
    window.removeEventListener(EVENT, listener);
    window.removeEventListener("storage", storageListener);
  };
}
