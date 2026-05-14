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

/**
 * Obtiene los datos de los PDFs de forma segura, verificando que los scripts
 * de datos se hayan cargado correctamente.
 */
function getPDFData() {
  const data = [];
  
  // Verificamos cada variable global antes de usarla
  if (typeof PDF_CATALOGO_2026 !== 'undefined') {
    data.push(PDF_CATALOGO_2026);
  } else {
    console.warn("⚠️ PDF_CATALOGO_2026 no encontrado en la carga inicial.");
  }

  if (typeof PDF_DOSSIER_TECNICO !== 'undefined') {
    data.push(PDF_DOSSIER_TECNICO);
  } else {
    console.warn("⚠️ PDF_DOSSIER_TECNICO no encontrado en la carga inicial.");
  }

  return data;
}

// Función para convertir base64 a Blob binario con manejo de errores
function base64ToBlob(base64, mimeType) {
  try {
    const raw = atob(base64);
    const arr = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; i++) arr[i] = raw.charCodeAt(i);
    return new Blob([arr], { type: mimeType });
  } catch (e) {
    console.error("Error al decodificar base64:", e);
    throw new Error("El archivo técnico parece estar corrupto o incompleto.");
  }
}

// Subir UN PDF a través del proxy de Netlify (Seguridad: la API Key se queda en el servidor)
async function subirPDF(pdf) {
  const blob = base64ToBlob(pdf.base64, pdf.mimeType);
  const response = await fetch(
    `/.netlify/functions/upload-proxy`,
    {
      method: 'POST',
      headers: {
        'Content-Type': pdf.mimeType,
        'X-Goog-Upload-Protocol': 'raw',
        'X-Goog-Upload-Header-Content-Length': blob.size.toString(),
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
async function inicializarPDFs(onProgress) {
  const CACHE_KEY = 'saxun_gemini_uris';
  const CACHE_EXPIRY = 47 * 60 * 60 * 1000; // 47 horas en ms
  
  const PDF_DATA = getPDFData();
  if (PDF_DATA.length === 0) {
    throw new Error("No se han podido cargar los datos de los catálogos técnicos.");
  }

  // Comprobar caché
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY));
    if (cached && (Date.now() - cached.timestamp) < CACHE_EXPIRY) {
      console.log('✅ PDFs cargados desde caché');
      return cached.uris;
    }
  } catch (e) { }

  // Subir PDFs a Gemini
  const uris = [];
  for (let i = 0; i < PDF_DATA.length; i++) {
    const pdf = PDF_DATA[i];
    if (onProgress) onProgress(i + 1, PDF_DATA.length, pdf.nombre);
    const uri = await subirPDF(pdf);
    uris.push({ nombre: pdf.nombre, uri, archivo: pdf.archivo });
  }

  // Guardar en caché
  localStorage.setItem(CACHE_KEY, JSON.stringify({
    timestamp: Date.now(),
    uris
  }));

  return uris;
}

/**
 * OPTIMIZACIÓN DE TOKENS: Selecciona solo los PDFs relevantes basados en la consulta.
 * Esto evita el error de "Token Limit" al no enviar 40MB de PDFs si no es necesario.
 */
function seleccionarPDFsRelevantes(query, uris) {
  const queryLower = query.toLowerCase();
  
  // Si la consulta es corta o genérica, o si hay pocos PDFs, los enviamos todos
  if (query.length < 10 || uris.length <= 1) return uris;

  const relevantes = [];
  
  // Lógica de filtrado inteligente
  const tecnicosKeywords = ['medida', 'plano', 'perfil', 'instalacion', 'montaje', 'tecnico', 'dossier', 'especificacion', 'mk1014'];
  const novedadesKeywords = ['2026', 'novedad', 'nuevo', 'mk1140', 'catalogo'];

  const pideTecnico = tecnicosKeywords.some(k => queryLower.includes(k));
  const pideNovedades = novedadesKeywords.some(k => queryLower.includes(k));

  uris.forEach(u => {
    const nombre = (u.nombre || '').toLowerCase();
    const archivo = (u.archivo || '').toLowerCase();
    
    // Si detectamos keywords específicas, filtramos. Si no, incluimos por defecto para seguridad.
    if (pideTecnico && (nombre.includes('tecnico') || archivo.includes('mk1014'))) {
      relevantes.push(u);
    } else if (pideNovedades && (nombre.includes('2026') || archivo.includes('mk1140'))) {
      relevantes.push(u);
    }
  });

  // Si no hemos encontrado nada específico, devolvemos todo para no perder contexto
  return relevantes.length > 0 ? relevantes : uris;
}

// Construir partes de PDFs para la consulta a Gemini (con filtro de relevancia)
function buildPDFParts(uris, query = "") {
  const filtrados = seleccionarPDFsRelevantes(query, uris);
  console.log(`📎 Adjuntando ${filtrados.length} de ${uris.length} documentos relevantes.`);
  
  return filtrados.map(u => ({
    fileData: { mimeType: 'application/pdf', fileUri: u.uri }
  }));
}

// System prompt para Gemini
var SYSTEM_PROMPT = `Eres un asistente técnico experto en todos los sistemas de celosías Saxun by Giménez Ganga.
Tienes acceso completo a los catálogos técnicos y comerciales de la marca.

NORMAS:
- Responde siempre en español
- Si la pregunta es sobre un modelo concreto, da TODOS sus detalles: dimensiones exactas (en mm), materiales, sistemas de anclaje disponibles, accionamientos, colores y acabados
- Si hay tablas de especificaciones en los documentos, inclúyelas completas
- Puedes comparar modelos entre sí cuando sea útil
- Si la información está en varios documentos, consolídala en una respuesta completa
- Indica siempre de qué catálogo/documento proviene la información`;
