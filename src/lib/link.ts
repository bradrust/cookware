/**
 * Build an internal URL that respects Astro's `base` config.
 *
 * Astro sets `import.meta.env.BASE_URL` to your `base` (defaults to "/").
 * Raw `href="/foo"` bypasses the base and 404s on subpath deploys — always
 * route internal links through this helper instead.
 *
 *   link("/recipes/chicken")  // prod (base=/cookware/): "/cookware/recipes/chicken"
 *                             // dev  (base=/):          "/recipes/chicken"
 *
 * External URLs pass through untouched.
 */
export function link(path: string): string {
  if (/^[a-z][a-z0-9+.-]*:\/\//i.test(path) || path.startsWith("//")) {
    return path;
  }
  const base = import.meta.env.BASE_URL; // "/cookware/" or "/"
  const clean = path.startsWith("/") ? path.slice(1) : path;
  return `${base}${clean}`;
}
