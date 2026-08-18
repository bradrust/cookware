/**
 * Recipe taxonomy — the single source of truth for every category on the
 * site. Add a value here and it's automatically:
 *   1. Available in the recipe frontmatter schema (src/content/config.ts)
 *   2. Rendered as a badge on cards + detail pages
 *   3. Given its own browse landing page at /browse/[type]/[slug]
 *   4. Counted on the /browse index
 *
 * Anything you want filtered, searched, or badged should live here.
 */

// ─────────────────────────────────────────────────────────────
// Category type registry
// ─────────────────────────────────────────────────────────────

export const CUISINES = [
  { slug: "american", label: "American" },
  { slug: "italian", label: "Italian" },
  { slug: "mexican", label: "Mexican" },
  { slug: "tex-mex", label: "Tex-Mex" },
  { slug: "asian", label: "Asian" },
  { slug: "chinese", label: "Chinese" },
  { slug: "thai", label: "Thai" },
  { slug: "japanese", label: "Japanese" },
  { slug: "korean", label: "Korean" },
  { slug: "indian", label: "Indian" },
  { slug: "mediterranean", label: "Mediterranean" },
  { slug: "greek", label: "Greek" },
  { slug: "middle-eastern", label: "Middle Eastern" },
  { slug: "french", label: "French" },
  { slug: "southern", label: "Southern" },
  { slug: "cajun", label: "Cajun" },
  { slug: "bbq", label: "BBQ" },
] as const;

export const DIETARY = [
  { slug: "vegetarian", label: "Vegetarian" },
  { slug: "vegan", label: "Vegan" },
  { slug: "keto", label: "Keto" },
  { slug: "low-carb", label: "Low-carb" },
  { slug: "gluten-free", label: "Gluten-free" },
  { slug: "dairy-free", label: "Dairy-free" },
  { slug: "high-protein", label: "High-protein" },
  { slug: "whole30", label: "Whole30" },
  { slug: "paleo", label: "Paleo" },
  { slug: "mediterranean-diet", label: "Mediterranean diet" },
  { slug: "low-sodium", label: "Low-sodium" },
] as const;

export const SPICE_LEVELS = [
  { slug: "none", label: "Not spicy", icon: "😌" },
  { slug: "mild", label: "Mild", icon: "🌶" },
  { slug: "medium", label: "Medium", icon: "🌶🌶" },
  { slug: "spicy", label: "Spicy", icon: "🌶🌶🌶" },
  { slug: "fire", label: "Fire", icon: "🔥" },
] as const;

export const OCCASIONS = [
  { slug: "weeknight", label: "Weeknight" },
  { slug: "meal-prep", label: "Meal prep / bulk" },
  { slug: "date-night", label: "Date night" },
  { slug: "first-date", label: "First date" },
  { slug: "kid-friendly", label: "Kid-friendly" },
  { slug: "cheap-eats", label: "Cheap eats" },
  { slug: "entertaining", label: "Entertaining" },
  { slug: "holiday", label: "Holiday" },
  { slug: "solo", label: "Cooking for one" },
  { slug: "family-dinner", label: "Family dinner" },
  { slug: "game-day", label: "Game day" },
] as const;

export const METHODS = [
  { slug: "sheet-pan", label: "Sheet pan" },
  { slug: "one-pot", label: "One-pot" },
  { slug: "skillet", label: "Skillet" },
  { slug: "slow-cooker", label: "Slow cooker" },
  { slug: "instant-pot", label: "Instant Pot" },
  { slug: "air-fryer", label: "Air fryer" },
  { slug: "no-cook", label: "No-cook" },
  { slug: "grill", label: "Grill" },
  { slug: "oven-baked", label: "Oven-baked" },
  { slug: "stovetop", label: "Stovetop" },
] as const;

export const PROTEINS = [
  { slug: "chicken", label: "Chicken" },
  { slug: "beef", label: "Beef" },
  { slug: "pork", label: "Pork" },
  { slug: "turkey", label: "Turkey" },
  { slug: "seafood", label: "Seafood" },
  { slug: "eggs", label: "Eggs" },
  { slug: "plant-based", label: "Plant-based" },
  { slug: "mixed", label: "Mixed" },
] as const;

