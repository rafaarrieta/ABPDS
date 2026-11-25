// Función Lambda: lista los productos registrados por los agricultores
exports.handler = async () => {
  const productos = [
    { id: 1, nombre: "Yuca", precio: 2500, unidad: "kg" },
    { id: 2, nombre: "Plátano", precio: 1800, unidad: "kg" },
  ];

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productos),
  };
};
