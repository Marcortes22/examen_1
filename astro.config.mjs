// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://marcortes22.github.io',
  base: '/examen_1/',
  vite: {
    plugins: [tailwindcss()],
  },
});
