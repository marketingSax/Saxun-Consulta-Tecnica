// ============================================================
// SAXUN CELOSÍAS - BASE DE DATOS DE PDFs
// ============================================================

var PDF_DATA = [
  PDF_CATALOGO_2026,
  PDF_DOSSIER_TECNICO
];

function base64ToBlob(base64, mimeType) {
  const raw = atob(base64);
  const arr = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) arr[i] = raw.charCodeAt(i);
  return new Blob([arr], { type: mimeType });
}

async function subirPDF(pdf) {
  const blob = base64ToBlob(pdf.base64, pdf.mimeType);

  // PASO 1: Proxy hace handshake con Google → devuelve uploadUrl
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
    throw new Error(`Handshake fallido para "${pdf.nombre}": ${err.error}`);
  }

  const { uploadUrl } = await handshakeRes.json();
  if (!uploadUrl) throw new Error(`No se recibió uploadUrl para "${pdf.nombre}"`);

  // PASO 2: Frontend sube el PDF directamente a Google
  // IMPORTANTE: NO incluir Content-Length — los navegadores lo bloquean (forbidden header)
  const uploadRes = await fetch(uploadUrl, {
    method: 'POST',
    headers: {
      'X-Goog-Upload-Offset': '0',
      'X-Goog-Upload-Command': 'upload, finalize',
    },
    body: blob
  });

  if (!uploadRes.ok) {
    const errText = await uploadRes.text();
    throw new Error(`Error subiendo "${pdf.nombre}": ${uploadRes.status} - ${errText}`);
  }

  const data = await uploadRes.json();
  if (!data?.file?.uri) throw new Error(`Google no devolvió URI para "${pdf.nombre}"`);

  console.log('✅ ' + pdf.nombre + ' → ' + data.file.uri);
  return data.file.uri;
}

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

function buildPDFParts(uris) {
  return uris.map(u => ({
    fileData: { mimeType: 'application/pdf', fileUri: u.uri }
  }));
}

var SYSTEM_PROMPT = `Eres un asistente técnico experto en todos los sistemas de celosías Saxun by Giménez Ganga.
Tienes acceso completo a los catálogos técnicos y comerciales de la marca.

NORMAS:
- Responde siempre en español
- Si la pregunta es sobre un modelo concreto, da TODOS sus detalles: dimensiones exactas (en mm), materiales, sistemas de anclaje disponibles, accionamientos, colores y acabados
- Si hay tablas de especificaciones en los documentos, inclúyelas completas
- Puedes comparar modelos entre sí cuando sea útil
- Si la información está en varios documentos, consolídala en una respuesta completa
- Indica siempre de qué catálogo/documento proviene la información`;
