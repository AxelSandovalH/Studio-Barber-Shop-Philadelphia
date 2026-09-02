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
      // Solo la usa el logo. Es la reconstruccion del rotulo real del cliente,
      // asi que su tipografia no acompana a la de los titulares: si cambia una,
      // no puede cambiar la otra o el rotulo deja de ser el suyo.
      provider: fontProviders.google(),
      name: 'Bebas Neue',
      cssVariable: '--fuente-marca',
      weights: [400],
      styles: ['normal'],
      subsets: ['latin'],
    },
    {
      // Titulares. Serif de alto contraste, en caja baja y a tamano grande:
      // es lo que separa una barberia cuidada de una franquicia, y es la via
      // que siguen Hudson/Hawk y Rendezvous.
      provider: fontProviders.google(),
      name: 'Instrument Serif',
      cssVariable: '--fuente-display',
      weights: [400],
      styles: ['normal', 'italic'],
      subsets: ['latin'],
    },
    {
      // Etiquetas, horarios y datos sueltos. Un monoespaciado en los rotulos
      // pequenos da precision de ficha tecnica, y evita el recurso gastado de
      // poner la sans del cuerpo en mayusculas con mucho espaciado.
      provider: fontProviders.google(),
      name: 'IBM Plex Mono',
      cssVariable: '--fuente-mono',
      weights: [400, 500],
      styles: ['normal'],
      subsets: ['latin'],
    },
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--fuente-texto',
      weights: [400, 500, 600, 700],
      styles: ['normal'],
      subsets: ['latin'],
    },
    {
      // Solo la usa el logo. El original lleva serifas en el arco y en
      // "EST. 2019", y con una sans esas dos lineas no parecen la misma marca.
      provider: fontProviders.google(),
      name: 'Roboto Slab',
      cssVariable: '--fuente-slab',
      weights: [700],
      styles: ['normal'],
      subsets: ['latin'],
    },
  ],

  integrations: [sitemap()],
});
