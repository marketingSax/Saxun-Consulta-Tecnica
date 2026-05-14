// ============================================================
// upload-proxy.js
// Solo hace el handshake con Google para obtener la uploadUrl.
// El PDF se sube directamente desde el frontend a esa URL.
// Así evitamos el límite de 6MB de Netlify Functions.
// ============================================================

exports.handler = async (event, context) => {
  // Solo POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // Verificar API Key
  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'GEMINI_API_KEY no configurada en las variables de entorno de Netlify' })
    };
  }

  try {
    // Leer metadatos del body (no el PDF, solo nombre y tipo)
    const { nombre, mimeType, size } = JSON.parse(event.body);

    if (!mimeType || !size) {
      throw new Error('Faltan parámetros: mimeType y size son obligatorios');
    }

    // Llamar a Google para iniciar sesión de subida reanudable
    const googleResponse = await fetch(
      `https://generativelanguage.googleapis.com/upload/v1beta/files?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'X-Goog-Upload-Protocol': 'resumable',
          'X-Goog-Upload-Command': 'start',
          'X-Goog-Upload-Header-Content-Length': size.toString(),
          'X-Goog-Upload-Header-Content-Type': mimeType,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          file: { display_name: nombre || 'documento_tecnico' }
        })
      }
    );

    if (!googleResponse.ok) {
      const errorText = await googleResponse.text();
      throw new Error(`Google API error ${googleResponse.status}: ${errorText}`);
    }

    // Google devuelve la URL de sesión en esta cabecera
    const uploadUrl = googleResponse.headers.get('x-goog-upload-url');

    if (!uploadUrl) {
      throw new Error('Google no devolvió x-goog-upload-url. Verifica que la API Key tenga permisos.');
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ uploadUrl })
    };

  } catch (error) {
    console.error('[upload-proxy] Error:', error.message);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: error.message })
    };
  }
};
