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

// Fotos y posters de la tanda de septiembre de 2026.
import fadeRayaBarba from '../assets/galeria/fade-raya-barba.jpg';
import colorPlatino from '../assets/galeria/color-platino.jpg';
import barbaToallaLavabo from '../assets/galeria/barba-toalla-lavabo.jpg';
import barbaPerfilada from '../assets/galeria/barba-perfilada.jpg';
import tijeraTazon from '../assets/galeria/tijera-tazon.jpg';
import corteCortoPixie from '../assets/galeria/corte-corto-pixie.jpg';

import ninoTupe from '../assets/galeria/nino-tupe.jpg';
import ninoLinea1 from '../assets/galeria/nino-linea-1.jpg';
import ninoLinea2 from '../assets/galeria/nino-linea-2.jpg';
import ninoTexturizado1 from '../assets/galeria/nino-texturizado-1.jpg';
import ninoTexturizado2 from '../assets/galeria/nino-texturizado-2.jpg';
import ninoFade1 from '../assets/galeria/nino-fade-1.jpg';
import ninoFade2 from '../assets/galeria/nino-fade-2.jpg';
import ninoCorto from '../assets/galeria/nino-corto.jpg';
import barbaBlanca from '../assets/galeria/barba-blanca.jpg';
import barba5Poster from '../assets/galeria/barba-5-poster.jpg';
import colorAzul from '../assets/galeria/color-azul.jpg';
import colorProceso1Poster from '../assets/galeria/color-proceso-1-poster.jpg';
import colorProceso2Poster from '../assets/galeria/color-proceso-2-poster.jpg';
import colorResultadoPoster from '../assets/galeria/color-resultado-poster.jpg';
import corteBasico3Poster from '../assets/galeria/corte-basico-3-poster.jpg';
import barbaOscura from '../assets/galeria/barba-oscura.jpg';
import colorPlatinoNuca from '../assets/galeria/color-platino-nuca.jpg';
import corteBasico2Poster from '../assets/galeria/corte-basico-2-poster.jpg';
import corteBasicoVolumen from '../assets/galeria/corte-basico-volumen.jpg';
import rizosFade from '../assets/galeria/rizos-fade.jpg';
import rizosPerfil from '../assets/galeria/rizos-perfil.jpg';
import tijeraCapas from '../assets/galeria/tijera-capas.jpg';
import tijeraVolumen from '../assets/galeria/tijera-volumen.jpg';
import fadeRaya from '../assets/galeria/fade-raya.jpg';
import fadeContornos from '../assets/galeria/fade-contornos.jpg';
import corteBasico1Poster from '../assets/galeria/corte-basico-1-poster.jpg';
import fade1Poster from '../assets/galeria/fade-1-poster.jpg';
import fade2Poster from '../assets/galeria/fade-2-poster.jpg';
import fade3Poster from '../assets/galeria/fade-3-poster.jpg';
import fade4Poster from '../assets/galeria/fade-4-poster.jpg';
import fade5Poster from '../assets/galeria/fade-5-poster.jpg';
import tijera1Poster from '../assets/galeria/tijera-1-poster.jpg';
import tijera2Poster from '../assets/galeria/tijera-2-poster.jpg';
import tijera3Poster from '../assets/galeria/tijera-3-poster.jpg';
import tijera4Poster from '../assets/galeria/tijera-4-poster.jpg';
import tijera5Poster from '../assets/galeria/tijera-5-poster.jpg';
import barba1Poster from '../assets/galeria/barba-1-poster.jpg';
import barba2Poster from '../assets/galeria/barba-2-poster.jpg';
import barba3Poster from '../assets/galeria/barba-3-poster.jpg';
import barba4Poster from '../assets/galeria/barba-4-poster.jpg';
import color1Poster from '../assets/galeria/color-1-poster.jpg';
import color2Poster from '../assets/galeria/color-2-poster.jpg';
import color3Poster from '../assets/galeria/color-3-poster.jpg';

