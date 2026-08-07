# Philadelphia Studio Barber Shop

Landing informativa de una barberia. Astro 7 estatico + Tailwind 4, una sola
pagina (`src/pages/index.astro`) compuesta de secciones.

**"Philadelphia" es la marca, no la ciudad.** El negocio esta en Cabo San Lucas,
Baja California Sur, Mexico, y tiene dos sucursales. Los precios van en pesos
mexicanos.

## Reglas del proyecto

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
- **Los colores salen de los tokens de `src/styles/global.css`** (`tinta`,
  `laton`, `hueso`, `poste`). No metas hex sueltos en los componentes.
- **Fuentes**: se auto-hospedan con la API `fonts` de Astro. Se usan via las
  utilidades `font-display` y `font-texto`, no con `<link>` a Google.

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
