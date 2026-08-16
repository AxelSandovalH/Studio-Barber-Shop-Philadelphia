/**
 * Fuente unica de verdad para todo el contenido del negocio.
 *
 * Los componentes no llevan texto de negocio escrito a mano: todo sale de aqui.
 * Para actualizar precios, horarios, barberos o datos de contacto se edita
 * este archivo y nada mas.
 *
 * OJO: "Philadelphia" es la marca, no la ciudad. El negocio esta en Cabo San
 * Lucas, Baja California Sur, y tiene dos sucursales.
 *
 * Los datos verificados salen del perfil de Instagram del negocio y de su ficha
 * en Fresha. Lo que sigue marcado con TODO(datos-reales) no se pudo confirmar
 * desde fuera y lo tiene que rellenar el negocio.
 */

import type { Bilingue, Idioma } from '../i18n/idiomas';

import pixieTerminado from '../assets/galeria/pixie-terminado.jpg';
import tazonDegradado from '../assets/galeria/tazon-degradado.jpg';
import mulletRizado from '../assets/galeria/mullet-rizado.jpg';

import pixiePoster from '../assets/galeria/pixie-poster.jpg';
import degradadoPoster from '../assets/galeria/degradado-poster.jpg';
import barbaPoster from '../assets/galeria/barba-poster.jpg';
import texturizadoPoster from '../assets/galeria/texturizado-poster.jpg';
import rayaLateralPoster from '../assets/galeria/raya-lateral-poster.jpg';
import clasicoPoster from '../assets/galeria/clasico-poster.jpg';
import estilizadoPoster from '../assets/galeria/estilizado-poster.jpg';

export interface Negocio {
  nombre: string;
  nombreCorto: string;
  eslogan: Bilingue;
  descripcion: Bilingue;
  /** Ano de apertura, para la seccion de cifras. */
  desde: number;
  /** Opcional: si no hay correo, la fila no se muestra. */
  email?: string;
  redes: Red[];
}

export interface Sucursal {
  /** Identificador corto, se usa como ancla y como clave de lista. */
  id: string;
  nombre: string;
  telefono: string;
  /** Solo digitos, con codigo de pais: es el formato que exige wa.me. */
  whatsapp: string;
  direccion: Direccion;
  horarios: FranjaHoraria[];
  /**
   * Enlaces exactos de Google Maps. Si se dejan vacios, se busca por direccion,
   * lo que solo acierta si el local esta dado de alta en Google con esa
   * direccion. Rellenarlos es la forma de garantizar que el mapa apunte bien.
   */
  mapaUrl?: string;
  mapaEmbedUrl?: string;
  /** Solo si la sucursal tiene ficha en Google con resenas. */
  valoracion?: Valoracion;
}

export interface Valoracion {
  /** De 0 a 5. */
  puntuacion: number;
  total: number;
  /**
   * Cuando se consulto. Es un dato copiado a mano, asi que envejece: sirve para
   * saber de un vistazo si toca actualizarlo.
   */
  consultado: string;
}

export interface Direccion {
  calle: string;
  colonia: string;
  ciudad: string;
  region: string;
  codigoPostal: string;
  pais: string;
  /** Codigo ISO de dos letras, para los datos estructurados. */
  paisCodigo: string;
  /** Referencia corta para orientarse al llegar. */
  referencia: Bilingue;
}

export interface Red {
  nombre: string;
  url: string;
  usuario: string;
}

export interface Servicio {
  nombre: Bilingue;
  descripcion: Bilingue;
  /** En pesos. Si no se sabe todavia, se omite y la tarjeta dice "Consultar". */
  precio?: number;
  /** Duracion aproximada en minutos. Se omite si no se sabe. */
  duracion?: number;
  destacado?: boolean;
}

export interface Barbero {
  nombre: string;
  rol: Bilingue;
  especialidad: Bilingue;
  /** Ruta dentro de /public. */
  foto: string;
  instagram?: string;
}

export interface FranjaHoraria {
  dias: Bilingue;
  apertura: string;
  cierre: string;
  cerrado?: boolean;
  /** Indices de dia segun Date.getDay(): 0 domingo ... 6 sabado. */
  indices: number[];
}

