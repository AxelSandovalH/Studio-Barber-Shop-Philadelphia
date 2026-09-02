/**
 * Idiomas del sitio.
 *
 * El espanol es el idioma por defecto y va sin prefijo (`/`), el ingles cuelga
 * de `/en`. Cabo San Lucas recibe mucho turismo estadounidense, y quien busca
 * "barber shop cabo san lucas" no encuentra una web solo en espanol.
 */
export const IDIOMAS = ['es', 'en'] as const;

export type Idioma = (typeof IDIOMAS)[number];

export const IDIOMA_POR_DEFECTO: Idioma = 'es';

/** Codigo completo para las etiquetas hreflang y og:locale. */
export const LOCALE: Record<Idioma, string> = {
  es: 'es-MX',
  en: 'en-US',
};

/** Un texto que existe en los dos idiomas. */
export type Bilingue = Record<Idioma, string>;

/** Saca la version de un texto bilingue. */
export function t(texto: Bilingue, idioma: Idioma): string {
  return texto[idioma];
}

/**
 * Segmentos de ruta por idioma. Se traducen: una URL en ingles que dice
 * "sucursales" es peor senal para Google que una que dice "locations".
 */
export const RUTAS: Record<Idioma, { sucursales: string; servicios: string }> = {
  es: { sucursales: 'sucursales', servicios: 'servicios' },
  en: { sucursales: 'locations', servicios: 'services' },
};

/** Prefijo de URL del idioma. El idioma por defecto no lleva ninguno. */
export function prefijo(idioma: Idioma): string {
  return idioma === IDIOMA_POR_DEFECTO ? '' : `/${idioma}`;
}

/** URL de la portada en un idioma. */
export function rutaInicio(idioma: Idioma): string {
  return `${prefijo(idioma)}/`;
}

/** URL de la pagina de una sucursal en un idioma. */
export function rutaSucursal(idioma: Idioma, id: string): string {
  return `${prefijo(idioma)}/${RUTAS[idioma].sucursales}/${id}/`;
}

/**
 * URL de la pagina de un servicio en un idioma.
 *
 * La clave del servicio se usa igual en los dos idiomas, como el id de la
 * sucursal: lo que se traduce es el segmento de la ruta, no el identificador.
 */
export function rutaServicio(idioma: Idioma, clave: string): string {
  return `${prefijo(idioma)}/${RUTAS[idioma].servicios}/${clave}/`;
}

/**
 * Normaliza lo que devuelve `Astro.currentLocale`, que es `undefined` cuando la
 * URL no lleva prefijo.
 */
export function idiomaDe(actual: string | undefined): Idioma {
  return IDIOMAS.includes(actual as Idioma) ? (actual as Idioma) : IDIOMA_POR_DEFECTO;
}
