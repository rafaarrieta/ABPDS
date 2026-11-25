'use client';

import { useEffect, useState } from 'react';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  unidad: string;
  stock: number;
}

const INICIALES: Producto[] = [
  { id: 1, nombre: 'Yuca', precio: 2500, unidad: 'kg', stock: 120 },
  { id: 2, nombre: 'Plátano', precio: 1800, unidad: 'kg', stock: 80 },
];

export default function Dashboard() {
  const [autorizado, setAutorizado] = useState(false);
  const [cargado, setCargado] = useState(false);
  const [productos, setProductos] = useState<Producto[]>(INICIALES);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [unidad, setUnidad] = useState('kg');
  const [stock, setStock] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (sessionStorage.getItem('acceso') !== 'true') {
      window.location.href = '/login/';
      return;
    }
    setAutorizado(true);
    try {
      const guardado = localStorage.getItem('productos');
      if (guardado) setProductos(JSON.parse(guardado));
    } catch {
      /* si falla la lectura se usan los productos iniciales */
    }
    setCargado(true);
  }, []);

  useEffect(() => {
    if (cargado) {
      localStorage.setItem('productos', JSON.stringify(productos));
    }
  }, [productos, cargado]);

  const agregar = () => {
    if (!nombre.trim() || Number(precio) <= 0 || Number(stock) < 0 || stock === '') {
      setError('Completa nombre, precio (mayor a 0) y cantidad.');
      return;
    }

    const nuevo: Producto = {
      id: Date.now(),
      nombre: nombre.trim(),
      precio: Number(precio),
      unidad,
      stock: Number(stock),
    };

    setProductos([...productos, nuevo]);
    setNombre('');
    setPrecio('');
    setStock('');
    setError('');
  };

  const eliminar = (id: number) => {
    setProductos(productos.filter((p) => p.id !== id));
  };

  if (!autorizado) return null;

  const totalStock = productos.reduce((suma, p) => suma + p.stock, 0);

  return (
    <main className="min-h-screen bg-green-50 p-8">
      <h1 className="text-3xl font-bold text-green-800">Panel del agricultor</h1>

      <div className="mt-6 grid max-w-md grid-cols-2 gap-4">
        <div className="rounded-lg bg-white p-4 shadow">
          <p className="text-sm text-gray-500">Productos registrados</p>
          <p className="text-2xl font-bold">{productos.length}</p>
        </div>
        <div className="rounded-lg bg-white p-4 shadow">
          <p className="text-sm text-gray-500">Stock total</p>
          <p className="text-2xl font-bold">{totalStock}</p>
        </div>
      </div>

      <section className="mt-8 max-w-2xl rounded-lg bg-white p-6 shadow">
        <h2 className="text-xl font-semibold">Agregar producto</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre del producto"
            className="rounded border p-3"
          />
          <input
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            type="number"
            placeholder="Precio"
            className="rounded border p-3"
          />
          <select
            value={unidad}
            onChange={(e) => setUnidad(e.target.value)}
            className="rounded border p-3"
          >
            <option value="kg">kg</option>
            <option value="libra">libra</option>
            <option value="unidad">unidad</option>
          </select>
          <input
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            type="number"
            placeholder="Cantidad disponible"
            className="rounded border p-3"
          />
        </div>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        <button
          onClick={agregar}
          className="mt-4 rounded bg-green-700 px-5 py-3 text-white hover:bg-green-800"
        >
          Guardar producto
        </button>
      </section>

      <table className="mt-8 w-full max-w-2xl rounded-lg bg-white shadow">
        <thead>
          <tr className="border-b text-left">
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
