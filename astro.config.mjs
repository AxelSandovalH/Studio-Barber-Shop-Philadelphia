// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // TODO(datos-reales): cambiar por el dominio definitivo antes de publicar.
  // Se usa para generar URLs absolutas en el sitemap y en las meta etiquetas.
  site: 'https://studiobarbershopphiladelphia.com',

  vite: {
    plugins: [tailwindcss()],
  },

  // Las fuentes se descargan en el build y se sirven desde nuestro propio
  // dominio: sin peticiones a Google en tiempo de ejecucion.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Bebas Neue',
      cssVariable: '--fuente-display',
      weights: [400],
      subsets: ['latin'],
    },
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--fuente-texto',
      weights: [400, 500, 600, 700],
      subsets: ['latin'],
    },
  ],

  integrations: [sitemap()],
});
