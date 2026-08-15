# Philadelphia Studio Barber Shop

Landing informativa de una barberia. Astro 7 estatico + Tailwind 4, una sola
pagina (`src/pages/index.astro`) compuesta de secciones.

**"Philadelphia" es la marca, no la ciudad.** El negocio esta en Cabo San Lucas,
Baja California Sur, Mexico, y tiene dos sucursales. Los precios van en pesos
mexicanos.

## Reglas del proyecto

- **El sitio es bilingue**: espanol en la raiz e ingles bajo `/en`. Los textos de
  interfaz van en `src/i18n/textos.ts` y los datos de negocio traducibles son
  `Bilingue` (`{ es, en }`) en `site.ts`. El ingles se declara como `typeof es`,
  asi que olvidarse de una clave rompe `npm run check` en vez de dejar un hueco
  en produccion. Los componentes sacan el idioma de `Astro.currentLocale` con
  `idiomaDe()`, no por props.
- **Cada idioma tiene sus propias rutas** (`/sucursales/...` y `/en/locations/...`)
  y todas las paginas pasan `rutas` al layout, que es de donde salen el hreflang
  y el conmutador de idioma. Si anades una pagina, tiene que existir en los dos
  idiomas o el hreflang apuntara a un 404.
- **Todo el contenido del negocio vive en `src/data/site.ts`.** No escribas
  textos de negocio, precios, horarios ni datos de contacto dentro de los
  componentes: importalos de ahi. Si un dato se puede derivar (numero de
  sucursales, dias abiertos), derivalo en vez de repetirlo.
- **No inventes datos de negocio.** Precios, horarios, direcciones y telefonos
  son de un negocio real: si no se saben, se dejan vacios y la interfaz se
  adapta (un servicio sin precio muestra "Consultar"; una lista vacia oculta su
  seccion). Una cifra inventada en la web o en los datos estructurados es peor
  que un hueco.
- **Los datos sin confirmar estan marcados con `TODO(datos-reales)`.** No los
  quites al editar; solo desaparecen cuando llegan los datos reales del local.
- **El sitio esta en espanol** y sin acentos en el codigo fuente, por
  consistencia con lo que ya hay.
- **Los colores salen de los tokens de `src/styles/global.css`** (`fondo` para
  superficies, `tinta` para texto, `salvia` para la marca, `poste` para la
  franja). No metas hex sueltos en los componentes. Los tokens se nombran por su
  funcion y no por su color, y en las dos escalas el numero mas alto es el que
  mas contrasta: por eso un `hover:` a un numero mayor siempre oscurece.
- **La paleta es clara**: fondo crema y verde salvia, el de las paredes del
  local. El cliente descarto el negro expresamente.
- **Fuentes**: se auto-hospedan con la API `fonts` de Astro. Se usan via las
  utilidades `font-display` y `font-texto`, no con `<link>` a Google.
- **Fotos en `src/assets/`, videos en `public/`.** Las fotos solo se optimizan
  (WebP + srcset) si Astro las importa desde `src/assets`; una foto en `public/`
  se sirve tal cual. Astro no procesa video, por eso ese va en `public/` ya
  comprimido con `scripts/comprimir-video.sh`.
- **El carrusel es scroll nativo con `scroll-snap`.** Las flechas, los puntos y
  el arrastre con GSAP son mejora progresiva encima, no la base: sin JavaScript
  la galeria sigue siendo usable. No uses `Draggable` con `type:"scrollLeft"`,
  que sustituye el scroll nativo y rompe flechas, puntos y teclado.
- **GSAP solo en escritorio con raton y con `import()` dinamico**, para que el
  movil no descargue 41 kB que no necesita: el scroll tactil nativo ya tiene
  mejor inercia.

## Desarrollo

```
npm run dev
```

Antes de dar algo por terminado: `npm run check` y `npm run build`.

Al terminar cambios de estilo, `npm run format` (Prettier ordena tambien las
clases de Tailwind).

## Documentacion

Documentacion completa: https://docs.astro.build

- [Rutas, paginas y middleware](https://docs.astro.build/en/guides/routing/)
- [Componentes de Astro](https://docs.astro.build/en/basics/astro-components/)
- [Componentes de React, Vue o Svelte](https://docs.astro.build/en/guides/framework-components/)
- [Colecciones de contenido](https://docs.astro.build/en/guides/content-collections/)
- [Estilos y Tailwind](https://docs.astro.build/en/guides/styling/)
- [Fuentes](https://docs.astro.build/en/guides/fonts/)