export const MEAL_TYPES = [
  { slug: "breakfast", label: "Breakfast" },
  { slug: "lunch", label: "Lunch" },
  { slug: "dinner", label: "Dinner" },
  { slug: "snack", label: "Snack" },
  { slug: "dessert", label: "Dessert" },
  { slug: "appetizer", label: "Appetizer" },
  { slug: "side", label: "Side dish" },
] as const;

export const BUDGETS = [
  { slug: "cheap", label: "$ Cheap eats", description: "~$5 per serving or less" },
  { slug: "moderate", label: "$$ Moderate", description: "$6–$12 per serving" },
  { slug: "splurge", label: "$$$ Splurge", description: "$13+ per serving" },
] as const;

// ─────────────────────────────────────────────────────────────
// Union types for schema use
// ─────────────────────────────────────────────────────────────

export type CuisineSlug = (typeof CUISINES)[number]["slug"];
export type DietarySlug = (typeof DIETARY)[number]["slug"];
export type SpiceSlug = (typeof SPICE_LEVELS)[number]["slug"];
export type OccasionSlug = (typeof OCCASIONS)[number]["slug"];
export type MethodSlug = (typeof METHODS)[number]["slug"];
export type ProteinSlug = (typeof PROTEINS)[number]["slug"];
export type MealTypeSlug = (typeof MEAL_TYPES)[number]["slug"];
export type BudgetSlug = (typeof BUDGETS)[number]["slug"];

// ─────────────────────────────────────────────────────────────
// Category-type registry — drives /browse pages
// ─────────────────────────────────────────────────────────────

export type CategoryType =
  | "cuisine"
  | "dietary"
  | "spice"
  | "occasion"
  | "method"
  | "protein"
  | "meal-type"
  | "budget";

export const CATEGORY_TYPES: Array<{
  type: CategoryType;
  label: string;
  description: string;
  values: readonly { slug: string; label: string; description?: string; icon?: string }[];
  /** How this taxonomy is stored on a recipe: single value or array */
  arity: "one" | "many";
  /** Recipe frontmatter field name */
  field:
    | "cuisine"
    | "dietary"
    | "spiceLevel"
    | "occasions"
    | "method"
    | "protein"
    | "mealType"
    | "budget";
}> = [
  {
    type: "cuisine",
    label: "Cuisine",
    description: "By tradition or style.",
    values: CUISINES,
    arity: "one",
    field: "cuisine",
  },
  {
    type: "dietary",
    label: "Dietary",
    description: "Fits your eating pattern.",
    values: DIETARY,
    arity: "many",
    field: "dietary",
  },
  {
    type: "spice",
    label: "Spice level",
    description: "From kid-safe to bring-tissues.",
    values: SPICE_LEVELS,
    arity: "one",
    field: "spiceLevel",
  },
  {
    type: "occasion",
    label: "Occasion",
    description: "The moment you're cooking for.",
    values: OCCASIONS,
    arity: "many",
    field: "occasions",
  },
  {
    type: "method",
    label: "Cooking method",
    description: "By the gear that does the work.",
    values: METHODS,
    arity: "one",
    field: "method",
  },
  {
    type: "protein",
    label: "Main protein",
    description: "What's at the center of the plate.",
    values: PROTEINS,
    arity: "one",
    field: "protein",
  },
  {
    type: "meal-type",
    label: "Meal type",
    description: "Time of day / role on the table.",
    values: MEAL_TYPES,
    arity: "one",
    field: "mealType",
  },
  {
    type: "budget",
    label: "Budget",
    description: "Cost per serving.",
    values: BUDGETS,
    arity: "one",
    field: "budget",
  },
];

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

export function labelFor(type: CategoryType, slug: string): string {
  const cat = CATEGORY_TYPES.find((c) => c.type === type);
  return cat?.values.find((v) => v.slug === slug)?.label ?? slug;
}

export function categoryTypeMeta(type: CategoryType) {
  return CATEGORY_TYPES.find((c) => c.type === type);
}
