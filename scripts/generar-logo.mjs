import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');

/**
 * Regenera src/assets/marca/logo.svg:
 *
 *   node scripts/generar-logo.mjs
 *
 * Genera el logo en SVG a partir de las medidas tomadas del original.
 * El viewBox es 500x500, el mismo tamano del JPEG, asi que cada coordenada de
 * aqui se corresponde una a una con un pixel del archivo original y las dos
 * versiones se pueden superponer para compararlas.
 */

const VERDE = '#0f3a20';
const BLANCO = '#f7f5f1';

const r2 = (n) => Math.round(n * 100) / 100;

// ---- Poste de barbero -------------------------------------------------------
// Paralelogramo de x 240 a 276, con los cortes inclinados: cae 12 en 36 de
// ancho. Cinco bandas de 13.5 de alto con 5 de separacion.
const POSTE = { x0: 240, x1: 276, yTop: 165, caida: 12, alto: 13.5, paso: 18.5 };

function bandas() {
  const { x0, x1, yTop, caida, alto, paso } = POSTE;
  return Array.from({ length: 5 }, (_, i) => {
    const y = yTop + i * paso;
    return `M${x0} ${r2(y)} L${x1} ${r2(y + caida)} L${x1} ${r2(y + caida + alto)} L${x0} ${r2(y + alto)} Z`;
  }).join(' ');
}

// ---- Estrellas --------------------------------------------------------------
// Cinco en arco, la del centro mas alta y algo mas pequena, como en el original.
const ESTRELLAS = [
  { cx: 191.7, cy: 378.3, r: 11.7 },
  { cx: 218.3, cy: 361.7, r: 13 },
  { cx: 248.3, cy: 355, r: 10 },
  { cx: 278.3, cy: 363.3, r: 12.7 },
  { cx: 306.7, cy: 380, r: 11.7 },
];

function estrella({ cx, cy, r }) {
  const interior = r * 0.4;
  const puntos = Array.from({ length: 10 }, (_, i) => {
    const radio = i % 2 === 0 ? r : interior;
    const angulo = (-90 + i * 36) * (Math.PI / 180);
    return `${r2(cx + radio * Math.cos(angulo))},${r2(cy + radio * Math.sin(angulo))}`;
  });
  return `<polygon points="${puntos.join(' ')}" />`;
}

// ---- Arco del texto superior ------------------------------------------------
// Circunferencia deducida de tres puntos medidos: la cima del texto (255,122) y
// los extremos (46 y 453 en x, bajando hasta y=239).
const ARCO = { cx: 250, cy: 358.5, radio: 215.2 };
const caminoArco = [
  `M${ARCO.cx - ARCO.radio} ${ARCO.cy}`,
  `A${ARCO.radio} ${ARCO.radio} 0 0 1 ${ARCO.cx + ARCO.radio} ${ARCO.cy}`,
].join(' ');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" role="img">
  <title>Philadelphia Studio Barber Shop</title>

  <rect width="500" height="500" fill="${VERDE}" />

  <defs>
    <path id="arco-marca" d="${caminoArco}" />
  </defs>

  <g fill="${BLANCO}">
    <text
      font-family="var(--font-slab), Georgia, serif"
      font-weight="700"
      font-size="30"
      letter-spacing="7.19"
      text-anchor="middle"
    ><textPath href="#arco-marca" startOffset="50%">STUDIOBARBERSHOP</textPath></text>

    <path d="${bandas()}" />

    <text
      x="250"
      y="326"
      font-family="var(--font-marca), Impact, sans-serif"
      font-size="45.5"
      letter-spacing="16.8"
      text-anchor="middle"
    >PHILADELPHIA</text>

    ${ESTRELLAS.map(estrella).join('\n    ')}

    <text
      x="250"
      y="421"
      font-family="var(--font-slab), Georgia, serif"
      font-weight="700"
      font-size="13.5"
      letter-spacing="6.3"
      text-anchor="middle"
    >EST. 2019</text>
  </g>
</svg>
`;

writeFileSync(join(RAIZ, 'src/assets/marca/logo.svg'), svg);
console.log('src/assets/marca/logo.svg');

// ---- Icono del navegador ----------------------------------------------------
// El logo entero a 16 px es una mancha: el texto desaparece y solo queda un
// cuadrado verde. El poste, en cambio, se lee a cualquier tamano, asi que el
// icono es solo el poste. Ademas no lleva texto, y por tanto no depende de
// ninguna fuente: un favicon es un documento aislado y no ve las del sitio.
const ICONO = 100;
const escala = 76 / (POSTE.paso * 4 + POSTE.alto); // el poste ocupa 76 de 100
const anchoPoste = (POSTE.x1 - POSTE.x0) * escala;
const x0 = (ICONO - anchoPoste) / 2;

const bandasIcono = Array.from({ length: 5 }, (_, i) => {
  const y = 12 + i * POSTE.paso * escala;
  const caida = POSTE.caida * escala;
  const alto = POSTE.alto * escala;
  return `M${r2(x0)} ${r2(y)} L${r2(x0 + anchoPoste)} ${r2(y + caida)} L${r2(x0 + anchoPoste)} ${r2(y + caida + alto)} L${r2(x0)} ${r2(y + alto)} Z`;
}).join(' ');

const icono = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${ICONO} ${ICONO}" role="img">
  <title>Philadelphia Studio Barber Shop</title>
  <rect width="${ICONO}" height="${ICONO}" rx="18" fill="${VERDE}" />
  <path d="${bandasIcono}" fill="${BLANCO}" />
</svg>
`;

writeFileSync(join(RAIZ, 'public/favicon.svg'), icono);
console.log('public/favicon.svg');
