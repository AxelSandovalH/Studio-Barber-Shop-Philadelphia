import type { Idioma } from './idiomas';

/**
 * Textos de interfaz. Lo que no es dato del negocio vive aqui.
 *
 * El ingles se declara como `typeof es`, asi que si se anade una clave en
 * espanol y se olvida en ingles, `npm run check` falla. Es la unica forma
 * razonable de que las dos versiones no se desincronicen con el tiempo.
 */
const es = {
  tituloSufijo: 'Barberia en Cabo San Lucas',
  saltarAlContenido: 'Saltar al contenido',

  navServicios: 'Servicios',
  navGaleria: 'Galeria',
  navSucursales: 'Sucursales',
  navPrincipal: 'Navegacion principal',
  navPrincipalMovil: 'Navegacion principal movil',
  abrirMenu: 'Abrir menu',
  cerrarMenu: 'Cerrar menu',
  inicio: 'inicio',

  agendarCita: 'Agendar cita',
  verServicios: 'Ver servicios',

  // El h1 dice que sois y donde. Es la senal mas fuerte de la pagina para una
  // busqueda local, y el eslogan solo no la da.
  heroH1: 'Barberia en Cabo San Lucas',
  heroAntetitulo: '{n} sucursales en Cabo San Lucas',

  cambiarIdioma: 'English',
  idiomaActual: 'Espanol',

  heroSucursales: 'Sucursales',
  heroAbrimos: 'Abrimos',
  heroDias: 'dias',

  serviciosEtiqueta: 'Carta de servicios',
  serviciosTitulo: 'Lo que hacemos',
  serviciosDescripcion:
    'Corte, barba y color. Elige la sucursal que te quede mas cerca y agenda tu cita.',
  masPedido: 'Mas pedido',
  consultar: 'Consultar',
  precioDesde: 'desde',
  unosMinutos: 'Unos {n} min',
  serviciosPie: 'Atendemos con y sin cita. Para asegurar tu hora,',
  serviciosPieEnlace: 'escribenos a la sucursal que prefieras',

  galeriaEtiqueta: 'Nuestro trabajo',
  galeriaTitulo: 'El resultado habla',
  galeriaDescripcion: 'Una muestra de los cortes que salen del local cada semana.',
  verMasInstagram: 'Ver mas en Instagram',
  galeriaRegion: 'Galeria de trabajos',

  anterior: 'Anterior',
  siguiente: 'Siguiente',
  video: 'Video',
  irAElemento: 'Ir a un elemento',
  irALaFoto: 'Ir a la foto {n} de {total}',
  irAlVideo: 'Ir al video {n} de {total}',

  resenasEnGoogle: 'resenas en Google',
  leerResenas: 'Leerlas',

  equipoEtiqueta: 'El equipo',
  equipoTitulo: 'Quien te atiende',
  equipoDescripcion: 'Puedes pedir a tu barbero de siempre al llegar o al escribirnos.',
  verSuTrabajo: 'Ver su trabajo',

  sucursalesEtiqueta: 'Sucursales',
  sucursalesTitulo: 'Donde encontrarnos',
  sucursalesDescripcion:
    'Dos locales en Cabo San Lucas. Cada uno con su propio telefono, asi que escribe directamente al que te quede mas cerca.',
  sucursal: 'Sucursal',
  abrirEnMaps: 'Abrir en Google Maps',
  cerrado: 'Cerrado',
  consultandoHorario: 'Consultando horario…',
  // El h1 y el titulo de la pagina de sucursal llevan la colonia: es lo que
  // diferencia una sucursal de la otra en una busqueda de "barberia cerca".
  sucursalH1: 'Barberia en {colonia}',
  sucursalAntetitulo: 'Sucursal {nombre} · {ciudad}',
  verSucursal: 'Ver esta sucursal',
  volverAlInicio: 'Volver al inicio',
  comoLlegar: 'Como llegar',
  otraSucursal: 'La otra sucursal',

  errorTitulo: 'Esta pagina no existe',
  errorTexto:
    'Puede que el enlace este mal escrito o que hayamos movido la pagina. Desde el inicio llegas a todo.',

  privadosEtiqueta: 'A puerta cerrada',
  privadosTitulo: 'Servicios privados',
  privadosDescripcion:
    'Estos no se agendan por WhatsApp. Escribenos y lo organizamos contigo.',
  privadosBoton: 'Escribir a {correo}',
  privadosAsunto: 'Consulta sobre servicios privados',
  privadosDesde: 'desde',

  faqEtiqueta: 'Preguntas frecuentes',
  faqTitulo: 'Lo que suelen preguntarnos',

  pieSecciones: 'Secciones',
  pieSucursales: 'Sucursales',
  pieDerechos: 'Todos los derechos reservados.',

  // Aviso de apertura. {hora} y {dia} se sustituyen en el navegador.
  abiertoAhora: 'Abierto ahora · cierra a las {hora}',
  cerradoAbreHoy: 'Cerrado · abre hoy a las {hora}',
  cerradoHoy: 'Cerrado hoy · {proxima}',
  cerradoAhora: 'Cerrado · {proxima}',
  abreManana: 'abre manana a las {hora}',
  abreElDia: 'abre {dia} a las {hora}',
  consultaHorario: 'consulta el horario',
  dias: [
    'el domingo',
    'el lunes',
    'el martes',
    'el miercoles',
    'el jueves',
    'el viernes',
    'el sabado',
  ],
};

