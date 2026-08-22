import { negocio, sucursales, servicios, moneda, type Sucursal } from '../data/site';
import { t, type Idioma } from '../i18n/idiomas';
import { esquemaFaq } from '../data/faq';

/** Nombres de dia como los espera schema.org, indexados igual que Date.getDay(). */
const DIAS_SCHEMA = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

/**
 * Ficha de una sucursal.
 *
 * Es lo que permite que cada local aparezca por separado en las busquedas
 * locales de Google, con su direccion, su telefono y su horario.
 */
export function esquemaSucursal(sucursal: Sucursal, idioma: Idioma, url: URL) {
  return {
    '@type': 'HairSalon',
    '@id': `${url.origin}/#${sucursal.id}`,
    name: `${negocio.nombre} - ${sucursal.nombre}`,
    description: t(negocio.descripcion, idioma),
    url: url.href,
    telephone: sucursal.telefono,
    ...(negocio.email ? { email: negocio.email } : {}),
    currenciesAccepted: moneda.codigo,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${sucursal.direccion.calle}, ${sucursal.direccion.colonia}`,
      addressLocality: sucursal.direccion.ciudad,
      addressRegion: sucursal.direccion.region,
      postalCode: sucursal.direccion.codigoPostal,
      addressCountry: sucursal.direccion.paisCodigo,
    },
    sameAs: negocio.redes.map((red) => red.url),
    // Google exige que la valoracion que se declara aqui este tambien visible
    // en la pagina, y lo esta: la seccion de resenas sale de este mismo dato.
    ...(sucursal.valoracion
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: sucursal.valoracion.puntuacion,
            reviewCount: sucursal.valoracion.total,
            bestRating: 5,
          },
        }
      : {}),
    openingHoursSpecification: sucursal.horarios
      .filter((franja) => !franja.cerrado)
      .map((franja) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: franja.indices.map((indice) => DIAS_SCHEMA[indice]),
        opens: franja.apertura,
        closes: franja.cierre,
      })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: idioma === 'en' ? 'Barber services' : 'Servicios de barberia',
      itemListElement: servicios.map((servicio) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: t(servicio.nombre, idioma),
          description: t(servicio.descripcion, idioma),
        },
        // Un servicio "desde $X" se declara como precio minimo, no como
        // tarifa cerrada: si Google publica 1000 como precio final y luego se
        // cobra mas, el problema es del negocio, no de Google.
        ...(servicio.precio === undefined
          ? {}
          : servicio.desde
            ? {
                priceSpecification: {
                  '@type': 'PriceSpecification',
                  minPrice: servicio.precio,
                  priceCurrency: moneda.codigo,
                },
              }
            : { price: servicio.precio, priceCurrency: moneda.codigo }),
      })),
    },
  };
}

/**
 * Todas las sucursales mas las preguntas frecuentes, para la portada.
 *
 * El FAQPage es lo que puede hacer que Google despliegue las preguntas debajo
 * del resultado. Las respuestas salen de los mismos datos que se ven en la
 * pagina, que es justo lo que Google exige: nada de responder aqui algo que no
 * este escrito arriba.
 */
export function esquemaPortada(idioma: Idioma, url: URL) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      ...sucursales.map((sucursal) => esquemaSucursal(sucursal, idioma, url)),
      esquemaFaq(idioma),
    ],
  };
}

/** Una sola sucursal mas la miga de pan, para su pagina propia. */
export function esquemaPaginaSucursal(
  sucursal: Sucursal,
  idioma: Idioma,
  url: URL,
  rutaInicio: string,
  etiquetaSucursales: string,
) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      esquemaSucursal(sucursal, idioma, url),
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: negocio.nombre,
            item: new URL(rutaInicio, url).href,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: etiquetaSucursales,
            item: new URL(`${rutaInicio}#sucursales`, url).href,
          },
          { '@type': 'ListItem', position: 3, name: sucursal.nombre, item: url.href },
        ],
      },
    ],
  };
}
