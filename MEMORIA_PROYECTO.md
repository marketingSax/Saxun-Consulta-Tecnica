# Memoria del Proyecto: Dossier Celosías Saxun (Actualizada)

## 1. Información General
- **Nombre:** Dossier Celosías Saxun (marketingSax/Dossier_celosias).
- **Tipo:** Web App SaaS / PWA de consulta técnica.
- **Objetivo:** Consultor técnico avanzado para arquitectos y profesionales sobre el catálogo de celosías Saxun.

## 2. Stack Tecnológico (Vibrante / Premium)
- **Framework:** Next.js 16 (App Router) con TypeScript.
- **Estilado:** Tailwind CSS v4 (Preset: Dynamic Monochrome Agency).
- **Diseño:** Estética de alto contraste (Negros profundos #0A0A0A, Blancos puros #FAFAFA y acento Saxun Orange #F97316).
- **IA:** Google Gemini 1.5 Flash (`gemini-flash-latest`).
- **Animaciones:** Framer Motion (Interacciones fluidas).
- **Iconografía:** Lucide-React.
- **Markdown:** `react-markdown` + `@tailwindcss/typography` (prose-invert).

## 3. Arquitectura de IA & Seguridad
- **Full Context Injection:** Inyección de 7 fuentes técnicas completas (montaje, catálogos, tablas) en el prompt de sistema.
- **Seguridad:** Gestión de credenciales mediante `.env.local` (Git Ignored).
    - `GEMINI_API_KEY`: Clave de acceso a la API.
    - `NOTEBOOK_ID`: Referencia al cuaderno de NotebookLM.
- **Modelo:** Configurado exactamente como `gemini-flash-latest` para máxima velocidad.

## 4. Interfaz & UX (Optimización PC)
- **Layout:** Contenedores expandidos a `w-[95%] max-w-[1600px]` para aprovechar pantallas de escritorio.
- **Logo:** Isotipo minimalista y arquitectónico generado por IA (Isotipo Saxun modernizado).
- **Asistente:** 
    - Caja de chat maximizada (`xl:h-[800px]`).
    - Tipografía en negrita (`font-bold`) y tamaño `text-lg` para facilitar la lectura de especificaciones técnicas.
    - Renderizado de Markdown con soporte para tablas y listas técnicas.

## 5. Datos Técnicos Incluidos
- **Modelos:** Clasificación por movilidad (Fijas, Fija-Móvil, Móviles).
- **Sistemas:** Detalles de anclaje (testeros, pinzas) y accionamientos (Motores 24V, Manual).
- **Otros Datos:** Aleaciones de aluminio (6060/6063 T5), acabados Qualicoat/Qualimarine y normativa UNE-EN 13659:2016.

## 7. Estado Actual & Bloqueos (12 Mayo 2026)
- **Servidor Local:** 🟢 Activo en `http://localhost:3000`.
- **API Gemini:** 🔴 Error de autenticación (`API_KEY_INVALID`). La clave en `.env.local` debe ser renovada.
- **Git:** Sincronización pendiente de resolución del error de API.

### 🚀 Próximos Pasos Inmediatos
1. Sustituir `GEMINI_API_KEY` por una válida.
2. Realizar `git push` al repositorio oficial.
3. Finalizar optimización de PWA para modo offline.
