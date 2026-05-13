const fs = require('fs');

const filePaths = [
  "C:/Users/abel.bustos/.gemini/antigravity/brain/33f4209b-9df7-466f-b92c-7cd4187fbc20/.system_generated/steps/258/output.txt",
  "C:/Users/abel.bustos/.gemini/antigravity/brain/33f4209b-9df7-466f-b92c-7cd4187fbc20/.system_generated/steps/260/output.txt",
  "C:/Users/abel.bustos/.gemini/antigravity/brain/33f4209b-9df7-466f-b92c-7cd4187fbc20/.system_generated/steps/261/output.txt",
  "C:/Users/abel.bustos/.gemini/antigravity/brain/33f4209b-9df7-466f-b92c-7cd4187fbc20/.system_generated/steps/262/output.txt",
  "C:/Users/abel.bustos/.gemini/antigravity/brain/33f4209b-9df7-466f-b92c-7cd4187fbc20/.system_generated/steps/263/output.txt"
];

let allContent = `
Arquitectura y Técnica de las Celosías Modernas
Las celosías son elementos arquitectónicos de protección solar fabricados principalmente en aluminio de extrusión o PVC. Físicamente, se caracterizan por presentar una gran variedad de formas y configuraciones para adaptarse al diseño de los edificios:
Forma de las lamas: Pueden ser de líneas rectas (lamas rectangulares), de líneas curvas (lamas ovaladas), o presentar perfiles especiales en forma de Z, S, C, o V.
... [Contenido parcial de fuentes 1 y 3 omitido aquí para simplificar la concatenación del JSON] ...
`;

try {
  let combinedContent = "";
  for (const p of filePaths) {
    if (fs.existsSync(p)) {
      const data = fs.readFileSync(p, 'utf8');
      try {
        const parsed = JSON.parse(data);
        if (parsed.content) {
          combinedContent += "\\n\\n--- FUENTE --- \\n\\n" + parsed.content;
        }
      } catch (e) {
        // If not JSON, just append raw
        combinedContent += "\\n\\n--- FUENTE --- \\n\\n" + data;
      }
    }
  }

  // Escape backticks and create a TypeScript file
  const tsContent = 'export const fullDossierContext = `' + combinedContent.replace(/\`/g, "'") + '`;';
  
  fs.writeFileSync('e:/Aplicaciones/Dossier_celos/src/data/dossier-context-full.ts', tsContent);
  console.log("Contexto consolidado creado exitosamente.");
} catch (error) {
  console.error("Error consolidando:", error);
}
