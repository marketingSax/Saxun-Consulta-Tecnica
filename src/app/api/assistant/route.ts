import { GoogleGenerativeAI } from "@google/generative-ai";
import { fullDossierContext } from "@/data/dossier-context-full";

// API key gestionada mediante variables de entorno
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    if (!query) {
      return new Response(JSON.stringify({ error: "Query is required" }), { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
Eres el asistente técnico oficial de Saxun, experto en celosías y protección solar.
Utiliza ÚNICAMENTE la información proporcionada en el CONTEXTO DEL DOSSIER para responder.
Si la respuesta no está en el contexto, indica amablemente que no dispones de esa información.
Sé profesional, preciso y utiliza formato Markdown (tablas, negritas, listas) para mejorar la legibilidad técnica.

CONTEXTO DEL DOSSIER:
${fullDossierContext}

PREGUNTA DEL USUARIO:
${query}
`;

    const result = await model.generateContentStream(prompt);

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
        } catch (err) {
          console.error("Error en el stream:", err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("Error en streaming de Gemini:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}


