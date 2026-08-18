import { defineCollection, z } from "astro:content";
import {
  CUISINES,
  DIETARY,
  SPICE_LEVELS,
  OCCASIONS,
  METHODS,
  PROTEINS,
  MEAL_TYPES,
  BUDGETS,
} from "../lib/taxonomy";

/**
 * Turn a readonly taxonomy array into a Zod enum of its slug values.
 * Keeps the schema in lockstep with the taxonomy — add a value in
 * taxonomy.ts and it's automatically allowed in frontmatter.
 */
function slugEnum<T extends readonly { slug: string }[]>(items: T) {
  const slugs = items.map((i) => i.slug) as [string, ...string[]];
  return z.enum(slugs);
}

const cuisineEnum = slugEnum(CUISINES);
const dietaryEnum = slugEnum(DIETARY);
const spiceEnum = slugEnum(SPICE_LEVELS);
const occasionEnum = slugEnum(OCCASIONS);
const methodEnum = slugEnum(METHODS);
const proteinEnum = slugEnum(PROTEINS);
const mealTypeEnum = slugEnum(MEAL_TYPES);
const budgetEnum = slugEnum(BUDGETS);

const recipes = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    heroImage: z.string().optional(),
    videoUrl: z.string().url().optional(),
    prepMinutes: z.number().int().nonnegative(),
    cookMinutes: z.number().int().nonnegative(),
    servings: z.number().int().positive(),
    publishedAt: z.date(),
    updatedAt: z.date().optional(),

    // Free-form tags — anything that isn't a first-class taxonomy
    tags: z.array(z.string()).default([]),

    // Structured taxonomy — every field is validated against taxonomy.ts
    cuisine: cuisineEnum.default("american"),
    dietary: z.array(dietaryEnum).default([]),
    spiceLevel: spiceEnum.default("none"),
    occasions: z.array(occasionEnum).default([]),
    method: methodEnum.default("stovetop"),
    protein: proteinEnum.default("chicken"),
    mealType: mealTypeEnum.default("dinner"),
    budget: budgetEnum.default("moderate"),

    ingredients: z.array(
      z.object({
        name: z.string(),
        quantity: z.string().optional(),
        asin: z.string().optional(),
        pantry: z.boolean().default(false),
      }),
    ),
    cookware: z
      .array(
        z.object({
          name: z.string(),
          asin: z.string().optional(),
          url: z.string().url().optional(),
        }),
      )
      .default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { recipes };
