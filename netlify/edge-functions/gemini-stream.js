export default async (request, context) => {
  // CORS preflight
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      }
    });
  }

  // Solo permitir POST
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const API_KEY = Netlify.env.get("GEMINI_API_KEY");
    if (!API_KEY) {
      return new Response(JSON.stringify({ error: "API Key no configurada en Netlify" }), { status: 500 });
    }

    const body = await request.json();
    
    // Usamos el endpoint de streaming de Gemini
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:streamGenerateContent?alt=sse&key=${API_KEY}`;
    
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    // Reenviamos el stream directamente al cliente
    return new Response(response.body, {
      status: response.status,
      headers: {
        "Content-Type": response.ok ? "text/event-stream" : "application/json",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "X-Accel-Buffering": "no", // Importante para evitar buffering en proxies
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
