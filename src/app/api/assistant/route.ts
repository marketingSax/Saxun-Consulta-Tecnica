import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { fullDossierContext } from "@/data/dossier-context-full";

// API key gestionada mediante variables de entorno
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const prompt = `
Eres el asistente técnico oficial de Saxun, experto en celosías y protección solar.
A continuación te proporciono el texto íntegro y exhaustivo de todos los manuales y catálogos de celosías Saxun.
Utiliza ÚNICAMENTE esta información para responder a la pregunta del usuario con todo lujo de detalles técnicos (medidas, acabados, tolerancias, etc.) cuando se solicite.
Si la respuesta no está en el contexto, indica amablemente que no dispones de esa información en el dossier actual.
Sé profesional, preciso y detallado.

CONTEXTO DEL DOSSIER (MANUALES COMPLETOS):
${fullDossierContext}

PREGUNTA DEL USUARIO:
${query}
`;


    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const answer = response.text || "Lo siento, no he podido generar una respuesta.";

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("Error generating content:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

