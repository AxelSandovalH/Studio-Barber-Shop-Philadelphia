// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

/**
 * Dominio del sitio. De aqui salen la URL canonica, las meta etiquetas y el
 * sitemap, asi que si esta mal Google indexa una direccion que no existe.
 *
 * Por orden de preferencia:
 *  1. SITE_URL, que es lo que hay que definir cuando haya dominio propio.
 *  2. El dominio de produccion que inyecta Vercel en cada build.
 *  3. localhost, para trabajar en local.
 *
 * TODO(datos-reales): cuando el dominio definitivo este contratado y apuntando,
 * definir SITE_URL en las variables de entorno del proyecto en Vercel.
 */
const dominio =
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:4321');

// https://astro.build/config
export default defineConfig({
  site: dominio,

  // Espanol sin prefijo en la raiz, ingles bajo /en. Cabo recibe mucho turismo
  // estadounidense y "barber shop cabo san lucas" no lleva a una web que solo
  // existe en espanol.
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: false },
  },

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