/**
 * Un elemento de la galeria: foto o video.
 *
 * Las fotos se importan desde src/assets, no desde public: solo asi Astro las
 * convierte a AVIF y WebP y genera el srcset responsive. Una foto en public/
 * se sirve tal cual salio de la camara.
 *
 * Los videos si van en public/galeria/, porque Astro no procesa video. Hay que
 * comprimirlos a mano antes (las ordenes de ffmpeg estan en el README) y darles
 * siempre un poster, que es lo que se ve mientras no se reproducen.
 */
export type MedioGaleria =
  | { tipo: 'foto'; src: ImageMetadata; alt: Bilingue }
  | {
      tipo: 'video';
      /** Ruta dentro de /public. */
      mp4: string;
      /** Opcional pero recomendado: pesa bastante menos que el mp4. */
      webm?: string;
      poster: ImageMetadata;
      alt: Bilingue;
    };

/** Moneda de los precios. En Cabo circula el dolar, asi que se dice explicito. */
export const moneda = {
  codigo: 'MXN',
  nota: {
    es: 'Todos los precios en pesos mexicanos (MXN).',
    en: 'All prices in Mexican pesos (MXN).',
  },
} as const;

export const negocio: Negocio = {
  nombre: 'Philadelphia Studio Barber Shop',
  nombreCorto: 'Philadelphia Studio',
  eslogan: {
    es: 'Corte clasico, cuidado moderno',
    en: 'Classic cuts, modern care',
  },
  descripcion: {
    es:
      'Barberia en Cabo San Lucas con dos sucursales. Corte a tijera y a ' +
      'maquina, arreglo de barba, coloracion y decoloracion. Desde 2019.',
    en:
      'Barber shop in Cabo San Lucas with two locations. Scissor and clipper ' +
      'cuts, beard trims, colour and bleaching. Open since 2019.',
  },
  desde: 2019,

  // TODO(datos-reales): si hay correo de contacto, ponerlo aqui. Si no, se
  // queda fuera y la web solo ofrece telefono, WhatsApp y redes.
  email: undefined,

  redes: [
    {
      nombre: 'Instagram',
      url: 'https://www.instagram.com/philadelphia_studio_barbershop/',
      usuario: '@philadelphia_studio_barbershop',
    },
    {
      nombre: 'Facebook',
      url: 'https://www.facebook.com/p/philadelphia_studio_barbershop-100088946935662/',
      usuario: 'Philadelphia Studio Barber Shop',
    },
  ],
};

/** Horario compartido por las dos sucursales, para no repetirlo. */
const HORARIO_HABITUAL: FranjaHoraria[] = [
  {
    dias: { es: 'Lunes a sabado', en: 'Monday to Saturday' },
    apertura: '10:00',
    cierre: '20:30',
    indices: [1, 2, 3, 4, 5, 6],
  },
  {
    dias: { es: 'Domingo', en: 'Sunday' },
    apertura: '',
    cierre: '',
    cerrado: true,
    indices: [0],
  },
];

/**
 * Las dos sucursales. El orden es el que se ve en la web.
 *
 * Los telefonos salen de la biografia de Instagram, que los reparte asi:
 * "Citas Brisas Terranova" y "Citas Sucursal La Joya & Leona Vicario".
 */
export const sucursales: Sucursal[] = [
  {
    id: 'brisas',
    nombre: 'Brisas',
    telefono: '+52 624 100 4975',
    // Confirmado: el negocio responde "le paso WhatsApp 6241004975" en los
    // comentarios de su propio Instagram.
    whatsapp: '526241004975',
    direccion: {
      calle: 'Carretera Cabo San Lucas - Todos los Santos 25-L 1, local 11',
      colonia: 'Brisas del Pacifico',
      ciudad: 'Cabo San Lucas',
      region: 'B.C.S.',
      codigoPostal: '23473',
      pais: 'Mexico',
      paisCodigo: 'MX',
      referencia: {
        es: 'Sobre la carretera a Todos los Santos, en el local 11',
        en: 'On the Todos Santos highway, unit 11',
      },
    },
    // TODO(datos-reales): copiado de la ficha de Google. Conviene repasarlo de
    // vez en cuando: si la web dice 71 resenas y Google ya va por 120, la web
    // esta vendiendo menos de lo que teneis.
    valoracion: { puntuacion: 5, total: 71, consultado: '2026-08-14' },
    // Horario publicado en Fresha.
    horarios: HORARIO_HABITUAL,
  },
  {
    id: 'la-joya',
    nombre: 'La Joya',
    telefono: '+52 624 265 3269',
    // TODO(datos-reales): confirmar que este numero recibe WhatsApp.
    whatsapp: '526242653269',
    direccion: {
      calle: 'Los Paredones, manzana 8, lote 36-C',
      colonia: 'Villas de La Joya',
      ciudad: 'Cabo San Lucas',
      region: 'B.C.S.',
      codigoPostal: '23474',
      pais: 'Mexico',
      paisCodigo: 'MX',
      referencia: {
        es: 'Al llegar a la esquina de Leona Vicario',
        en: 'At the corner of Leona Vicario',
      },
    },
    // TODO(datos-reales): esta sucursal NO aparece en Google con esta
    // direccion, asi que el mapa solo muestra la zona. Hay que darla de alta en
    // Google Business y pegar aqui el enlace de su ficha. Sin ficha propia es
    // invisible en las busquedas de "barberia cerca de mi".
    mapaUrl: undefined,
    mapaEmbedUrl: undefined,
    // TODO(datos-reales): confirmar el horario de esta sucursal. De momento se
    // asume el mismo que el de Brisas.
    horarios: HORARIO_HABITUAL,
  },
];

