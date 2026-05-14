exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: 'GEMINI_API_KEY no configurada en el servidor' }) };
  }

  // URL para iniciar subida reanudable (handshake)
  const url = `https://generativelanguage.googleapis.com/upload/v1beta/files?key=${API_KEY}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'X-Goog-Upload-Protocol': 'resumable',
        'X-Goog-Upload-Command': 'start',
        'X-Goog-Upload-Header-Content-Length': event.headers['x-goog-upload-header-content-length'],
        'X-Goog-Upload-Header-Content-Type': event.headers['x-goog-upload-header-content-type'],
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        file: { 
          display_name: event.headers['x-filename'] || 'archivo_tecnico' 
        } 
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Google API Handshake Error: ${response.status} - ${errorText}`);
    }

    // La URL de sesión viene en la cabecera 'x-goog-upload-url'
    const uploadUrl = response.headers.get('x-goog-upload-url');

    if (!uploadUrl) {
      throw new Error("No se pudo obtener la URL de sesión (x-goog-upload-url) de Google");
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ uploadUrl }),
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' // Asegurar CORS si fuera necesario
      }
    };
  } catch (error) {
    console.error('Error en upload-proxy:', error);
    return { 
      statusCode: 500, 
      body: JSON.stringify({ error: error.message }) 
    };
  }
};
