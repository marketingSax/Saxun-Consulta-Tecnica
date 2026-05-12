import { fullDossierContext } from "@/data/dossier-context-full";

/**
 * Motor de búsqueda técnica local (Fallback)
 * Analiza el contexto del dossier para encontrar respuestas cuando la IA no está disponible.
 */
export function getLocalTechnicalResponse(query: string): string {
  const q = query.toLowerCase();
  
  // Lógica de búsqueda simple por palabras clave
  if (q.includes("lama") || q.includes("medida") || q.includes("máxima")) {
    if (q.includes("d-5")) {
      return "Según el Manual Técnico (Fuente 1), la lama D-5 (Aluminio) de 50x10 mm tiene una longitud máxima aconsejada de 950 mm entre puntos de fijación.";
    }
    if (q.includes("z")) {
      return "Para la lama Z de 37x100 mm: \n- Aluminio: Distancia máx entre soportes 2.000 mm. Vuelo máx 300 mm.\n- PVC: Distancia máx entre soportes 1.000 mm. Vuelo máx 150 mm.";
    }
    if (q.includes("o-120")) {
      return "La lama O-120 (ovalada 120x19.80 mm) permite una distancia máxima entre pinzas de 1.260 mm.";
    }
    if (q.includes("o-210")) {
      return "La lama O-210 (210x30 mm) permite una distancia máxima entre pinzas de 3.000 mm.";
    }
  }

  if (q.includes("material") || q.includes("aluminio") || q.includes("pvc")) {
    return "El dossier técnico incluye especificaciones para lamas de Aluminio (Aleaciones 6060/6063 T5) con acabados Qualicoat/Qualimarine, y lamas de PVC de alta resistencia.";
  }

  if (q.includes("norma") || q.includes("une")) {
    return "Todas nuestras celosías cumplen con la normativa UNE-EN 13659:2016 sobre persianas y contraventanas (Requisitos de prestaciones incluida la seguridad).";
  }

  return "Actualmente estoy operando en modo técnico local. He revisado el dossier, pero para una respuesta más precisa sobre '" + query + "', te recomiendo verificar el Manual Técnico de Medidas y Montaje incluido en la aplicación o contactar con el soporte de Saxun.";
}
