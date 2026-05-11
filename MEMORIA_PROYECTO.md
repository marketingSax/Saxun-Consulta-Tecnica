# Memoria del Proyecto: Dossier Celosías Saxun

## 1. Información General
- **Nombre:** Dossier Celosías Saxun (marketingSax/Dossier_celosias).
- **Tipo:** Web App SaaS / PWA de consulta técnica.
- **Objetivo:** Consultor técnico avanzado para arquitectos y profesionales sobre el catálogo de celosías Saxun.

## 2. Stack Tecnológico
- **Framework:** Next.js 16 (App Router) con TypeScript.
- **Estilado:** Tailwind CSS v4 (Mobile-first, optimizado para PC).
- **IA:** Google Gemini 2.5 Flash (SDK `@google/genai`).
- **Animaciones:** Framer Motion.
- **Iconografía:** Lucide-React.
- **Markdown:** `react-markdown` + `@tailwindcss/typography`.

## 3. Arquitectura de IA (Metodología de Contexto)
Se ha implementado una estrategia de **"Full Context Injection"**. 
- Se extrajeron 7 fuentes del cuaderno de NotebookLM (`5235afa9-7336-4f36-a72b-95cd648ea0d7`).
- Los datos en bruto (PDFs de montaje, catálogos, tablas) se consolidaron en `src/data/dossier-context-full.ts`.
- La ruta de la API (`/api/assistant/route.ts`) inyecta este conocimiento íntegro en cada consulta para garantizar máxima precisión técnica.

## 4. Estructura de la Interfaz
- **Header:** Navegación limpia con anclajes a `#assistant`, `#models`, `#systems` y `#other`.
- **Principal:** Asistente inteligente con tipografía grande (base/lg) y en negrita para máxima legibilidad en PC. Ancho de contenedor maximizado (`max-w-7xl`).
- **Secciones Técnicas:**
    - **Modelos:** Clasificación por movilidad (Fijas, Fija-Móvil, Móviles).
    - **Sistemas:** Detalles de anclaje y tipos de accionamiento.
    - **Otros Datos:** Materiales (Aluminio 6060/6063 T5, PVC), Acabados (Qualicoat/Qualimarine), Normativa (UNE-EN 13659:2016).

## 5. Configuración de Entorno y Git
- **API Key Gemini:** `AIzaSyBgjj_jEr5RKplCKgI_oDZVvnXQkggxAyQ` (Inyectada directamente en `route.ts` para este desarrollo).
- **Git Repo:** `https://github.com/marketingSax/Dossier_celosias.git` (Rama `main`).
- **Build:** Forzado a usar Webpack mediante `--webpack` en `package.json` para compatibilidad con `next-pwa`.
