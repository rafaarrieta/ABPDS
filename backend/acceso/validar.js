// Función Lambda: valida el código de acceso a la plataforma
exports.handler = async (event) => {
  const { codigo } = JSON.parse(event.body || "{}");
  const codigoValido = process.env.CODIGO_ACCESO;

  if (!codigo || codigo !== codigoValido) {
    return {
      statusCode: 401,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ acceso: false, mensaje: "Código incorrecto" }),
    };
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ acceso: true }),
  };
};
