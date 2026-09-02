# Philadelphia Studio Barber Shop

Sitio web de la barberia: una landing informativa de una sola pagina con
servicios, galeria y las dos sucursales, cada una con su horario, su telefono y
su enlace directo a WhatsApp.

> **"Philadelphia" es la marca, no la ciudad.** El negocio esta en Cabo San
> Lucas, Baja California Sur, Mexico. Conviene tenerlo presente antes de tocar
> textos, moneda o datos de localizacion.

## Stack

- **Astro 7** con TypeScript en modo estricto, salida estatica.
- **Tailwind CSS 4** para los estilos.
- **Fuentes auto-hospedadas** (Bebas Neue e Inter) descargadas durante el build:
  no hay peticiones a Google cuando alguien visita el sitio.
- **@astrojs/sitemap** para el sitemap.

## Empezar

```bash
npm install
```

```bash
npm run dev
```

El servidor queda en http://localhost:4321.

| Comando                | Que hace                                       |
| ---------------------- | ---------------------------------------------- |
| `npm run dev`          | Servidor de desarrollo con recarga en caliente |
| `npm run build`        | Genera el sitio estatico en `dist/`            |
| `npm run preview`      | Sirve `dist/` para revisarlo antes de publicar |
| `npm run check`        | Revisa tipos y errores en los `.astro`         |
| `npm run format`       | Formatea todo con Prettier                     |
| `npm run format:check` | Comprueba el formato sin escribir              |

## Idiomas

El sitio esta en espanol e ingles. El espanol vive en la raiz y el ingles bajo
`/en`, con etiquetas `hreflang` reciprocas para que Google sirva cada version a
quien corresponde. Cabo San Lucas recibe mucho turismo estadounidense y
"barber shop cabo san lucas" no llevaba a una web que solo existia en espanol.

|          | Espanol               | Ingles                  |
| -------- | --------------------- | ----------------------- |
| Portada  | `/`                   | `/en/`                  |
| Sucursal | `/sucursales/brisas/` | `/en/locations/brisas/` |

Los textos de interfaz estan en [`src/i18n/textos.ts`](src/i18n/textos.ts). El
ingles se declara como `typeof es`, asi que si anades una clave en espanol y te
olvidas del ingles, `npm run check` falla en vez de dejar un hueco en la web.

Los datos de negocio que hay que traducir (nombres de servicio, descripciones,
textos `alt`) son objetos `{ es: '…', en: '…' }` dentro de `site.ts`. Lo que no
se traduce —direcciones, telefonos, horas— sigue siendo texto normal.

**Si anades una pagina, tiene que existir en los dos idiomas**, o el `hreflang`
apuntara a una URL que no existe.

## Donde se edita el contenido

**Todo el contenido del negocio vive en [`src/data/site.ts`](src/data/site.ts).**
Los componentes no tienen texto de negocio escrito a mano: leen de ahi. Para
cambiar precios, horarios o datos de contacto se edita ese archivo y nada mas.

| Que quieres cambiar                | Que exportacion tocar |
| ---------------------------------- | --------------------- |
| Nombre, eslogan, redes, correo     | `negocio`             |
| Sucursales: direccion, telefono... | `sucursales`          |
| Servicios y precios                | `servicios`           |
| Barberos                           | `barberos`            |
| Fotos de la galeria                | `galeria`             |
| Enlaces del menu                   | `navegacion`          |

Algunas cosas se calculan solas: el numero de sucursales y los dias de apertura
del inicio, el horario que Google lee de los datos estructurados y el aviso de
"abierto ahora" de cada sucursal.

Dos secciones se adaptan solas a los datos:

- Si `barberos` esta vacio, la seccion de equipo no se muestra.
- Si `serviciosPrivados` esta vacio o falta `negocio.email`, la seccion de
  servicios privados tampoco.
- Si un servicio no tiene `precio`, su tarjeta dice "Consultar" en vez de un
  importe. Si lleva `desde: true`, se muestra "desde $X" y los datos
  estructurados lo declaran como precio minimo.

## Estado de los datos

### Verificado

Sale del perfil de Instagram del negocio y de su ficha en Fresha:

- Nombre, ano de apertura (2019) y perfiles de Instagram y Facebook.
- **Sucursal Brisas**: Carretera Cabo San Lucas – Todos los Santos 25-L 1, local
  11, Brisas del Pacifico, 23473. Telefono +52 624 100 4975. Horario de lunes a
  sabado de 10:00 a 20:30, domingo cerrado. Aparece en Google Maps con 5.0
  estrellas y 71 resenas.
- **Sucursal La Joya**: Los Paredones manzana 8 lote 36-C, Villas de La Joya,
  23474, en la esquina de Leona Vicario. Telefono +52 624 265 3269.

### Pendiente

Lo que no se pudo confirmar esta marcado con `TODO(datos-reales)`:

```bash
grep -rn "TODO(datos-reales)" src astro.config.mjs public/robots.txt
```

1. **Duraciones de los servicios.** Los precios ya estan; las duraciones no, y
   la tarjeta omite esa linea mientras falten.
2. **Cuales son los servicios mas pedidos**, para marcarlos con `destacado` y
   que lleven el distintivo.
3. **Horario de la sucursal La Joya.** Ahora mismo asume el mismo que Brisas.
4. **Que el telefono de La Joya reciba WhatsApp.** El de Brisas esta confirmado.
5. **Servicios privados y el correo al que se piden.** La seccion esta hecha y
   se oculta sola: aparece en cuanto `serviciosPrivados` tenga algo y
   `negocio.email` este relleno. Sin las dos cosas no se muestra, porque
   invitar a escribir a una direccion que no existe seria peor que no tenerla.
6. **Equipo**, si se quiere mostrar. La lista esta vacia a proposito.
7. **"Atendemos con y sin cita"**, que aparece bajo la carta de servicios. Lo
   escribi yo sin confirmarlo: si no aceptais gente sin cita, hay que quitarlo.
8. **Dominio definitivo.** Mientras no lo haya, el sitio usa el que Vercel
   asigna. Cuando este contratado y apuntando, se define `SITE_URL` en las
   variables de entorno del proyecto en Vercel y se ajustan solos la URL
   canonica, el sitemap y el `robots.txt`.
9. **Permiso para publicar a clientes menores de edad.** En
   `media-original/fotos/` hay ocho fotos buenas que no estan en la web porque
   sale gente que parece menor de edad: `Fade12`, `FadeNino`,
   `NinoCortePicudoFade`, `PhiladelphiaBarbershopStudioFoto2`, `Tijera5`,
   `Tijera6`, `FadeColoracionMechas` y `PhiladelphiaBarbershopStudioFoto3`. En
   cuanto haya permiso de los padres se copian a `src/assets/galeria/` y se
   anaden a `galeria`. La edad la juzgo por la foto, asi que repasadlas: puede
   que alguna sea un adulto joven y este esperando de mas.
10. **Valoracion de Google.** Las 5.0 estrellas con 71 resenas estan copiadas a
    mano de la ficha de Brisas. Conviene repasarlas de vez en cuando: si Google
    ya va por mas, la web esta vendiendo menos de lo que teneis. La Joya no tiene
    ficha, y por eso solo aparece una.

## Galeria: fotos y videos

La galeria es un carrusel que mezcla fotos y videos. Se desliza con el dedo, con
la rueda, con el teclado y, en escritorio, arrastrando con el raton.

### Donde va cada cosa, y por que

|                       | Carpeta               | Motivo                                                                                               |
| --------------------- | --------------------- | ---------------------------------------------------------------------------------------------------- |
| Fotos                 | `src/assets/galeria/` | Astro las convierte a WebP y genera cuatro tamanos por foto. En movil se sirve la de 400 px, ~35 kB. |
| Posters de video      | `src/assets/galeria/` | Es una foto mas, se optimiza igual.                                                                  |
| Videos ya comprimidos | `public/galeria/`     | **Astro no procesa video.** Lo que pongas ahi se sirve tal cual.                                     |
| Originales de camara  | `media-original/`     | Fuera del build y fuera de git. Es el material de partida, no forma parte del sitio.                 |

Una foto en `public/` se sirve como salga de la camara. Ese es el error que mas
cuesta caro en una landing, asi que las fotos van **siempre** en `src/assets/`.

`media-original/` esta en el `.gitignore`: los originales de estos diez
elementos pesan 450 MB, contra los 22 MB que ocupa el sitio entero ya generado.
No los borres de tu disco, que son la unica copia en calidad completa.

### Anadir fotos

Deja los archivos en `src/assets/galeria/`, importalos arriba de
[`src/data/site.ts`](src/data/site.ts) y anadelos a la lista `galeria`:

```ts
import trabajo7 from '../assets/galeria/trabajo-7.jpg';

// …
{ tipo: 'foto', src: trabajo7, alt: 'Degradado con perfilado de barba' },
```

Formato **vertical 4:5**, que es la proporcion de las tarjetas. Sube el original
grande sin miedo: Astro lo reescala.

### Secciones de la galeria

Cada pieza puede llevar `servicio`, que es lo que la agrupa bajo un filtro:

```ts
{
  tipo: 'foto',
  src: trabajo7,
  servicio: 'fade',
  alt: { es: '...', en: '...' },
},
```

Las claves validas son las de la carta: `corte-basico`, `fade`, `tijera`,
`barba`, `rizos`, `color`, `facial`, `cejas`. TypeScript rechaza cualquier otra.

