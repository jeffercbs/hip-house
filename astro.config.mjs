import { defineConfig } from "astro/config";
// integrations
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import preact from "@astrojs/preact";
import auth from "auth-astro";
// adapter
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: "https://paula.vercel.app",
  integrations: [sitemap(), tailwind(), preact(), auth()],
  output: "server",
  adapter: vercel(),
});
