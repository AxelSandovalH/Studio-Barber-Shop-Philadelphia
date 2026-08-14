#!/usr/bin/env bash
#
# Comprime un video para la galeria y genera su poster.
#
#   ./scripts/comprimir-video.sh grabacion.mov video-1
#
# Deja tres archivos:
#   public/galeria/<nombre>.mp4          el que ve todo el mundo
#   public/galeria/<nombre>.webm         mas ligero donde se soporta
#   src/assets/galeria/<nombre>-poster.jpg   lo que se ve antes de reproducir
#
# Astro no procesa video, por eso hay que comprimirlo aqui y no en el build.
# El poster si va en src/assets porque ese Astro lo optimiza como una foto mas.

set -euo pipefail

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "Falta ffmpeg. En macOS: brew install ffmpeg" >&2
  exit 1
fi

if [ $# -ne 2 ]; then
  echo "Uso: $0 <archivo-de-entrada> <nombre-de-salida>" >&2
  echo "Ejemplo: $0 ~/Desktop/corte.mov video-1" >&2
  exit 1
fi

entrada="$1"
nombre="$2"
raiz="$(cd "$(dirname "$0")/.." && pwd)"

mkdir -p "$raiz/public/galeria" "$raiz/src/assets/galeria"

# Altura maxima 1280: de sobra para una tarjeta que nunca pasa de 500 px de
# ancho, incluso en pantallas de alta densidad.
# -2 en el ancho lo redondea a par, que es lo que exige H.264.
escala="scale=-2:'min(1280,ih)'"

# -an quita el audio: el carrusel reproduce en silencio, asi que solo pesaria.
# -movflags +faststart mueve el indice al principio del archivo para que la
# reproduccion empiece sin haber descargado el video entero.
echo "→ MP4…"
ffmpeg -loglevel error -y -i "$entrada" \
  -vf "$escala" \
  -c:v libx264 -crf 26 -preset slow -profile:v high -pix_fmt yuv420p \
  -movflags +faststart -an \
  "$raiz/public/galeria/$nombre.mp4"

echo "→ WebM…"
ffmpeg -loglevel error -y -i "$entrada" \
  -vf "$escala" \
  -c:v libvpx-vp9 -crf 34 -b:v 0 -an \
  "$raiz/public/galeria/$nombre.webm"

echo "→ Poster…"
ffmpeg -loglevel error -y -i "$entrada" \
  -vf "$escala" -frames:v 1 -q:v 3 \
  "$raiz/src/assets/galeria/$nombre-poster.jpg"

echo
echo "Listo. Pesos:"
du -h "$raiz/public/galeria/$nombre.mp4" "$raiz/public/galeria/$nombre.webm" \
  "$raiz/src/assets/galeria/$nombre-poster.jpg"
echo
echo "Ahora anadelo a la lista 'galeria' de src/data/site.ts:"
cat <<EJEMPLO

  {
    tipo: 'video',
    mp4: '/galeria/$nombre.mp4',
    webm: '/galeria/$nombre.webm',
    poster: ${nombre//-/}Poster,
    alt: 'Describe aqui lo que se ve',
  },

EJEMPLO
