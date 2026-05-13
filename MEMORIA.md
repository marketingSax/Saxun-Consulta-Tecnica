# 🧠 Memoria de Proyecto: Saxun Consulta Técnica Celosías

## 📌 Estado Actual
Aplicación web (PWA) de consulta técnica avanzada para sistemas de celosías Saxun, integrada con la API de Google Gemini para análisis de catálogos técnicos en PDF. La aplicación es ahora una PWA completa con capacidades de instalación y carga optimizada.

## 🛠️ Stack Tecnológico
- **Frontend:** Vanilla HTML5, CSS3 (Custom Variables), JavaScript (ES6+).
- **IA:** Google Gemini API (Modelo: `gemini-flash-latest`).
- **Despliegue:** GitHub + Netlify (CI/CD).
- **Seguridad:** Netlify Edge Functions (streaming SSE) en path /api/ para evitar namespaces reservados.
- **PWA:** Service Workers (Network-First HTML, Cache-First assets), Manifest para instalabilidad.

## 🎨 Identidad Visual (Branding)
- **Tipografía:** Helvetica Neue (Bold/SemiBold).
- **Color Primario:** `#E30613` (Rojo Corporativo Saxun).
- **Color de Fondo:** `#F2F2F0` (Gris cálido con textura radial).
- **UI/UX:** Sidebar de 380px para legibilidad, Logo adaptable, diseño limpio y profesional.
- **Micro-interacciones:** Transiciones suaves en sidebar, efectos de glassmorphism en áreas de entrada.

## 🔐 Arquitectura de Seguridad
1. **Protección de API KEY:** Gestionada mediante variables de entorno en Netlify.
2. **Proxy de Chat:** Edge Function `gemini-stream.js` mapeada a `/api/gemini-stream`.
3. **Key Retrieval:** Sistema de llave temporal para subida directa de archivos pesados.

## 📁 Estructura de Archivos Críticos
- `index.html`: UI principal y lógica de interacción.
- `service-worker.js`: Gestión de caché y funcionamiento offline.
- `manifest.json`: Configuración de la App instalable.
- `data_index.js`: Lógica de gestión de PDFs, caché local (47h) y System Prompt.
- `data_pdf[1-3].js`: Base de datos de catálogos técnicos en Base64.
- `netlify/edge-functions/gemini-stream.js`: Proxy streaming SSE (Mapeado a /api/gemini-stream).
- `netlify/functions/get-key.js`: Devuelve API key temporal para subida de PDFs.
- `netlify.toml`: Configuración de rutas Edge Functions + Functions + redirects.

## ✅ Hitos Completados
- [x] **Optimización de PWA:** Implementado `manifest.json` y `service-worker.js`.
- [x] **Lazy Loading:** Los scripts de datos se cargan dinámicamente con barra de progreso informando al usuario (Ahorro de ~50MB en carga inicial bloqueante).
- [x] **Diseño Adaptativo Multiplataforma:** Implementación de media queries exhaustivas y uso de `dvh` (Dynamic Viewport Height) para corregir problemas de visualización en navegadores móviles (Safari/Chrome iOS/Android).
- [x] **Optimización de Layout:** Uso de `max-width` en el área de chat para asegurar legibilidad en pantallas grandes y centrado dinámico del área de input.
- [x] **Refinamiento Táctil Premium:** Ajuste de hitboxes, prevención de zoom automático en iOS (font-size 16px en inputs) y eliminación de resaltado táctil predeterminado.
- [x] **Visualización de Datos:** Soporte mejorado para tablas técnicas con scroll horizontal suave y scrollbars personalizados de estilo minimalista.
- [x] **Animación de Carga en Burbujas:** Implementada animación de "typing" dentro del bocadillo de la IA para una respuesta visual inmediata.
- [x] **Historial Multi-turno:** Conversación con memoria y gestión de contexto optimizada.
- [x] **Refinamiento UI Premium:** Cabecera fina, logo fluido y mensaje de bienvenida personalizado.
- [x] **SW v4:** `skipWaiting` + `clients.claim` + Network-First para HTML.
- [x] **Optimización de Streaming SSE:** Reubicación de la Edge Function a la carpeta correcta y adición de lógica de "pings" para evitar timeouts durante el procesamiento de PDFs pesados.
- [x] **Resiliencia de Proxy:** Implementado manejo de errores robusto tanto en el servidor (Edge Function) como en el cliente (Fetch SSE).
- [x] **Auditoría de Seguridad:** Eliminación de API Key expuesta en `.env`, corrección de codificación de `.gitignore` y eliminación del seguimiento de archivos sensibles en el repositorio.

## 🚀 Próximos Pasos (Pendientes)
- [ ] **Refactorización a Next.js:** Evaluación de migración para mayor escalabilidad.
- [ ] **Búsqueda Semántica Local:** Explorar indexación vectorial en cliente para búsquedas ultra-rápidas pre-IA.

---
*Ultima actualización: 13 de Mayo de 2026*
