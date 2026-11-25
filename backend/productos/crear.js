// Función Lambda: registra un nuevo producto
exports.handler = async (event) => {
  const { nombre, precio, unidad } = JSON.parse(event.body || "{}");

  if (!nombre || !precio) {
    return {
      statusCode: 400,
      body: JSON.stringify({ mensaje: "Nombre y precio son obligatorios" }),
    };
  }

  const producto = { id: Date.now(), nombre, precio, unidad: unidad || "kg" };

  return {
    statusCode: 201,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  };
};
