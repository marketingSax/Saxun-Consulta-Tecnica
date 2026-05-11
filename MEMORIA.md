# 🧠 Memoria de Proyecto: Saxun Consulta Técnica Celosías

## 📌 Estado Actual
Aplicación web (PWA) de consulta técnica avanzada para sistemas de celosías Saxun, integrada con la API de Google Gemini para análisis de catálogos técnicos en PDF.

## 🛠️ Stack Tecnológico
- **Frontend:** Vanilla HTML5, CSS3 (Custom Variables), JavaScript (ES6+).
- **IA:** Google Gemini API (Modelo: `gemini-flash-latest`).
- **Despliegue:** GitHub + Netlify (CI/CD).
- **Seguridad:** Netlify Functions como Proxy y Sistema de Recuperación de Llaves (Key Retrieval).

## 🎨 Identidad Visual (Branding)
- **Tipografía:** Helvetica Neue (Bold/SemiBold).
- **Color Primario:** `#E30613` (Rojo Corporativo Saxun).
- **Color de Fondo:** `#F2F2F0` (Gris cálido con textura radial).
- **UI/UX:** Sidebar de 380px para legibilidad, Logo de 80px, diseño limpio y profesional.

## 🔐 Arquitectura de Seguridad (Implementada)
1. **Protección de API KEY:** La clave de Google Gemini no existe en el código fuente. Se gestiona mediante variables de entorno en Netlify (`GEMINI_API_KEY`).
2. **Proxy de Chat:** Las consultas de chat se envían a `/.netlify/functions/gemini-proxy` para que la clave nunca viaje al cliente.
3. **Key Retrieval:** Debido al límite de 6MB de Netlify Functions, se implementó `/.netlify/functions/get-key`. La App obtiene la clave temporalmente para subir los PDFs pesados (>50MB) directamente a Google y luego la descarta.

## 📁 Estructura de Archivos Críticos
- `index.html`: UI principal y lógica de interacción.
- `data_index.js`: Lógica de gestión de PDFs, caché local (47h) y System Prompt de la IA.
- `data_pdf[1-3].js`: Base de datos de catálogos técnicos en Base64.
- `netlify/functions/`: Funciones de servidor para seguridad.
- `netlify.toml`: Configuración de despliegue.

## 🚀 Próximos Pasos (Pendientes)
- [ ] **Optimización de PWA:** Implementar `manifest.json` y `service-worker.js` para instalación real y soporte offline.
- [ ] **Refactorización a Componentes:** Si la App crece, considerar migrar a Next.js para mayor modularidad.
- [ ] **Lazy Loading:** Optimizar la carga de los archivos `data_pdf*.js` para mejorar el tiempo de carga inicial.

---
*Ultima actualización: 11 de Mayo de 2026*
