import { negocio, servicios, sucursales, direccionEnLinea, type Sucursal } from './site';
import { t, type Idioma } from '../i18n/idiomas';

export interface Pregunta {
  pregunta: string;
  respuesta: string;
}

/** Horario de una sucursal en una linea: "Lunes a sabado de 10:00 a 20:30". */
function horarioEnLinea(sucursal: Sucursal, idioma: Idioma): string {
  return sucursal.horarios
    .filter((franja) => !franja.cerrado)
    .map((franja) =>
      idioma === 'en'
        ? `${t(franja.dias, idioma)} from ${franja.apertura} to ${franja.cierre}`
        : `${t(franja.dias, idioma)} de ${franja.apertura} a ${franja.cierre}`,
    )
    .join(idioma === 'en' ? ', ' : ', ');
}

/** Dias en los que esta cerrado, si los hay. */
function diasCerrado(sucursal: Sucursal, idioma: Idioma): string {
  return sucursal.horarios
    .filter((franja) => franja.cerrado)
    .map((franja) => t(franja.dias, idioma).toLowerCase())
    .join(', ');
}

/**
 * Preguntas frecuentes.
 *
 * Se generan de los datos del negocio y no se escriben a mano: si cambia un
 * horario o se anade una sucursal, la respuesta cambia sola. Y solo se
 * responde lo que consta en `site.ts`; nada de suponer que hay estacionamiento
 * o que se atiende en ingles, que eso no lo sabemos.
 */
export function preguntasFrecuentes(idioma: Idioma): Pregunta[] {
  const lista: Pregunta[] = [];
  const nombres = sucursales.map((s) => s.nombre).join(idioma === 'en' ? ' and ' : ' y ');

  // Donde estan
  lista.push({
    pregunta:
      idioma === 'en' ? `Where is ${negocio.nombre}?` : `¿Donde esta ${negocio.nombre}?`,
    respuesta:
      idioma === 'en'
        ? `We have ${sucursales.length} shops in Cabo San Lucas: ${sucursales
            .map((s) => `${s.nombre} (${direccionEnLinea(s)})`)
            .join('; ')}.`
        : `Tenemos ${sucursales.length} sucursales en Cabo San Lucas: ${sucursales
            .map((s) => `${s.nombre} (${direccionEnLinea(s)})`)
            .join('; ')}.`,
  });

  // Horario
  const cerrado = diasCerrado(sucursales[0]!, idioma);
  lista.push({
    pregunta: idioma === 'en' ? 'What are your opening hours?' : '¿Que horario tienen?',
    respuesta:
      idioma === 'en'
        ? `${horarioEnLinea(sucursales[0]!, idioma)}.${cerrado ? ` Closed on ${cerrado}.` : ''}`
        : `${horarioEnLinea(sucursales[0]!, idioma)}.${cerrado ? ` Cerramos ${cerrado}.` : ''}`,
  });

  // Como se agenda
  lista.push({
    pregunta:
      idioma === 'en' ? 'How do I book an appointment?' : '¿Como agendo una cita?',
    respuesta:
      idioma === 'en'
        ? `Message the shop you prefer on WhatsApp, or call: ${sucursales
            .map((s) => `${s.nombre} ${s.telefono}`)
            .join(', ')}.`
        : `Escribenos por WhatsApp a la sucursal que prefieras, o llamanos: ${sucursales
            .map((s) => `${s.nombre} ${s.telefono}`)
            .join(', ')}.`,
  });

  // Que servicios hay
  lista.push({
    pregunta: idioma === 'en' ? 'What services do you offer?' : '¿Que servicios ofrecen?',
    respuesta: `${servicios.map((s) => t(s.nombre, idioma)).join(', ')}.`,
  });

  // Precios: solo se contesta con cifras si las hay de verdad
  const conPrecio = servicios.filter((s) => s.precio !== undefined);
  lista.push({
    pregunta:
      idioma === 'en' ? 'How much does a haircut cost?' : '¿Cuanto cuesta un corte?',
    respuesta:
      conPrecio.length > 0
        ? idioma === 'en'
          ? `Prices start at $${Math.min(...conPrecio.map((s) => s.precio!))} MXN. Ask us for the full list.`
          : `Los precios arrancan en $${Math.min(...conPrecio.map((s) => s.precio!))} MXN. Preguntanos por la lista completa.`
        : idioma === 'en'
          ? `Prices depend on the service. Message us on WhatsApp and we will tell you before you come in.`
          : `Depende del servicio. Escribenos por WhatsApp y te decimos antes de que vengas.`,
  });

  // Cual de las dos sucursales
  if (sucursales.length > 1) {
    lista.push({
      pregunta:
        idioma === 'en'
          ? 'Which of your shops should I go to?'
          : '¿A cual de las dos sucursales voy?',
      respuesta:
        idioma === 'en'
          ? `Whichever is closer: ${nombres}. Both offer the same services and each has its own phone number.`
          : `A la que te quede mas cerca: ${nombres}. Las dos ofrecen los mismos servicios y cada una tiene su propio telefono.`,
    });
  }

  return lista;
}

/** Las mismas preguntas en el formato que espera Google. */
export function esquemaFaq(idioma: Idioma) {
  return {
    '@type': 'FAQPage',
    mainEntity: preguntasFrecuentes(idioma).map((p) => ({
      '@type': 'Question',
      name: p.pregunta,
      acceptedAnswer: { '@type': 'Answer', text: p.respuesta },
    })),
  };
}