export interface Negocio {
  nombre: string;
  nombreCorto: string;
  /**
   * Como se lee la marca en la cabecera y en el pie, en dos lineas. Coincide
   * con el nombre de la ficha de Google, que es lo que conviene: si la web y
   * Google se llaman distinto, Google se fia menos de las dos.
   */
  rotulo: { principal: string; secundaria: string };
  eslogan: Bilingue;
  descripcion: Bilingue;
  /** Opcional: si no hay correo, la fila no se muestra. */
  email?: string;
  /**
   * Contacto de los servicios privados. No se agendan por la via normal: los
   * lleva una persona concreta y se habla con ella. Mientras no este puesto, la
   * seccion de servicios privados no se muestra.
   */
  privados?: {
    nombre: string;
    /** Como se escribe para que lo lea una persona. */
    telefono: string;
    /** Solo digitos, con el codigo de pais, para el enlace de WhatsApp. */
    whatsapp?: string;
  };
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

/**
 * Una opinion de un cliente, copiada literal de donde la escribio.
 *
 * `texto` no es `Bilingue` a proposito: una resena la escribio una persona en
 * su idioma, y traducirla seria ponerle en la boca palabras que no dijo. Se
 * muestra tal cual en las dos versiones del sitio, con su `lang` para que un
 * lector de pantalla la pronuncie bien.
 *
 * No se inventa ninguna. Si no hay resenas reales copiadas, la lista se queda
 * vacia y la seccion no se muestra.
 */
export interface Resena {
  /** Como firma en la ficha. Si solo hay nombre de pila, va el nombre de pila. */
  autor: string;
  /** Literal, sin corregir ni recortar. */
  texto: string;
  /** Idioma en que esta escrita. */
  idioma: Idioma;
  /** De 1 a 5, la que puso quien la escribio. */
  puntuacion: number;
  /**
   * Aproximado, AAAA-MM. Google solo publica la antiguedad relativa ("hace 9
   * meses"), asi que esto es un calculo desde la fecha en que se copio y puede
   * bailar un mes. No se muestra: sirve para saber cuando toca repasarlas.
   */
  fecha?: string;
  /** Id de la sucursal, si se sabe a cual se refiere. */
  sucursal?: string;
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

/**
 * Identificador estable de un servicio. Es lo que enlaza una foto de la galeria
 * con su servicio, para que los filtros de la galeria salgan de la carta y no
 * de una lista de etiquetas escrita aparte: asi el nombre y su traduccion
 * existen una sola vez.
 */
export type ClaveServicio =
  'corte-basico' | 'fade' | 'tijera' | 'barba' | 'rizos' | 'color' | 'facial' | 'cejas';

export interface Servicio {
  clave: ClaveServicio;
  nombre: Bilingue;
  descripcion: Bilingue;
  /** En pesos. Si no se sabe todavia, se omite y la tarjeta dice "Consultar". */
  precio?: number;
  /** El precio es un minimo, no una tarifa cerrada: se muestra "desde $X". */
  desde?: boolean;
  /** Duracion aproximada en minutos. Se omite si no se sabe. */
  duracion?: number;
  destacado?: boolean;
}

/**
 * Servicio que no se agenda por WhatsApp sino escribiendo un correo: cosas a
 * puerta cerrada, a domicilio, para grupos o eventos.
 */
export interface ServicioPrivado {
  nombre: Bilingue;
  descripcion: Bilingue;
  /** Opcional. Si no hay tarifa cerrada, se omite y se invita a preguntar. */
  precioDesde?: number;
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
type BaseMedio = {
  alt: Bilingue;
  /**
   * Servicio al que pertenece la pieza. Es lo que agrupa la galeria en
   * secciones. Se omite cuando el trabajo no cae claramente en ninguno de los
   * servicios de la carta: entonces la pieza solo sale en "Todo", que es mejor
   * que colgarla de una categoria que no le toca.
   */
  servicio?: ClaveServicio;
  /**
   * Esta es la pieza que representa a su servicio en la carta de la portada y
   * en la cabecera de su pagina.
   *
   * Existe para que esa eleccion sea explicita. Antes se cogia la primera foto
   * etiquetada, asi que reordenar la galeria cambiaba en silencio la imagen de
   * un servicio. Como mucho una por servicio; sin ninguna se recurre a la
   * primera foto, y en ultimo caso al poster de un video.
   */
  retrato?: boolean;
};

export type MedioGaleria =
  | (BaseMedio & { tipo: 'foto'; src: ImageMetadata })
  | (BaseMedio & {
      tipo: 'video';
      /** Ruta dentro de /public. */
      mp4: string;
      /** Opcional pero recomendado: pesa bastante menos que el mp4. */
      webm?: string;
      poster: ImageMetadata;
    });

/**
 * Quien hizo el sitio. Aparece en el pie, en pequeno y junto a los derechos:
 * es una firma, no un anuncio, asi que no compite con el contenido del negocio.
 */
export const autoria = {
  nombre: 'Axel Sandoval',
  url: 'https://www.axelsandoval.dev',
} as const;

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
  rotulo: { principal: 'Studio Barbershop', secundaria: 'Philadelphia' },
  eslogan: {
    es: 'Corte clasico, cuidado moderno',
    en: 'Classic cuts, modern care',
  },
  descripcion: {
    es:
      'Barberia en Cabo San Lucas con dos sucursales. Corte a tijera y a ' +
      'maquina, ritual de barba, coloracion, rizos y servicio facial.',
    en:
      'Barber shop in Cabo San Lucas with two locations. Scissor and clipper ' +
      'cuts, beard rituals, colour, curls and facial treatments.',
  },
  // TODO(datos-reales): si hay correo de contacto, ponerlo aqui. Si no, se
  // queda fuera y la web solo ofrece telefono, WhatsApp y redes.
  email: undefined,
  // Es el mismo numero que la sucursal Brisas. Se repite a proposito y no se
  // deriva de ella: si manana los privados pasan a otra linea, se cambia aqui
  // sin tocar la ficha de la sucursal.
  privados: {
    nombre: 'Juan Carlos',
    telefono: '+52 624 100 4975',
    whatsapp: '526241004975',
  },

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
    valoracion: { puntuacion: 5, total: 77, consultado: '2026-09-01' },
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
    // Se apunta por CID, el identificador de la ficha de Google, en vez de por
    // busqueda de direccion: asi el mapa cae en el sitio exacto aunque el texto
    // de la calle no coincida palabra por palabra con el de Google.
    mapaUrl: 'https://maps.google.com/?cid=13981233976724700449',
    mapaEmbedUrl: 'https://maps.google.com/maps?cid=13981233976724700449&output=embed',
    // TODO(datos-reales): confirmar el horario de esta sucursal. De momento se
    // asume el mismo que el de Brisas.
    horarios: HORARIO_HABITUAL,
  },
];

/**
 * Servicios y precios, en pesos, iguales en las dos sucursales.
 *
 * Los precios los paso el negocio. Los dos que llevan `desde` son eso, un
 * minimo: la tarjeta lo dice y los datos estructurados lo declaran como precio
 * minimo y no como tarifa cerrada, que es la diferencia entre informar y
 * prometer algo que luego no se cumple.
 *
 * TODO(datos-reales): faltan las duraciones, y saber cuales son los mas
 * pedidos para destacarlos.
 */
export const servicios: Servicio[] = [
  {
    clave: 'tijera',
    nombre: { es: 'Corte de tijera', en: 'Scissor cut' },
    descripcion: {
      es: 'Trabajo enteramente a tijera, sin maquina.',
      en: 'All-scissor work, no clippers.',
    },
    precio: 350,
  },
  {
    clave: 'fade',
    nombre: { es: 'Fade', en: 'Fade' },
    descripcion: {
      es: 'Degradado trabajado de la nuca hacia arriba.',
      en: 'Gradient worked up from the neckline.',
    },
    precio: 350,
  },
  {
    clave: 'corte-basico',
    nombre: { es: 'Corte basico', en: 'Basic cut' },
    descripcion: {
      es: 'Corte a maquina con los contornos perfilados.',
      en: 'Clipper cut with the edges cleaned up.',
    },
    precio: 300,
  },
  {
    clave: 'corte-nino',
    nombre: { es: 'Corte de nino', en: "Kids' cut" },
    descripcion: {
      es: 'Corte para ninos.',
      en: 'Haircut for children.',
    },
    precio: 250,
  },
  {
    clave: 'barba',
    nombre: { es: 'Ritual de barba', en: 'Beard ritual' },
    descripcion: {
      es: 'Perfilado y cuidado de la barba.',
      en: 'Beard shaping and grooming.',
    },
    precio: 250,
  },
  {
    clave: 'color',
    nombre: { es: 'Coloracion', en: 'Colour' },
    descripcion: {
      es: 'Color a medida. El precio depende del largo y del tono buscado.',
      en: 'Custom colour. The price depends on length and the shade you want.',
    },
    precio: 1000,
    desde: true,
  },
  {
    clave: 'rizos',
    nombre: { es: 'Rizos y ondulacion', en: 'Curls and waves' },
    descripcion: {
      es: 'Ondulado permanente. El precio depende del largo y del cabello.',
      en: 'Permanent waving. The price depends on length and hair type.',
    },
    precio: 1000,
    desde: true,
  },
  {
    clave: 'facial',
    nombre: { es: 'Facial', en: 'Facial' },
    descripcion: {
      es: 'Mascarilla hidratante y exfoliacion.',
      en: 'Hydrating mask and exfoliation.',
    },
    precio: 400,
  },
  {
    clave: 'cejas',
    nombre: { es: 'Limpieza de cejas', en: 'Eyebrow tidy' },
    descripcion: {
      es: 'Perfilado de cejas.',
      en: 'Eyebrow shaping.',
    },
    precio: 50,
  },
];

/**
 * TODO(datos-reales): faltan los servicios privados y el correo al que se
 * piden. Mientras esta lista este vacia o `negocio.email` sin rellenar, la
 * seccion no aparece: no tiene sentido invitar a escribir a una direccion que
 * no existe.
 *
 * Ejemplo de como se rellena:
 *
 *   {
 *     nombre: { es: 'Atencion a puerta cerrada', en: 'Private appointment' },
 *     descripcion: {
 *       es: 'El local para ti solo, fuera del horario habitual.',
 *       en: 'The shop to yourself, outside regular hours.',
 *     },
 *     precioDesde: 1500,
 *   },
 */
// La lista es opcional: la seccion se sostiene sin ella, con la foto y el
// contacto. Si algun dia se detallan los servicios, apareceran aqui.
export const serviciosPrivados: ServicioPrivado[] = [];

// TODO(datos-reales): resenas reales copiadas de la ficha de Google. Van
// literales: sin corregir la ortografia, sin recortar y sin traducir. Mientras
// esta lista este vacia, la seccion de opiniones no se muestra.
//
// Ninguna se inventa. Una resena inventada en la web de un negocio real es
// publicidad enganosa, y ademas se nota: las de verdad tienen faltas, emojis y
// frases a medias, y las inventadas no.
/**
 * Resenas reales copiadas de la ficha de Google de la sucursal Brisas el 1 de
 * septiembre de 2026. Van **literales**: no se corrigen las faltas ("sobretodo"
 * por "sobre todo"), no se recortan y no se traducen.
 *
 * Llevan tildes aunque el resto del codigo fuente no las use. Esa convencion es
 * para lo que escribimos nosotros; esto son palabras de otra persona y
 * quitarles las tildes seria editarlas.
 *
 * Solo entran las que se leen completas. Una resena cortada a la mitad no se
 * completa a ojo.
 */
export const resenas: Resena[] = [
  {
    autor: 'Nelva Camacho',
    texto:
      'Recomendado 100% para estilo Pixi!!! quedé muy satisfecha ya que soy mujer y no es tan fácil encontrar quien sepa hacerlo bien al menos yo no había encontrado en San Lucas , y super amable el joven Charly con instalaciones bastante agradables, me encantó!!',
    idioma: 'es',
    puntuacion: 5,
    fecha: '2025-12',
    sucursal: 'brisas',
  },
  {
    autor: 'Patricia Hernandez',
    texto: 'Me encantó, amé mi cabello!!',
    idioma: 'es',
    puntuacion: 5,
    fecha: '2026-01',
    sucursal: 'brisas',
  },
  {
    autor: 'Axel Arana',
    texto:
      'Excelente ubicación y trato por parte de Charlie! Al igual que el lugar está muy cómodo y agradable',
    idioma: 'es',
    puntuacion: 5,
    fecha: '2025-09',
    sucursal: 'brisas',
  },
  {
    autor: 'raul castro',
    texto:
      'Buenas herramientas  de trabajo, limpias, modernas, higiene, y sobretodo saben usarlas. Chequen nada más la calidad del corte de cabello y perfilado de barba.',
    idioma: 'es',
    puntuacion: 5,
    fecha: '2023-09',
    sucursal: 'brisas',
  },
  {
    autor: 'irving benitez nieves',
    texto:
      'Excelente servicio y un gran trabajo, recomendado, el lugar apenas está empezando pero vale mucho la pena.',
    idioma: 'es',
    puntuacion: 5,
    fecha: '2023-09',
    sucursal: 'brisas',
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
    src: ninoTupe,
    servicio: 'corte-nino',
    retrato: true,
    alt: {
      es: 'Tupe con las puntas aclaradas y degradado en los laterales',
      en: 'Quiff with lightened tips and faded sides',
    },
  },
  {
    tipo: 'foto',
    src: ninoLinea1,
    servicio: 'corte-nino',
    alt: {
      es: 'Corte con pua arriba y una linea rasurada en el lateral',
      en: 'Spiky cut with a shaved line on the side',
    },
  },
  {
    tipo: 'foto',
    src: ninoFade1,
    servicio: 'corte-nino',
    alt: {
      es: 'Degradado con el flequillo texturizado hacia delante',
      en: 'Fade with the fringe textured forward',
    },
  },
  {
    tipo: 'foto',
    src: ninoTexturizado1,
    servicio: 'corte-nino',
    alt: {
      es: 'Corte texturizado arriba con los laterales rebajados',
      en: 'Textured cut on top with tapered sides',
    },
  },
  {
    tipo: 'foto',
    src: ninoLinea2,
    servicio: 'corte-nino',
    alt: {
      es: 'Linea rasurada y degradado a piel, visto de perfil',
      en: 'Shaved line and skin fade, seen from the side',
    },
  },
  {
    tipo: 'foto',
    src: ninoFade2,
    servicio: 'corte-nino',
    alt: {
      es: 'Degradado terminado, de perfil',
      en: 'Finished fade, seen from the side',
    },
  },
  {
    tipo: 'foto',
    src: ninoTexturizado2,
    servicio: 'corte-nino',
    alt: {
      es: 'Corte texturizado terminado, de perfil',
      en: 'Finished textured cut, seen from the side',
    },
  },
  {
    tipo: 'foto',
    src: ninoCorto,
    servicio: 'corte-nino',
    alt: {
      es: 'Corte corto terminado, de frente',
      en: 'Finished short cut, seen from the front',
    },
  },
  {
    tipo: 'foto',
    src: colorAzul,
    servicio: 'color',
    retrato: true,
    alt: {
      es: 'Coloracion azul turquesa con degradado a piel en los laterales',
      en: 'Turquoise blue colour with a skin fade on the sides',
    },
  },
  {
    tipo: 'video',
    mp4: '/galeria/color-proceso-1.mp4',
    poster: colorProceso1Poster,
    servicio: 'color',
    alt: {
      es: 'Mechas en papel de aluminio durante la coloracion',
      en: 'Foils in place during the colour service',
    },
  },
  {
    tipo: 'video',
    mp4: '/galeria/color-resultado.mp4',
    poster: colorResultadoPoster,
    servicio: 'color',
    alt: {
      es: 'Decoloracion terminada sobre corte muy corto con degradado',
      en: 'Finished bleach on a very short cut with a fade',
    },
  },
  {
    tipo: 'video',
    mp4: '/galeria/corte-basico-3.mp4',
    poster: corteBasico3Poster,
    servicio: 'corte-basico',
    alt: {
      es: 'Corte corto terminado, visto desde atras',
      en: 'Finished short cut, seen from behind',
    },
  },
  {
    tipo: 'video',
    mp4: '/galeria/barba-5.mp4',
    poster: barba5Poster,
    servicio: 'barba',
    alt: {
      es: 'Ritual de barba pelirroja con la toalla caliente puesta',
      en: 'Ginger beard ritual with the hot towel on',
    },
  },
  {
    tipo: 'video',
    mp4: '/galeria/color-proceso-2.mp4',
    poster: colorProceso2Poster,
    servicio: 'color',
    alt: {
      es: 'Papel de aluminio colocado, de perfil, durante la coloracion',
      en: 'Foils in place, seen from the side, during the colour service',
    },
  },
  {
    tipo: 'foto',
    src: colorPlatinoNuca,
    servicio: 'color',
    alt: {
      es: 'Decoloracion a platino sobre corte muy corto, vista desde atras',
      en: 'Platinum bleach on a very short cut, seen from behind',
    },
  },
  {
    tipo: 'foto',
    src: barbaOscura,
    servicio: 'barba',
    alt: {
      es: 'Barba cerrada perfilada, reclinado junto a la ventana',
      en: 'Full beard shaped up, reclined by the window',
    },
  },
  {
    tipo: 'foto',
    src: barbaBlanca,
    servicio: 'barba',
    retrato: true,
    alt: {
      es: 'Barba blanca recien perfilada con la toalla caliente puesta',
      en: 'Freshly shaped white beard with the hot towel on',
    },
  },
  {
    tipo: 'foto',
    src: rizosFade,
    servicio: 'rizos',
    retrato: true,
    alt: {
      es: 'Rizos definidos arriba con los laterales desvanecidos',
      en: 'Defined curls on top with faded sides',
    },
  },
  {
    tipo: 'foto',
    src: corteBasicoVolumen,
    servicio: 'corte-basico',
    retrato: true,
    alt: {
      es: 'Corte con los laterales rebajados y volumen arriba',
      en: 'Cut with tapered sides and volume on top',
    },
  },
  {
    tipo: 'foto',
    src: rizosPerfil,
    servicio: 'rizos',
    alt: {
      es: 'Ondulado trabajado con degradado en los laterales, de perfil',
      en: 'Worked waves with faded sides, seen from the side',
    },
  },
  {
    tipo: 'foto',
    src: tijeraCapas,
    servicio: 'tijera',
    alt: {
      es: 'Corte a tijera en capas largas peinado a un lado',
      en: 'Long layered scissor cut swept to one side',
    },
  },
  {
    tipo: 'foto',
    src: fadeRaya,
    servicio: 'fade',
    retrato: true,
    alt: {
      es: 'Degradado con raya marcada y contornos perfilados, de perfil',
      en: 'Fade with a hard part and cleaned-up edges, seen from the side',
    },
  },
  {
    tipo: 'foto',
    src: tijeraVolumen,
    servicio: 'tijera',
    retrato: true,
    alt: {
      es: 'Corte a tijera con volumen arriba y caida al lado, de perfil',
      en: 'Scissor cut with volume on top sweeping to one side, seen from the side',
    },
  },
  {
    tipo: 'foto',
    src: fadeContornos,
    servicio: 'fade',
    alt: {
      es: 'Degradado con los contornos perfilados, visto de tres cuartos',
      en: 'Fade with the edges cleaned up, seen three-quarters on',
    },
  },
  {
    tipo: 'video',
    mp4: '/galeria/corte-basico-1.mp4',
    poster: corteBasico1Poster,
    servicio: 'corte-basico',
    alt: {
      es: 'Corte corto a maquina terminado, visto de frente',
      en: 'Finished short clipper cut, seen from the front',
    },
  },
  {
    tipo: 'video',
    mp4: '/galeria/corte-basico-2.mp4',
    poster: corteBasico2Poster,
    servicio: 'corte-basico',
    alt: {
      es: 'Corte corto a maquina con los contornos perfilados, de perfil',
      en: 'Short clipper cut with the edges cleaned up, seen from the side',
    },
  },
  {
    tipo: 'video',
    mp4: '/galeria/tijera-1.mp4',
    poster: tijera1Poster,
    servicio: 'tijera',
    alt: {
      es: 'Corte a tijera peinado hacia atras, con volumen arriba',
      en: 'Scissor cut styled back, with volume on top',
    },
  },
  {
    tipo: 'video',
    mp4: '/galeria/color-1.mp4',
    poster: color1Poster,
    servicio: 'color',
    alt: {
      es: 'Tupe decolorado a platino sobre laterales desvanecidos',
      en: 'Platinum-bleached quiff over faded sides',
    },
  },
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
    mp4: '/galeria/fade-1.mp4',
    poster: fade1Poster,
    servicio: 'fade',
    alt: {
      es: 'Degradado en cabello rubio con la nuca perfilada',
      en: 'Fade on blond hair with the neckline cleaned up',
    },
  },
  {
    tipo: 'foto',
    src: tijeraTazon,
    servicio: 'tijera',
    alt: {
      es: 'Corte de tijera con flequillo recto y caida sobre la oreja',
      en: 'Scissor cut with a blunt fringe falling over the ear',
    },
  },
  {
    tipo: 'video',
    mp4: '/galeria/barba-2.mp4',
    poster: barba2Poster,
    servicio: 'barba',
    alt: {
      es: 'Ritual de barba con toalla caliente sobre el rostro',
      en: 'Beard ritual with a hot towel over the face',
    },
  },
  {
    tipo: 'foto',
    src: colorPlatino,
    servicio: 'color',
    alt: {
      es: 'Decoloracion a platino con degradado a piel en los laterales',
      en: 'Platinum bleach with a skin fade on the sides',
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
    tipo: 'foto',
    src: tazonDegradado,
    servicio: 'fade',
    alt: {
      es: 'Corte tazon con flequillo recto y degradado en los laterales',
      en: 'Bowl cut with a blunt fringe and faded sides',
    },
  },
  {
    tipo: 'video',
    mp4: '/galeria/tijera-2.mp4',
    poster: tijera2Poster,
    servicio: 'tijera',
    alt: {
      es: 'Corte a tijera en capas, visto desde la nuca',
      en: 'Layered scissor cut, seen from the neckline',
    },
  },
  {
    tipo: 'foto',
    src: barbaToallaLavabo,
    servicio: 'barba',
    alt: {
      es: 'Toalla caliente sobre el rostro en el lavabo, antes del perfilado',
      en: 'Hot towel over the face at the basin, before shaping',
    },
  },
  {
    tipo: 'video',
    mp4: '/galeria/color-2.mp4',
    poster: color2Poster,
    servicio: 'color',
    alt: {
      es: 'Coloracion platino con degradado, terminada y peinada',
      en: 'Platinum colour with a fade, finished and styled',
    },
  },
  {
    tipo: 'foto',
    src: corteCortoPixie,
    alt: {
      es: 'Corte corto tipo pixie, terminado y peinado',
      en: 'Short pixie cut, finished and styled',
    },
  },
  {
    tipo: 'video',
    mp4: '/galeria/fade-2.mp4',
    poster: fade2Poster,
    servicio: 'fade',
    alt: {
      es: 'Degradado a piel con la barba perfilada',
      en: 'Skin fade with the beard shaped up',
    },
  },
  {
    tipo: 'video',
    mp4: '/galeria/tijera-3.mp4',
    poster: tijera3Poster,
    servicio: 'tijera',
    alt: {
      es: 'Corte a tijera con volumen arriba y patilla marcada',
      en: 'Scissor cut with volume on top and a defined sideburn',
    },
  },
  {
    tipo: 'foto',
    src: barbaPerfilada,
    servicio: 'barba',
    alt: {
      es: 'Barba perfilada tras el ritual, con la toalla aun puesta',
      en: 'Beard shaped after the ritual, towel still on',
    },
  },
  {
    tipo: 'video',
    mp4: '/galeria/color-3.mp4',
    poster: color3Poster,
    servicio: 'color',
    alt: {
      es: 'Mechas rubias sobre cabello rizado, vistas desde atras',
      en: 'Blonde highlights on curly hair, seen from behind',
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
    src: fadeRayaBarba,
    servicio: 'fade',
    alt: {
      es: 'Degradado con raya marcada a navaja y barba perfilada',
      en: 'Fade with a razor-cut hard part and a shaped beard',
    },
  },
  {
    tipo: 'video',
    mp4: '/galeria/tijera-4.mp4',
    poster: tijera4Poster,
    servicio: 'tijera',
    alt: {
      es: 'Corte a tijera con raya al lado, terminado',
      en: 'Scissor cut with a side part, finished',
    },
  },
  {
    tipo: 'video',
    mp4: '/galeria/barba-1.mp4',
    poster: barba1Poster,
    servicio: 'corte-basico',
    alt: {
      es: 'Corte corto terminado, en el sillon con el local al fondo',
      en: 'Finished short cut, in the chair with the shop behind',
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
    mp4: '/galeria/degradado.mp4',
    poster: degradadoPoster,
    servicio: 'fade',
    alt: {
      es: 'Degradado con desvanecido en la nuca, visto por detras',
      en: 'Fade tapered into the neckline, seen from behind',
    },
  },
  {
    tipo: 'video',
    mp4: '/galeria/tijera-5.mp4',
    poster: tijera5Poster,
    servicio: 'tijera',
    alt: {
      es: 'Corte a tijera oscuro con caida lateral',
      en: 'Dark scissor cut with a side sweep',
    },
  },
  {
    tipo: 'video',
    mp4: '/galeria/barba-3.mp4',
    poster: barba3Poster,
    servicio: 'barba',
    alt: {
      es: 'Toalla caliente durante el ritual de barba, reclinado',
      en: 'Hot towel during the beard ritual, fully reclined',
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
    tipo: 'video',
    mp4: '/galeria/fade-3.mp4',
    poster: fade3Poster,
    servicio: 'fade',
    alt: {
      es: 'Degradado bajo con el cabello peinado a un lado',
      en: 'Low fade with the hair swept to one side',
    },
  },
  {
    tipo: 'video',
    mp4: '/galeria/barba.mp4',
    poster: barbaPoster,
    servicio: 'barba',
    alt: {
      es: 'Perfilado de barba con navaja y toalla caliente',
      en: 'Beard shaped with a straight razor and a hot towel',
    },
  },
  {
    tipo: 'video',
    mp4: '/galeria/raya-lateral.mp4',
    poster: rayaLateralPoster,
    servicio: 'fade',
    alt: {
      es: 'Raya marcada al lado con degradado, vista por detras',
      en: 'Hard side part with a fade, seen from behind',
    },
  },
  {
    tipo: 'video',
    mp4: '/galeria/barba-4.mp4',
    poster: barba4Poster,
    servicio: 'barba',
    alt: {
      es: 'Degradado con barba pelirroja perfilada, visto desde atras',
      en: 'Fade with a shaped ginger beard, seen from behind',
    },
  },
  {
    tipo: 'video',
    mp4: '/galeria/fade-4.mp4',
    poster: fade4Poster,
    servicio: 'fade',
    alt: {
      es: 'Degradado corto con barba recortada',
      en: 'Short fade with a trimmed beard',
    },
  },
  {
    tipo: 'video',
    mp4: '/galeria/estilizado.mp4',
    poster: estilizadoPoster,
    alt: {
      es: 'Peinado hacia atras terminado, visto desde arriba',
      en: 'Finished slicked-back style, seen from above',
    },
  },
  {
    tipo: 'video',
    mp4: '/galeria/fade-5.mp4',
    poster: fade5Poster,
    servicio: 'fade',
    alt: {
      es: 'Degradado con textura arriba, visto de perfil',
      en: 'Fade with texture on top, seen from the side',
    },
  },
];

/**
 * Servicios de los que hay material en la galeria, en el orden de la carta.
 *
 * Se deriva y no se escribe a mano: una categoria sin ninguna foto no tiene
 * por que aparecer como filtro vacio, y cuando se etiqueta la primera foto de
 * un servicio su filtro sale solo, con su nombre ya traducido.
 */
export function serviciosDeGaleria(): Servicio[] {
  const conMaterial = new Set<ClaveServicio>(
    galeria.flatMap((medio) => (medio.servicio ? [medio.servicio] : [])),
  );
  return servicios.filter((servicio) => conMaterial.has(servicio.clave));
}

/** Un servicio por su clave. */
export function servicioPorClave(clave: ClaveServicio): Servicio | undefined {
  return servicios.find((servicio) => servicio.clave === clave);
}

/**
 * Las piezas de galeria etiquetadas con un servicio.
 *
 * Es lo que permite que cada pagina de servicio ensene su propio trabajo sin
 * duplicar nada: la etiqueta ya existe para los filtros de la galeria.
 */
export function mediosDeServicio(clave: ClaveServicio): MedioGaleria[] {
  return galeria.filter((medio) => medio.servicio === clave);
}

/**
 * Imagen que representa a un servicio en la carta y en su pagina.
 *
 * **Las fotos van antes que los posters de video.** Un poster sale del clip ya
 * comprimido, o sea 540x960, y las bandas de servicio lo piden a mas del doble
 * de ancho en una pantalla retina: se ve borroso porque no hay mas pixeles que
 * servir. Una foto de la camara ronda los 3024x4032 y aguanta cualquier tamano.
 * Se noto con coloracion, que tenia tres videos y una foto.
 *
 * Si no hay foto etiquetada se usa el poster del primer video, que es mejor que
 * nada. Y sin material no devuelve nada: quien la use tiene que apanarselas sin
 * imagen, porque la foto de otro servicio no vale.
 */
export function retratoDeServicio(clave: ClaveServicio): ImageMetadata | undefined {
  const medios = mediosDeServicio(clave);

  // Marcada a mano, primero: es la unica forma de que la eleccion no dependa
  // del orden del array.
  const marcada = medios.find((medio) => medio.retrato);
  if (marcada) return marcada.tipo === 'foto' ? marcada.src : marcada.poster;

  const foto = medios.find((medio) => medio.tipo === 'foto');
  if (foto) return foto.src;

  const video = medios.find((medio) => medio.tipo === 'video');
  return video?.poster;
}

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
