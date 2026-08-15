import type { APIRoute } from 'astro';

/**
 * robots.txt generado, no fijo.
 *
 * La URL del sitemap tiene que ser absoluta, asi que si estuviera escrita a
 * mano habria que acordarse de cambiarla al contratar el dominio. Saliendo de
 * `site` se ajusta sola en cada despliegue.
 */
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('sitemap-index.xml', site).href;

  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
