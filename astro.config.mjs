import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

/**
 * GitHub Pages configuration:
 *
 * - If deploying to a custom domain (recommended), set `site` to that URL
 *   and leave `base` unset.
 * - If deploying to `https://<user>.github.io/<repo>/`, set `base` to
 *   `/<repo>/` so all internal links resolve correctly, and set `site`
 *   to `https://<user>.github.io`.
 *
 * Both values are read at build time — update them before pushing to `main`.
 */
export default defineConfig({
  // GitHub Pages project-page URL. Update `site` to your custom domain once
  // one is configured, and remove the `base` line below at the same time.
  site: "https://bradrust.github.io",
  base: "/cookware/",
  integrations: [tailwind()],
  build: {
    assets: "_assets",
  },
});
