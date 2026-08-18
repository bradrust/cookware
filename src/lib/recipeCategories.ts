import type { CollectionEntry } from "astro:content";
import { CATEGORY_TYPES, type CategoryType } from "./taxonomy";

/**
 * Given a recipe, return every (type, slug) it belongs to — flat list.
 * Used by badge components and by /browse counting logic.
 */
export function categoriesFor(
  recipe: CollectionEntry<"recipes">,
): Array<{ type: CategoryType; slug: string }> {
  const out: Array<{ type: CategoryType; slug: string }> = [];
  for (const meta of CATEGORY_TYPES) {
    const raw = (recipe.data as Record<string, unknown>)[meta.field];
    if (raw === undefined || raw === null) continue;
    const values = Array.isArray(raw) ? (raw as string[]) : [raw as string];
    for (const v of values) {
      if (v) out.push({ type: meta.type, slug: v });
    }
  }
  return out;
}

/**
 * Does a recipe belong to (type, slug)?
 */
export function recipeMatches(
  recipe: CollectionEntry<"recipes">,
  type: CategoryType,
  slug: string,
): boolean {
  const meta = CATEGORY_TYPES.find((c) => c.type === type);
  if (!meta) return false;
  const raw = (recipe.data as Record<string, unknown>)[meta.field];
  if (raw === undefined || raw === null) return false;
  if (Array.isArray(raw)) return (raw as string[]).includes(slug);
  return (raw as string) === slug;
}

/**
 * Related recipes for a given entry — same cuisine or same protein,
 * excluding the entry itself. Capped at `limit`.
 */
export function relatedRecipes(
  all: CollectionEntry<"recipes">[],
  entry: CollectionEntry<"recipes">,
  limit = 3,
): CollectionEntry<"recipes">[] {
  return all
    .filter((r) => r.slug !== entry.slug && !r.data.draft)
    .filter(
      (r) =>
        r.data.cuisine === entry.data.cuisine ||
        r.data.protein === entry.data.protein,
    )
    .sort(
      (a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf(),
    )
    .slice(0, limit);
}