/**
 * Servicios.
 *
 * TODO(datos-reales): faltan TODOS los precios y las duraciones. No se han
 * puesto cifras inventadas a proposito: mientras el campo `precio` este vacio,
 * la tarjeta muestra "Consultar" en vez de un importe que no es real.
 * Los nombres salen de lo que el negocio publica en Instagram.
 */
export const servicios: Servicio[] = [
  {
    nombre: { es: 'Corte clasico', en: 'Classic cut' },
    descripcion: {
      es: 'Corte a maquina y tijera, perfilado de contornos y peinado final.',
      en: 'Clipper and scissor cut, clean edges and a finished style.',
    },
    destacado: true,
  },
  {
    nombre: { es: 'Corte a tijera', en: 'Scissor cut' },
    descripcion: {
      es: 'Trabajo enteramente a tijera, en version librito o clasica.',
      en: 'All-scissor work, in the librito or the classic shape.',
    },
    destacado: true,
  },
  {
    nombre: { es: 'Corte y barba', en: 'Cut and beard' },
    descripcion: {
      es: 'El corte completo mas el arreglo de barba con navaja.',
      en: 'The full cut plus a straight-razor beard trim.',
    },
  },
  {
    nombre: { es: 'Wolf cut', en: 'Wolf cut' },
    descripcion: {
      es: 'Corte texturizado en capas para cabello largo.',
      en: 'Layered, textured cut for longer hair.',
    },
  },
  {
    nombre: { es: 'Coloracion', en: 'Colour' },
    descripcion: {
      es: 'Color a medida, desde un tono natural hasta fantasia.',
      en: 'Custom colour, from natural tones to fantasy shades.',
    },
  },
  {
    nombre: { es: 'Decoloracion', en: 'Bleaching' },
    descripcion: {
      es: 'Aclarado del cabello, como paso previo al color o como acabado.',
      en: 'Lightening, either before colour or as the finish itself.',
    },
  },
];

// TODO(datos-reales): equipo real y fotos en /public/equipo/. Si preferis no
// mostrar el equipo, dejad esta lista vacia y la seccion desaparece sola.
export const barberos: Barbero[] = [];

/**
 * Fotos y videos reales del local. Se alternan a proposito para que el carrusel
 * no sea una fila de videos seguida de una fila de fotos, y empieza con una
 * foto porque carga antes que el poster de un video.
 *
 * Los videos salen de los originales de media-original/videos/ pasados por
 * scripts/comprimir-video.sh. Ese material no esta en el repositorio: pesa
 * 440 MB y no forma parte del sitio.
 */
