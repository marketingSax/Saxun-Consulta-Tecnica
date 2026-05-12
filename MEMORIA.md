# 🧠 Memoria de Proyecto: Saxun Consulta Técnica Celosías

## 📌 Estado Actual
Aplicación web (PWA) de consulta técnica avanzada para sistemas de celosías Saxun, integrada con la API de Google Gemini para análisis de catálogos técnicos en PDF. La aplicación es ahora una PWA completa con capacidades de instalación y carga optimizada.

## 🛠️ Stack Tecnológico
- **Frontend:** Vanilla HTML5, CSS3 (Custom Variables), JavaScript (ES6+).
- **IA:** Google Gemini API (Modelo: `gemini-flash-latest`).
- **Despliegue:** GitHub + Netlify (CI/CD).
- **Seguridad:** Netlify Functions como Proxy y Sistema de Recuperación de Llaves (Key Retrieval).
- **PWA:** Service Workers para offline support y Manifest para instalabilidad.

## 🎨 Identidad Visual (Branding)
- **Tipografía:** Helvetica Neue (Bold/SemiBold).
- **Color Primario:** `#E30613` (Rojo Corporativo Saxun).
- **Color de Fondo:** `#F2F2F0` (Gris cálido con textura radial).
- **UI/UX:** Sidebar de 380px para legibilidad, Logo de 80px, diseño limpio y profesional.
- **Micro-interacciones:** Transiciones suaves en sidebar, efectos de glassmorphism en áreas de entrada.

## 🔐 Arquitectura de Seguridad
1. **Protección de API KEY:** Gestionada mediante variables de entorno en Netlify.
2. **Proxy de Chat:** Consultas vía Netlify Functions.
3. **Key Retrieval:** Sistema de llave temporal para subida directa de archivos pesados.

## 📁 Estructura de Archivos Críticos
- `index.html`: UI principal y lógica de interacción.
- `service-worker.js`: Gestión de caché y funcionamiento offline.
- `manifest.json`: Configuración de la App instalable.
- `data_index.js`: Lógica de gestión de PDFs, caché local (47h) y System Prompt.
- `data_pdf[1-3].js`: Base de datos de catálogos técnicos en Base64.

## ✅ Hitos Completados
- [x] **Optimización de PWA:** Implementado `manifest.json` y `service-worker.js`.
- [x] **Lazy Loading:** Los scripts de datos se cargan dinámicamente con barra de progreso informando al usuario (Ahorro de ~50MB en carga inicial bloqueante).
- [x] **Seguridad:** Proxy de API Gemini verificado y operativo.

## 🚀 Próximos Pasos (Pendientes)
- [ ] **Refactorización a Next.js:** Evaluación de migración para mayor escalabilidad.
- [ ] **Búsqueda Semántica Local:** Explorar indexación vectorial en cliente para búsquedas ultra-rápidas pre-IA.

---
*Ultima actualización: 12 de Mayo de 2026*
