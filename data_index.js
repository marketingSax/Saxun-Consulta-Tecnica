// ============================================================
// SAXUN CELOSÍAS - BASE DE DATOS DE PDFs
// Incluye todos los documentos técnicos y catálogos
// ============================================================
// INSTRUCCIONES DE USO EN LA APP:
// 1. Incluir en el HTML (en orden):
//    <script src="data_pdf2.js"></script>
//    <script src="data_pdf3.js"></script>
//    <script src="data_index.js"></script>
//
// 2. Los PDFs se suben automáticamente a Gemini File API
//    al iniciar la app (se cachean en localStorage 47h)
// ============================================================

const PDF_DATA = [
  PDF_CATALOGO_2026,   // Catálogo 2026 - novedades, nuevos modelos
  PDF_DOSSIER_TECNICO  // Dossier técnico - especificaciones detalladas
];

// Función para convertir base64 a Blob binario
function base64ToBlob(base64, mimeType) {
  const raw = atob(base64);
  const arr = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) arr[i] = raw.charCodeAt(i);
  return new Blob([arr], { type: mimeType });
}

// Subir UN PDF a Gemini File API (Directo por tamaño > 6MB)
async function subirPDF(pdf, apiKey) {
  const blob = base64ToBlob(pdf.base64, pdf.mimeType);
  const response = await fetch(
    `https://generativelanguage.googleapis.com/upload/v1beta/files?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': pdf.mimeType,
        'X-Goog-Upload-Protocol': 'raw',
        'X-Goog-Upload-Header-Content-Length': blob.size,
        'X-Goog-Upload-Header-Content-Type': pdf.mimeType,
      },
      body: blob
    }
  );
  if (!response.ok) throw new Error(`Error subiendo ${pdf.nombre}: ${response.statusText}`);
  const data = await response.json();
  return data.file.uri;
}

// Inicializar PDFs (subir si no están cacheados)
async function inicializarPDFs(apiKey, onProgress) {
  const CACHE_KEY = 'saxun_gemini_uris';
  const CACHE_EXPIRY = 47 * 60 * 60 * 1000; // 47 horas en ms

  // Comprobar caché
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY));
    if (cached && (Date.now() - cached.timestamp) < CACHE_EXPIRY) {
      console.log('✅ PDFs cargados desde caché');
      return cached.uris;
    }
  } catch(e) {}

  // Subir PDFs a Gemini
  const uris = [];
  for (let i = 0; i < PDF_DATA.length; i++) {
    const pdf = PDF_DATA[i];
    if (onProgress) onProgress(i + 1, PDF_DATA.length, pdf.nombre);
    const uri = await subirPDF(pdf, apiKey);
    uris.push({ nombre: pdf.nombre, uri });
  }

  // Guardar en caché
  localStorage.setItem(CACHE_KEY, JSON.stringify({
    timestamp: Date.now(),
    uris
  }));

  return uris;
}

// Construir partes de PDFs para la consulta a Gemini
function buildPDFParts(uris) {
  return uris.map(u => ({
    fileData: { mimeType: 'application/pdf', fileUri: u.uri }
  }));
}

// System prompt para Gemini
const SYSTEM_PROMPT = `Eres un asistente técnico experto en todos los sistemas de celosías Saxun by Giménez Ganga.
Tienes acceso completo a los catálogos técnicos y comerciales de la marca.

NORMAS:
- Responde siempre en español
- Si la pregunta es sobre un modelo concreto, da TODOS sus detalles: dimensiones exactas (en mm), materiales, sistemas de anclaje disponibles, accionamientos, colores y acabados
- Si hay tablas de especificaciones en los documentos, inclúyelas completas
- Puedes comparar modelos entre sí cuando sea útil
- Si la información está en varios documentos, consolídala en una respuesta completa
- Indica siempre de qué catálogo/documento proviene la información`;
