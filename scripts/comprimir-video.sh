#!/usr/bin/env bash
#
# Comprime un video para la galeria y genera su poster.
#
#   ./scripts/comprimir-video.sh grabacion.mov video-1
#   ./scripts/comprimir-video.sh grabacion.mov mar portada
#
# Deja dos archivos:
#   public/<perfil>/<nombre>.mp4              el video ya comprimido
#   src/assets/<perfil>/<nombre>-poster.jpg   lo que se ve antes de reproducir
#
# El tercer argumento es el perfil, y por defecto es "galeria". Existe
# "portada" porque el video de la portada se ve a pantalla completa y no en una
# tarjeta de 345 px: con los ajustes de la galeria, el mar —mucho movimiento y
# mucho detalle fino, el caso peor para un codec— sale a bloques.
#
# Solo MP4, sin WebM. Lo normal es que VP9 pese menos que H.264, pero con este
# material (grabado con telefono, 4K a 45 Mbps, con grano y mucho movimiento)
# medimos lo contrario: 2,6 veces mas grande y el doble de tiempo de proceso.
# H.264 en MP4 lo reproduce cualquier navegador, asi que anadir WebM aqui solo
# restaria.
#
# Astro no procesa video, por eso hay que comprimirlo aqui y no en el build.
# El poster si va en src/assets porque ese Astro lo optimiza como una foto mas.

set -euo pipefail

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "Falta ffmpeg. En macOS: brew install ffmpeg" >&2
  exit 1
fi

if [ $# -lt 2 ] || [ $# -gt 3 ]; then
  echo "Uso: $0 <archivo-de-entrada> <nombre-de-salida> [galeria|portada]" >&2
  echo "Ejemplo: $0 ~/Desktop/corte.mov video-1" >&2
  exit 1
fi

entrada="$1"
nombre="$2"
perfil="${3:-galeria}"
raiz="$(cd "$(dirname "$0")/.." && pwd)"

case "$perfil" in
  galeria)
    # La tarjeta mide unos 345 px de ancho, asi que 540x960 sigue siendo mas
    # del doble de lo que se ve. Se probo 1280 y a tamano real no se distingue,
    # pero pesa un 42% mas y en Safari eso se nota al arrancar.
    escala="scale=-2:'min(960,ih)'"
    calidad=(-crf 34 -maxrate 700k -bufsize 1400k)
    ;;
  portada)
    # A pantalla completa manda el ancho, no el alto.
    escala="scale='min(1600,iw)':-2"
    calidad=(-crf 30 -maxrate 2000k -bufsize 4000k)
    ;;
  *)
    echo "Perfil desconocido: $perfil (usa galeria o portada)" >&2
    exit 1
    ;;
esac

mkdir -p "$raiz/public/$perfil" "$raiz/src/assets/$perfil"

# Altura maxima 960. La tarjeta mide unos 345 px de ancho, asi que 540x960
# sigue siendo mas del doble de lo que se ve. Se probo 1280 y a tamano real no
# se distingue, pero pesa un 42% mas y en Safari eso se nota al arrancar.
# -2 en el ancho lo redondea a par, que es lo que exige H.264.
# -an quita el audio: el carrusel reproduce en silencio, asi que solo pesaria.
# -movflags +faststart mueve el indice al principio del archivo para que la
# reproduccion empiece sin haber descargado el video entero.
# El tope de bitrate es lo que mas ayuda a que arranque rapido: sin el, los
# primeros segundos de un plano con mucho movimiento se comen varios megas y
# Safari se queda esperando. -g 48 mete un fotograma clave cada segundo y medio,
# para que empiece a pintar antes.
echo "→ MP4…"
ffmpeg -loglevel error -y -i "$entrada" \
  -vf "$escala" \
  -c:v libx264 "${calidad[@]}" -preset slow -profile:v high -pix_fmt yuv420p \
  -g 48 \
  -movflags +faststart -an \
  "$raiz/public/$perfil/$nombre.mp4"

# El poster se saca de la mitad del clip y no del primer fotograma. El primero
# suele ser la mano acercando el telefono o un plano de detalle sin contexto, y
# es justo la imagen que se ve mientras el video no se reproduce.
echo "→ Poster…"
duracion=$(ffprobe -v error -show_entries format=duration -of default=nw=1:nk=1 "$entrada")
mitad=$(awk -v d="$duracion" 'BEGIN { printf "%.2f", d / 2 }')
ffmpeg -loglevel error -y -ss "$mitad" -i "$entrada" \
  -vf "$escala" -frames:v 1 -q:v 3 \
  "$raiz/src/assets/$perfil/$nombre-poster.jpg"

echo
echo "Listo. Pesos:"
du -h "$raiz/public/galeria/$nombre.mp4" "$raiz/src/assets/$perfil/$nombre-poster.jpg"
echo
echo "Ahora anadelo a la lista 'galeria' de src/data/site.ts:"
cat <<EJEMPLO

  import ${nombre//-/}Poster from '../assets/$perfil/$nombre-poster.jpg';

  {
    tipo: 'video',
    mp4: '/$perfil/$nombre.mp4',
    poster: ${nombre//-/}Poster,
    alt: 'Describe aqui lo que se ve',
  },

EJEMPLO
