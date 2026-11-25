// Función Lambda: elimina un producto
exports.handler = async (event) => {
  const id = event.pathParameters && event.pathParameters.id;

  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ mensaje: "El id del producto es obligatorio" }),
    };
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mensaje: "Producto eliminado", id }),
  };
};
