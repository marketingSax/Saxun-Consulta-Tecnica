exports.handler = async (event, context) => {
  // Solo devolvemos la llave si la petición es legítima (puedes añadir más validaciones aquí)
  return {
    statusCode: 200,
    body: JSON.stringify({ key: process.env.GEMINI_API_KEY }),
    headers: { 'Content-Type': 'application/json' }
  };
};
