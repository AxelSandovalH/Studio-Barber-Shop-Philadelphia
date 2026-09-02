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
- **Cada idioma tiene sus propias rutas** (`/sucursales/...` y `/en/locations/...`,
  `/servicios/...` y `/en/services/...`) y todas las paginas pasan `rutas` al
  layout, que es de donde salen el hreflang y el conmutador de idioma. Si anades
  una pagina, tiene que existir en los dos idiomas o el hreflang apuntara a un 404. Lo que se traduce es el segmento de la ruta, no el identificador: la
  clave del servicio y el id de la sucursal son los mismos en los dos idiomas.
- **Cada servicio tiene su propia pagina**, generada de `servicios`. No hay
  contenido escrito a mano en ellas: el nombre, la descripcion y el precio salen
  de la carta, y el material de la galeria ya etiquetada por servicio.
  - **El retrato del hero va al lado del texto, no de fondo a sangre.** Se probo
    a sangre y se descarto: el material son retratos verticales 3:4 y recortarlos
    a una banda apaisada deja una tira del centro que no se entiende. Es la misma
    leccion que el arco de la galeria.
  - **Un servicio sin material etiquetado se queda sin retrato** y el texto ocupa
    el ancho. Ponerle la foto de otro servicio seria vender una cosa con la foto
    de otra.
  - Emiten `Service` con `Offer` y su miga de pan. El `provider` va en linea y no
    como referencia a un `@id`: los nodos `HairSalon` son uno por sucursal y
    viven en otras paginas, asi que apuntarles desde aqui seria una referencia
    rota.
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
- **El diseno sale del local, no de un catalogo.** El fondo crema es el del
  suelo y `pared` es el verde de las paredes. Si hay que anadir un motivo nuevo,
  sale de una foto del sitio antes que de una tendencia.
- **La galeria no lleva recortes con forma.** Se probo un arco arriba, copiando
  los marcos arqueados de la pared, y se descarto: el material son retratos
  verticales y el arco les corta la cabeza. Cualquier recorte que se plantee
  hay que verlo antes sobre las fotos reales, no sobre un marcador de posicion.
- **La paleta es clara**: fondo crema y verde de marca. El cliente descarto el
  negro expresamente. El verde `#0f3a20` esta muestreado del logo, no elegido a
  ojo; si alguna vez cambia el logo, se vuelve a muestrear. `salvia-500` es mas
  claro a proposito: a tamano grande el verde del logo se lee casi como negro,
  asi que los titulos usan el 500 y los rellenos solidos el 600.
- **El logo es `src/assets/marca/logo.svg`**, una reconstruccion vectorial del
  JPEG original, que sigue en `media-original/marca/`. Se regenera con
  `node scripts/generar-logo.mjs`, donde estan todas las medidas. Va
  **incrustado** (`import Logo from '...svg'` y `<Logo />`), no como `<img>`:
  usa `<text>` con las fuentes del sitio y un `<img>` es un documento aislado
  que no las ve. Los iconos de `public/` se generan del JPEG, que es exacto.
- **Fuentes**: se auto-hospedan con la API `fonts` de Astro, nunca con `<link>`
  a Google. **Cada familia necesita su `<Font cssVariable="...">` en el layout**
  o no se emite su `@font-face` y cae al sustituto del sistema sin avisar: asi
  estuvo la slab del logo hasta que se noto. Hay cuatro papeles y no se mezclan:
  - `font-display` (Instrument Serif) para titulares. Caja baja, tracking
    negativo y altura de linea corta. Es una serif de alto contraste: pedirle
    mayusculas con espaciado positivo, que es lo que necesitaba la condensada
    anterior, la deshilacha.
  - `font-texto` (Inter) para el cuerpo.
  - `font-mono` (IBM Plex Mono) para etiquetas, horarios, telefonos y cifras
    sueltas. Es lo que da el registro de ficha tecnica, y evita el recurso
    gastado de poner la sans del cuerpo en mayusculas con mucho espaciado. Los
    numeros que se alinean llevan ademas `tabular-nums`.
  - `font-marca` (Bebas Neue) **solo para el rotulo**, en la cabecera, el pie y
    el SVG del logo. Es la reconstruccion del rotulo real del cliente: si un dia
    cambian los titulares, esta no les acompana, o el rotulo deja de ser el
    suyo.
- **El antetitulo de seccion es la clase `.antetitulo`**, no una pila de
  utilidades. Lleva el mono en mayusculas y un filete de laton delante, y es la
  pieza que se repite en todas las secciones.
- **El laton (`laton-400/600/700`) es filete y etiqueta pequena, nunca relleno
  grande.** Sobre crema aporta la nota calida que el verde solo no da. Sale de
  las referencias del cliente, que resuelven lo mismo con un laton casi igual.
  Si se usa en superficies grandes compite con el verde de marca y el sitio deja
  de tener un solo color propio.
- **La carta de la portada ensena cada servicio con su foto.** Se probo antes
  como lista de renglones con filete de puntos hasta el precio, que se lee muy
  bien, pero obligaba a entrar en cada pagina para ver de que va el servicio. La
  foto sale de `retratoDeServicio()`, o sea de la galeria ya etiquetada: no hay
  una segunda lista de imagenes que mantener. Un servicio sin material
  etiquetado deja un hueco del color de las paredes del local; no se le pone la
  foto de otro.
- **Fotos en `src/assets/`, videos en `public/`.** Las fotos solo se optimizan
  (WebP + srcset) si Astro las importa desde `src/assets`; una foto en `public/`
  se sirve tal cual. Astro no procesa video, por eso ese va en `public/` ya
  comprimido con `scripts/comprimir-video.sh`.
- **El carrusel es scroll nativo con `scroll-snap`.** Las flechas, los puntos y
  el anclaje con GSAP son mejora progresiva encima, no la base: sin JavaScript
  la galeria sigue siendo usable.
- **En escritorio la galeria se ancla y el scroll vertical la mueve en
  horizontal** (ScrollTrigger con `pin` y `scrub`). Lo que se mueve es el
  `scrollLeft` real de la pista, no un `transform`: con un transform
  `scrollWidth === clientWidth` y se caen las flechas, los puntos, el teclado y
  el observador que reproduce solo el video visible. Por lo mismo, no uses
  `Draggable` con `type:"scrollLeft"`.
- **Mientras esta anclado hay que desactivar `scroll-snap` y `scroll-behavior`
  en la pista.** El anclado reengancha en cada fotograma y el suave anima cada
  asignacion del scrub; con cualquiera de los dos el avance sale a tirones.
- **Anclar solo si la seccion cabe en la ventana.** Si sobresale se queda parte
  fuera de vista todo el rato. Se le quita aire vertical (en estilo en linea: en
  Tailwind las utilidades ganan a la capa de componentes) y, si aun asi no cabe,
  se renuncia al efecto.
- **GSAP solo en escritorio con raton y con `import()` dinamico**, para que el
  movil no descargue 43 kB que no necesita: ahi el gesto tactil nativo ya
  funciona y anclar pelearia con el. Con `prefers-reduced-motion` tampoco se
  ancla: secuestrar el scroll es justo lo que esa preferencia pide evitar.

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