export const galeria: MedioGaleria[] = [
  {
    tipo: 'foto',
    src: pixieTerminado,
    alt: {
      es: 'Corte pixie texturizado, terminado y peinado en el local',
      en: 'Textured pixie cut, finished and styled in the shop',
    },
  },
  {
    tipo: 'video',
    mp4: '/galeria/pixie.mp4',
    poster: pixiePoster,
    alt: {
      es: 'Resultado de un corte pixie texturizado, de perfil',
      en: 'A finished textured pixie cut, seen from the side',
    },
  },
  {
    tipo: 'foto',
    src: tazonDegradado,
    alt: {
      es: 'Corte tazon con flequillo recto y degradado en los laterales',
      en: 'Bowl cut with a blunt fringe and faded sides',
    },
  },
  {
    tipo: 'video',
    mp4: '/galeria/degradado.mp4',
    poster: degradadoPoster,
    alt: {
      es: 'Degradado con desvanecido en la nuca, visto por detras',
      en: 'Fade tapered into the neckline, seen from behind',
    },
  },
  {
    tipo: 'video',
    mp4: '/galeria/barba.mp4',
    poster: barbaPoster,
    alt: {
      es: 'Perfilado de barba con navaja y toalla caliente',
      en: 'Beard shaped with a straight razor and a hot towel',
    },
  },
  {
    tipo: 'foto',
    src: mulletRizado,
    alt: {
      es: 'Mullet rizado con mechas rubias y laterales desvanecidos',
      en: 'Curly mullet with blonde highlights and faded sides',
    },
  },
  {
    tipo: 'video',
    mp4: '/galeria/texturizado.mp4',
    poster: texturizadoPoster,
    alt: {
      es: 'Corte texturizado de largo medio con raya al lado',
      en: 'Mid-length textured cut with a side part',
    },
  },
  {
    tipo: 'video',
    mp4: '/galeria/raya-lateral.mp4',
    poster: rayaLateralPoster,
    alt: {
      es: 'Raya marcada al lado con degradado, vista por detras',
      en: 'Hard side part with a fade, seen from behind',
    },
  },
  {
    tipo: 'video',
    mp4: '/galeria/clasico.mp4',
    poster: clasicoPoster,
    alt: {
      es: 'Corte clasico corto en los laterales, de perfil',
      en: 'Classic cut, short on the sides, seen from the side',
    },
  },
  {
    // TODO(datos-reales): este clip lleva un texto sobreimpreso ("Salmos
    // 150:1-6") que viene de la publicacion original de redes. Decidid si lo
    // quereis en la web; si no, hay que volver a exportarlo sin el.
    tipo: 'video',
    mp4: '/galeria/estilizado.mp4',
    poster: estilizadoPoster,
    alt: {
      es: 'Peinado hacia atras terminado, visto desde arriba',
      en: 'Finished slicked-back style, seen from above',
    },
  },
];

/** Direccion en una sola linea, para meta etiquetas y enlaces de mapa. */
export function direccionEnLinea(sucursal: Sucursal): string {
  const { calle, colonia, ciudad, region, codigoPostal } = sucursal.direccion;
  return `${calle}, ${colonia}, ${codigoPostal} ${ciudad}, ${region}`;
}

/** Enlace a Google Maps: el exacto si lo hay, si no una busqueda por direccion. */
export function enlaceMapa(sucursal: Sucursal): string {
  if (sucursal.mapaUrl) return sucursal.mapaUrl;
  const consulta = `${negocio.nombre}, ${direccionEnLinea(sucursal)}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(consulta)}`;
}

/** URL del mapa incrustado de la sucursal, con la misma logica de respaldo. */
export function enlaceMapaEmbed(sucursal: Sucursal): string {
  if (sucursal.mapaEmbedUrl) return sucursal.mapaEmbedUrl;
  const consulta = `${negocio.nombre}, ${direccionEnLinea(sucursal)}`;
  return `https://www.google.com/maps?q=${encodeURIComponent(consulta)}&output=embed`;
}

/** Enlace de WhatsApp con un mensaje ya escrito. */
export function enlaceWhatsapp(sucursal: Sucursal, mensaje: string): string {
  return `https://wa.me/${sucursal.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}

/** Enlace telefonico: tel: no admite espacios ni parentesis. */
export function enlaceTelefono(sucursal: Sucursal): string {
  return `tel:${sucursal.telefono.replace(/[^\d+]/g, '')}`;
}

/** Mensaje por defecto para pedir cita, en el idioma de quien navega. */
export function mensajeCita(sucursal: Sucursal, idioma: Idioma): string {
  return idioma === 'en'
    ? `Hi, I would like to book a cut at ${negocio.nombreCorto} (${sucursal.nombre}).`
    : `Hola, me gustaria agendar una cita en ${negocio.nombreCorto} (sucursal ${sucursal.nombre}).`;
}
