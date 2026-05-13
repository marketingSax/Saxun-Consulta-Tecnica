import { GoogleGenerativeAI } from "@google/generative-ai";
import { fullDossierContext } from "@/data/dossier-context-full";
import { getLocalTechnicalResponse } from "@/lib/localSearch";

// API key gestionada mediante variables de entorno
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    if (!query) {
      return new Response(JSON.stringify({ error: "Query is required" }), { status: 400 });
    }

    // Intentamos usar la IA de Gemini
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
      const prompt = `
Eres el asistente técnico oficial de Saxun.
CONTEXTO: ${fullDossierContext}
PREGUNTA: ${query}
`;
      const result = await model.generateContentStream(prompt);
      
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of result.stream) {
              const text = chunk.text();
              if (text) controller.enqueue(encoder.encode(text));
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
          "X-Assistant-Mode": "ai"
        },
      });
    } catch (aiError) {
      console.warn("⚠️ IA no disponible, activando motor técnico local:", aiError);
      
      // FALLBACK: Motor técnico local
      const localResponse = getLocalTechnicalResponse(query);
      return new Response(localResponse, {
        headers: { 
          "Content-Type": "text/plain; charset=utf-8",
          "X-Assistant-Mode": "local"
        },
      });
    }
  } catch (error: any) {
    console.error("❌ ERROR CRÍTICO EN API ASSISTANT:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}


