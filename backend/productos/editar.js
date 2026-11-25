// Función Lambda: edita un producto existente
exports.handler = async (event) => {
  const id = event.pathParameters && event.pathParameters.id;
  const { nombre, precio, unidad } = JSON.parse(event.body || "{}");

  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ mensaje: "El id del producto es obligatorio" }),
    };
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, nombre, precio, unidad }),
  };
};