const en: typeof es = {
  tituloSufijo: 'Barber Shop in Cabo San Lucas',
  saltarAlContenido: 'Skip to content',

  navServicios: 'Services',
  navGaleria: 'Gallery',
  navSucursales: 'Locations',
  navPrincipal: 'Main navigation',
  navPrincipalMovil: 'Mobile main navigation',
  abrirMenu: 'Open menu',
  cerrarMenu: 'Close menu',
  inicio: 'home',

  agendarCita: 'Book a cut',
  verServicios: 'See services',

  heroH1: 'Barber Shop in Cabo San Lucas',
  heroAntetitulo: '{n} locations in Cabo San Lucas',

  cambiarIdioma: 'Espanol',
  idiomaActual: 'English',

  heroSucursales: 'Locations',
  heroAbrimos: 'Open',
  heroDias: 'days',

  serviciosEtiqueta: 'What we do',
  serviciosTitulo: 'Services',
  serviciosDescripcion:
    'Cuts, beard work and colour. Pick whichever shop is closer and book your slot.',
  masPedido: 'Most booked',
  consultar: 'Ask us',
  precioDesde: 'from',
  unosMinutos: 'About {n} min',
  serviciosPie: 'Walk-ins welcome. To make sure you get a slot,',
  serviciosPieEnlace: 'message the shop that suits you best',

  galeriaEtiqueta: 'Our work',
  galeriaTitulo: 'See for yourself',
  galeriaDescripcion: 'A sample of the cuts leaving the shop every week.',
  verMasInstagram: 'More on Instagram',
  galeriaRegion: 'Gallery of our work',

  anterior: 'Previous',
  siguiente: 'Next',
  video: 'Video',
  irAElemento: 'Go to an item',
  irALaFoto: 'Go to photo {n} of {total}',
  irAlVideo: 'Go to video {n} of {total}',

  resenasEnGoogle: 'reviews on Google',
  leerResenas: 'Read them',

  equipoEtiqueta: 'The team',
  equipoTitulo: 'Who cuts your hair',
  equipoDescripcion: 'Ask for your usual barber when you arrive or when you message us.',
  verSuTrabajo: 'See their work',

  sucursalesEtiqueta: 'Locations',
  sucursalesTitulo: 'Where to find us',
  sucursalesDescripcion:
    'Two shops in Cabo San Lucas, each with its own phone number, so message whichever one is closer to you.',
  sucursal: 'Shop',
  abrirEnMaps: 'Open in Google Maps',
  cerrado: 'Closed',
  consultandoHorario: 'Checking hours…',
  sucursalH1: 'Barber shop in {colonia}',
  sucursalAntetitulo: '{nombre} · {ciudad}',
  verSucursal: 'See this shop',
  volverAlInicio: 'Back home',
  comoLlegar: 'Getting there',
  otraSucursal: 'Our other shop',

  errorTitulo: 'This page does not exist',
  errorTexto:
    'The link may be mistyped, or we may have moved the page. Everything is reachable from the home page.',

  privadosEtiqueta: 'By arrangement',
  privadosTitulo: 'Private services',
  privadosDescripcion:
    'These are not booked over WhatsApp. Email us and we will arrange it with you.',
  privadosBoton: 'Email {correo}',
  privadosAsunto: 'Enquiry about private services',
  privadosDesde: 'from',

  faqEtiqueta: 'FAQ',
  faqTitulo: 'What people usually ask',

  pieSecciones: 'Sections',
  pieSucursales: 'Locations',
  pieDerechos: 'All rights reserved.',

  abiertoAhora: 'Open now · closes at {hora}',
  cerradoAbreHoy: 'Closed · opens today at {hora}',
  cerradoHoy: 'Closed today · {proxima}',
  cerradoAhora: 'Closed · {proxima}',
  abreManana: 'opens tomorrow at {hora}',
  abreElDia: 'opens {dia} at {hora}',
  consultaHorario: 'check the opening hours',
  dias: [
    'on Sunday',
    'on Monday',
    'on Tuesday',
    'on Wednesday',
    'on Thursday',
    'on Friday',
    'on Saturday',
  ],
};

export type Textos = typeof es;

const DICCIONARIO: Record<Idioma, Textos> = { es, en };

export function textos(idioma: Idioma): Textos {
  return DICCIONARIO[idioma];
}

/** Sustituye {marcadores} en una cadena del diccionario. */
export function rellenar(plantilla: string, valores: Record<string, string | number>) {
  return plantilla.replace(/\{(\w+)\}/g, (_, clave) => String(valores[clave] ?? ''));
}

/**
 * Enlaces del menu, en el orden en que aparecen las secciones. Vive aqui y no
 * en site.ts porque las etiquetas son interfaz, no datos del negocio.
 */
export function navegacion(idioma: Idioma) {
  const T = textos(idioma);
  return [
    { etiqueta: T.navServicios, href: '#servicios' },
    { etiqueta: T.navGaleria, href: '#galeria' },
    { etiqueta: T.navSucursales, href: '#sucursales' },
  ];
}
