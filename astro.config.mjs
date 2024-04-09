import { defineConfig } from 'astro/config';
// integrations
import db from "@astrojs/db";
import tailwind from '@astrojs/tailwind';
import auth from 'auth-astro';
// adapter
import vercel from '@astrojs/vercel/serverless';
import svelte from '@astrojs/svelte';


// https://astro.build/config
export default defineConfig({
  site: 'https://hip-house.vercel.app',
  integrations: [tailwind(), auth(), svelte(), db()],
  output: 'server',
  adapter: vercel(),
  vite: {
    build: {
      cssMinify: 'lightningcss'
    }
  }
});