**Los filtros no se escriben en ninguna parte**: salen de `serviciosDeGaleria()`,
que devuelve los servicios que tienen al menos una pieza etiquetada. Etiquetar
la primera foto de coloracion hace aparecer su filtro solo, con el nombre ya
traducido a los dos idiomas; quitarla lo hace desaparecer. Una categoria vacia
nunca llega a verse.

El campo es **opcional a proposito**. Un trabajo que no cae claramente en un
servicio se deja sin etiquetar y sale solo en "Todo", que es mejor que colgarlo
de una categoria que no le toca.

Los filtros nacen ocultos y los muestra el script: sin JavaScript se ve la
galeria entera, que es el estado util, en vez de unos botones que no hacen nada.
Con menos de dos categorias con material no se dibuja la barra, porque un solo
filtro no filtra.

### Anadir videos

Deja el original en `media-original/videos/` y pasalo por el script, que
comprime y genera el poster de una sola pasada:

```bash
./scripts/comprimir-video.sh media-original/videos/corte.mov texturizado
```

Necesita ffmpeg (`brew install ffmpeg`). Al terminar te imprime el `import` y el
bloque que hay que pegar en `galeria`.

Lo que hace por dentro, por si prefieres ajustarlo: reescala a 1280 px de alto,
codifica a H.264 con `crf 32`, quita el audio y mueve el indice del MP4 al
principio (`+faststart`) para que empiece a reproducirse sin haber descargado el
archivo entero. Sube el `crf` si quieres menos peso, bajalo si quieres mas
calidad.

**Solo MP4, sin WebM.** Lo habitual es que VP9 pese menos que H.264, pero con
este material —telefono, 4K a 45 Mbps, con grano y mucho movimiento— medimos lo
contrario sobre un clip de 8 s:

| Codec        | Peso    | Tiempo |
| ------------ | ------- | ------ |
| H.264 crf 32 | 964 kB  | 5 s    |
| VP9 crf 40   | 1532 kB | 10 s   |

Mas grande y el doble de lento. Como el MP4 lo reproduce cualquier navegador,
anadir WebM aqui solo restaria. Si algun dia el material cambia, vuelve a medir
antes de darlo por hecho.

Los originales vienen grabados en horizontal con un metadato de rotacion, asi
que se ven verticales. ffmpeg lo aplica solo al decodificar; no hay que rotar
nada a mano.

### Como se comporta

- **Solo se reproduce el video que esta a la vista**, en silencio y en bucle.
  Con `preload="none"`, un video que nunca se ve no descarga ni un byte.
- **El texto `alt` importa**: es lo que leen los buscadores y los lectores de
  pantalla. Describe el corte, no escribas "foto de un corte".
- **Sin JavaScript sigue funcionando**: el carrusel es scroll nativo con
  `scroll-snap`, y las flechas y los puntos son la mejora, no la base.
- **En movil no se descarga GSAP.** El scroll tactil nativo ya tiene mejor
  inercia que cualquier cosa que programemos, asi que GSAP (unos 41 kB
  comprimidos) solo se carga en escritorio con raton, y solo cuando hace falta.
- **Se respeta `prefers-reduced-motion`**: si esta activo, no hay animaciones,
  ningun video arranca solo y aparecen los controles nativos.

### Fotos del equipo

Solo si se decide mostrar el equipo: `public/equipo/barbero-1.svg` …
`barbero-3.svg`, **verticales 4:5**. Esa seccion sigue oculta mientras la lista
`barberos` este vacia.

## SEO

Las **preguntas frecuentes** de la portada se generan en
[`src/data/faq.ts`](src/data/faq.ts) a partir de los mismos datos del negocio:
si cambias un horario o anades una sucursal, la respuesta cambia sola. Solo se
responde lo que consta en `site.ts`, nada de suponer que hay estacionamiento o
que se atiende en ingles.

Emiten ademas `FAQPage`, que es lo que puede hacer que Google despliegue las
preguntas debajo del resultado. Requisito suyo: la respuesta declarada tiene que
estar visible en la pagina, y lo esta porque sale del mismo sitio.

La pagina emite datos estructurados con **una entrada `HairSalon` por
sucursal**, generadas a partir de `site.ts`, con direccion, telefono y horario
de cada local. Es lo que permite que cada sucursal aparezca por separado en las
busquedas locales. Los precios solo se declaran cuando existen de verdad: un
precio inventado en los datos estructurados es peor que no ponerlo.

Conviene revisarlos con la
[herramienta de resultados enriquecidos](https://search.google.com/test/rich-results)
una vez publicado el sitio.

## Publicar

`npm run build` deja el sitio estatico en `dist/`. Al ser HTML, CSS e imagenes
sin servidor, se puede publicar en Netlify, Vercel, Cloudflare Pages o GitHub
Pages sin configuracion adicional mas alla de apuntar al directorio `dist`.
