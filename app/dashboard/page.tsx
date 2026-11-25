'use client';

import { useEffect, useState } from 'react';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  unidad: string;
  stock: number;
}

export default function Dashboard() {
  const [autorizado, setAutorizado] = useState(false);
  const [productos, setProductos] = useState<Producto[]>([
    { id: 1, nombre: 'Yuca', precio: 2500, unidad: 'kg', stock: 120 },
    { id: 2, nombre: 'Plátano', precio: 1800, unidad: 'kg', stock: 80 },
  ]);

  useEffect(() => {
    if (sessionStorage.getItem('acceso') !== 'true') {
      window.location.href = '/login/';
    } else {
      setAutorizado(true);
    }
  }, []);

  const eliminar = (id: number) => {
    setProductos(productos.filter((p) => p.id !== id));
  };

  if (!autorizado) return null;

  const totalStock = productos.reduce((suma, p) => suma + p.stock, 0);

  return (
    <main className="min-h-screen bg-green-50 p-8">
      <h1 className="text-3xl font-bold text-green-800">Panel del agricultor</h1>

      <div className="mt-6 grid grid-cols-2 gap-4 max-w-md">
        <div className="rounded-lg bg-white p-4 shadow">
          <p className="text-sm text-gray-500">Productos registrados</p>
          <p className="text-2xl font-bold">{productos.length}</p>
        </div>
        <div className="rounded-lg bg-white p-4 shadow">
          <p className="text-sm text-gray-500">Stock total (kg)</p>
          <p className="text-2xl font-bold">{totalStock}</p>
        </div>
      </div>

      <table className="mt-8 w-full max-w-2xl bg-white shadow rounded-lg">
        <thead>
          <tr className="text-left border-b">
            <th className="p-3">Producto</th>
            <th className="p-3">Precio</th>
            <th className="p-3">Stock</th>
            <th className="p-3"></th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id} className="border-b">
              <td className="p-3">{p.nombre}</td>
              <td className="p-3">${p.precio} / {p.unidad}</td>
              <td className="p-3">{p.stock}</td>
              <td className="p-3">
                <button
                  onClick={() => eliminar(p.id)}
                  className="text-red-600 hover:underline"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
