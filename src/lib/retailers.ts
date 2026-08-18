/**
 * URL builders for each retailer's "shop the ingredient list" flow.
 *
 * Strategy:
 *  - Amazon: individual product links by ASIN when we have one, else a
 *    search URL. Always tagged with our associate ID.
 *  - Walmart: single search URL with all ingredients — Walmart's search
 *    handles multi-item lists gracefully.
 *  - Instacart: either the Impact.com deep-link wrapper (once you're set
 *    up as a Creator) or a plain search fallback.
 *
 * Everything here is a pure function so it's easy to swap in a real
 * "Recipe to Cart" API call later (Instacart Creator Recipe API) without
 * touching pages/components.
 */

import {
  AMAZON_TAG,
  WALMART_CID,
  INSTACART_IMPACT_BASE,
} from "./config";

export type Ingredient = {
  /** Human-readable name, e.g. "boneless chicken thighs" */
  name: string;
  /** e.g. "1.5 lb" — used for display only */
  quantity?: string;
  /** Optional Amazon ASIN for a direct product link */
  asin?: string;
  /** Optional pantry flag — omit from grocery cart URLs the user probably already has */
  pantry?: boolean;
};

function amazonSearchUrl(query: string): string {
  const url = new URL("https://www.amazon.com/s");
  url.searchParams.set("k", query);
  url.searchParams.set("tag", AMAZON_TAG);
  return url.toString();
}

export function amazonUrlFor(ingredient: Ingredient): string {
  if (ingredient.asin) {
    return `https://www.amazon.com/dp/${ingredient.asin}?tag=${encodeURIComponent(
      AMAZON_TAG,
    )}`;
  }
  return amazonSearchUrl(ingredient.name);
}

/**
 * A single Walmart search URL that pre-populates a query with all the
 * fresh ingredients. Users add to cart from Walmart's search page.
 */
export function walmartCartUrl(ingredients: Ingredient[]): string {
  const q = ingredients
    .filter((i) => !i.pantry)
    .map((i) => i.name)
    .join(", ");
  const url = new URL("https://www.walmart.com/search");
  url.searchParams.set("q", q);
  if (WALMART_CID) url.searchParams.set("cid", WALMART_CID);
  return url.toString();
}

/**
 * Instacart search URL for all ingredients. When INSTACART_IMPACT_BASE is
 * set (Impact.com Creator link), we wrap the destination in the affiliate
 * redirect so clicks attribute correctly.
 */
export function instacartCartUrl(ingredients: Ingredient[]): string {
  const q = ingredients
    .filter((i) => !i.pantry)
    .map((i) => i.name)
    .join(" ");
  const searchUrl = `https://www.instacart.com/store/s?k=${encodeURIComponent(q)}`;
  if (INSTACART_IMPACT_BASE) {
    return `${INSTACART_IMPACT_BASE}${encodeURIComponent(searchUrl)}`;
  }
  return searchUrl;
}

/**
 * Generic "Amazon Fresh" all-ingredients search (fallback when a viewer
 * prefers Amazon groceries over Instacart/Walmart).
 */
export function amazonFreshUrl(ingredients: Ingredient[]): string {
  const q = ingredients
    .filter((i) => !i.pantry)
    .map((i) => i.name)
    .join(" ");
  return amazonSearchUrl(q);
}
