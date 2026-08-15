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
  /** Inicial de la marca para el logotipo. */
  inicial: string;
  eslogan: string;
  descripcion: string;
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
  referencia: string;
}

export interface Red {
  nombre: string;
  url: string;
  usuario: string;
}

export interface Servicio {
  nombre: string;
  descripcion: string;
  /** En pesos. Si no se sabe todavia, se omite y la tarjeta dice "Consultar". */
  precio?: number;
  /** Duracion aproximada en minutos. Se omite si no se sabe. */
  duracion?: number;
  destacado?: boolean;
}

export interface Barbero {
  nombre: string;
  rol: string;
  especialidad: string;
  /** Ruta dentro de /public. */
  foto: string;
  instagram?: string;
}

export interface FranjaHoraria {
  dias: string;
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
  | { tipo: 'foto'; src: ImageMetadata; alt: string }
  | {
      tipo: 'video';
      /** Ruta dentro de /public. */
      mp4: string;
      /** Opcional pero recomendado: pesa bastante menos que el mp4. */
      webm?: string;
      poster: ImageMetadata;
      alt: string;
    };

/** Moneda de los precios. En Cabo circula el dolar, asi que se dice explicito. */
export const moneda = {
  codigo: 'MXN',
  nota: 'Todos los precios en pesos mexicanos (MXN).',
} as const;

export const negocio: Negocio = {
  nombre: 'Philadelphia Studio Barber Shop',
  nombreCorto: 'Philadelphia Studio',
  inicial: 'P',
  eslogan: 'Corte clasico, cuidado moderno',
  descripcion:
    'Barberia en Cabo San Lucas con dos sucursales. Corte a tijera y a ' +
    'maquina, arreglo de barba, coloracion y decoloracion. Desde 2019.',
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
    // TODO(datos-reales): confirmar que este numero recibe WhatsApp.
    whatsapp: '526241004975',
    direccion: {
      calle: 'Carretera Cabo San Lucas - Todos los Santos 25-L 1, local 11',
      colonia: 'Brisas del Pacifico',
      ciudad: 'Cabo San Lucas',
      region: 'B.C.S.',
      codigoPostal: '23473',
      pais: 'Mexico',
      paisCodigo: 'MX',
      referencia: 'Sobre la carretera a Todos los Santos, en el local 11',
    },
    // TODO(datos-reales): copiado de la ficha de Google. Conviene repasarlo de
    // vez en cuando: si la web dice 71 resenas y Google ya va por 120, la web
    // esta vendiendo menos de lo que teneis.
    valoracion: { puntuacion: 5, total: 71, consultado: '2026-08-14' },
    // Horario publicado en Fresha.
    horarios: [
      {
        dias: 'Lunes a sabado',
        apertura: '10:00',
        cierre: '20:30',
        indices: [1, 2, 3, 4, 5, 6],
      },
      { dias: 'Domingo', apertura: '', cierre: '', cerrado: true, indices: [0] },
    ],
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
      referencia: 'Al llegar a la esquina de Leona Vicario',
    },
    // TODO(datos-reales): esta sucursal NO aparece en Google con esta
    // direccion, asi que el mapa solo muestra la zona. Hay que pegar aqui el
    // enlace exacto de su ficha de Google Maps.
    mapaUrl: undefined,
    mapaEmbedUrl: undefined,
    // TODO(datos-reales): confirmar el horario de esta sucursal. De momento se
    // asume el mismo que el de Brisas.
    horarios: [
      {
        dias: 'Lunes a sabado',
        apertura: '10:00',
        cierre: '20:30',
        indices: [1, 2, 3, 4, 5, 6],
      },
      { dias: 'Domingo', apertura: '', cierre: '', cerrado: true, indices: [0] },
    ],
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
    nombre: 'Corte clasico',
    descripcion: 'Corte a maquina y tijera, perfilado de contornos y peinado final.',
    destacado: true,
  },
  {
    nombre: 'Corte a tijera',
    descripcion: 'Trabajo enteramente a tijera, en version librito o clasica.',
    destacado: true,
  },
  {
    nombre: 'Corte y barba',
    descripcion: 'El corte completo mas el arreglo de barba con navaja.',
  },
  {
    nombre: 'Wolf cut',
    descripcion: 'Corte texturizado en capas para cabello largo.',
  },
  {
    nombre: 'Coloracion',
    descripcion: 'Color a medida, desde un tono natural hasta fantasia.',
  },
  {
    nombre: 'Decoloracion',
    descripcion: 'Aclarado del cabello, como paso previo al color o como acabado.',
  },
];

// TODO(datos-reales): equipo real y fotos en /public/equipo/. Si preferis no
// mostrar el equipo, vaciad esta lista y la seccion desaparece sola.
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
    alt: 'Corte pixie texturizado, terminado y peinado en el local',
  },
  {
    tipo: 'video',
    mp4: '/galeria/pixie.mp4',
    poster: pixiePoster,
    alt: 'Resultado de un corte pixie texturizado, de perfil',
  },
  {
    tipo: 'foto',
    src: tazonDegradado,
    alt: 'Corte tazon con flequillo recto y degradado en los laterales',
  },
  {
    tipo: 'video',
    mp4: '/galeria/degradado.mp4',
    poster: degradadoPoster,
    alt: 'Degradado con desvanecido en la nuca, visto por detras',
  },
  {
    tipo: 'video',
    mp4: '/galeria/barba.mp4',
    poster: barbaPoster,
    alt: 'Perfilado de barba con navaja y toalla caliente',
  },
  {
    tipo: 'foto',
    src: mulletRizado,
    alt: 'Mullet rizado con mechas rubias y laterales desvanecidos',
  },
  {
    tipo: 'video',
    mp4: '/galeria/texturizado.mp4',
    poster: texturizadoPoster,
    alt: 'Corte texturizado de largo medio con raya al lado',
  },
  {
    tipo: 'video',
    mp4: '/galeria/raya-lateral.mp4',
    poster: rayaLateralPoster,
    alt: 'Raya marcada al lado con degradado, vista por detras',
  },
  {
    tipo: 'video',
    mp4: '/galeria/clasico.mp4',
    poster: clasicoPoster,
    alt: 'Corte clasico corto en los laterales, de perfil',
  },
  {
    // TODO(datos-reales): este clip lleva un texto sobreimpreso ("Salmos
    // 150:1-6") que viene de la publicacion original de redes. Decidid si lo
    // quereis en la web; si no, hay que volver a exportarlo sin el.
    tipo: 'video',
    mp4: '/galeria/estilizado.mp4',
    poster: estilizadoPoster,
    alt: 'Peinado hacia atras terminado, visto desde arriba',
  },
];

/** Enlaces de la navegacion principal, en el orden en que aparecen las secciones. */
export const navegacion = [
  { etiqueta: 'Servicios', href: '#servicios' },
  { etiqueta: 'Galeria', href: '#galeria' },
  { etiqueta: 'Sucursales', href: '#sucursales' },
] as const;

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

/** Mensaje por defecto para pedir cita en una sucursal concreta. */
export function mensajeCita(sucursal: Sucursal): string {
  return `Hola, me gustaria agendar una cita en ${negocio.nombreCorto} (sucursal ${sucursal.nombre}).`;
}
