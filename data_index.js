// ============================================================
// SAXUN CELOSÍAS - BASE DE DATOS DE PDFs
// ============================================================

var PDF_DATA = [
  PDF_CATALOGO_2026,    // Catálogo 2026 - novedades, nuevos modelos
  PDF_DOSSIER_TECNICO   // Dossier técnico - especificaciones detalladas
];

// Convierte base64 a Blob binario
function base64ToBlob(base64, mimeType) {
  const raw = atob(base64);
  const arr = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) arr[i] = raw.charCodeAt(i);
  return new Blob([arr], { type: mimeType });
}

// ─── Subida en 2 pasos ────────────────────────────────────────────────────────
// PASO 1: El proxy hace el handshake con Google y nos devuelve una uploadUrl.
//         El PDF nunca pasa por Netlify → evitamos el límite de 6 MB.
// PASO 2: Subimos el PDF directamente a Google usando esa uploadUrl.
//         La uploadUrl tiene su propio token de sesión, sin exponer la API Key.
// ─────────────────────────────────────────────────────────────────────────────

async function subirPDF(pdf) {
  const blob = base64ToBlob(pdf.base64, pdf.mimeType);

  // ── PASO 1: Obtener URL de sesión ──────────────────────────────────────────
  const handshakeRes = await fetch('/.netlify/functions/upload-proxy', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nombre: pdf.nombre,
      mimeType: pdf.mimeType,
      size: blob.size
    })
  });

  if (!handshakeRes.ok) {
    const err = await handshakeRes.json().catch(() => ({ error: handshakeRes.statusText }));
    throw new Error(`Handshake fallido para "${pdf.nombre}": ${err.error || handshakeRes.statusText}`);
  }

  const { uploadUrl } = await handshakeRes.json();

  if (!uploadUrl) {
    throw new Error(`No se recibió uploadUrl para "${pdf.nombre}"`);
  }

  // ── PASO 2: Subir el PDF directamente a Google ─────────────────────────────
  const uploadRes = await fetch(uploadUrl, {
    method: 'POST',
    headers: {
      'Content-Length': blob.size.toString(),
      'X-Goog-Upload-Offset': '0',
      'X-Goog-Upload-Command': 'upload, finalize',
    },
    body: blob
  });

  if (!uploadRes.ok) {
    const errText = await uploadRes.text();
    throw new Error(`Error subiendo "${pdf.nombre}" a Google: ${uploadRes.status} - ${errText}`);
  }

  const data = await uploadRes.json();

  if (!data?.file?.uri) {
    throw new Error(`Google no devolvió URI para "${pdf.nombre}". Respuesta: ${JSON.stringify(data)}`);
  }

  console.log('✅ "' + pdf.nombre + '" subido → ' + data.file.uri);
  return data.file.uri;
}

// ─── Inicializar PDFs (con caché de 47h en localStorage) ─────────────────────
async function inicializarPDFs(onProgress) {
  const CACHE_KEY = 'saxun_gemini_uris';
  const CACHE_EXPIRY = 47 * 60 * 60 * 1000;

  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY));
    if (cached && (Date.now() - cached.timestamp) < CACHE_EXPIRY) {
      console.log('✅ PDFs cargados desde caché');
      return cached.uris;
    }
  } catch (e) { }

  const uris = [];
  for (let i = 0; i < PDF_DATA.length; i++) {
    const pdf = PDF_DATA[i];
    if (onProgress) onProgress(i + 1, PDF_DATA.length, pdf.nombre);
    const uri = await subirPDF(pdf);
    uris.push({ nombre: pdf.nombre, uri });
  }

  localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), uris }));
  return uris;
}

// ─── Construir partes PDF para Gemini ────────────────────────────────────────
function buildPDFParts(uris) {
  return uris.map(u => ({
    fileData: { mimeType: 'application/pdf', fileUri: u.uri }
  }));
}

// ─── System Prompt ────────────────────────────────────────────────────────────
var SYSTEM_PROMPT = `Eres un asistente técnico experto en todos los sistemas de celosías Saxun by Giménez Ganga.
Tienes acceso completo a los catálogos técnicos y comerciales de la marca.

NORMAS:
- Responde siempre en español
- Si la pregunta es sobre un modelo concreto, da TODOS sus detalles: dimensiones exactas (en mm), materiales, sistemas de anclaje disponibles, accionamientos, colores y acabados
- Si hay tablas de especificaciones en los documentos, inclúyelas completas
- Puedes comparar modelos entre sí cuando sea útil
- Si la información está en varios documentos, consolídala en una respuesta completa
- Indica siempre de qué catálogo/documento proviene la información`;
