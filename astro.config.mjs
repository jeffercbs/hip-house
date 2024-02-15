import { defineConfig } from "astro/config";
// integrations
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import auth from "auth-astro";
// adapter
import vercel from "@astrojs/vercel/serverless";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  site: "https://hip-house.vercel.app",
  integrations: [sitemap(), tailwind(), auth(), svelte()],
  output: "server",
  adapter: vercel(),
});
