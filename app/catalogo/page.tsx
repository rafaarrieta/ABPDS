'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

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

export default function Catalogo() {
  const [productos, setProductos] = useState<Producto[]>(INICIALES);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    try {
      const guardado = localStorage.getItem('productos');
      if (guardado) {
        setProductos(JSON.parse(guardado));
      }
    } catch {
      /* si falla la lectura se muestran los productos iniciales */
    }
  }, []);

  const filtrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-green-50 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-green-800">Catálogo de Productos</h1>
            <p className="mt-1 text-gray-600">Directo del campo a tu mesa</p>
          </div>
          <Link
            href="/login/"
            className="rounded bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-800"
          >
            Soy agricultor
          </Link>
        </div>

        <div className="mt-6">
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar producto (ej. Yuca, Ñame)..."
            className="w-full max-w-md rounded-lg border bg-white p-3 shadow-sm"
          />
        </div>

        {filtrados.length === 0 ? (
          <p className="mt-8 text-gray-500">No se encontraron productos disponibles.</p>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtrados.map((p) => (
              <div key={p.id} className="flex flex-col justify-between rounded-lg bg-white p-6 shadow">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{p.nombre}</h2>
                  <p className="mt-2 text-2xl font-semibold text-green-700">
                    ${p.precio.toLocaleString()} <span className="text-sm font-normal text-gray-500">/ {p.unidad}</span>
                  </p>
                  <p className="mt-2 text-sm text-gray-600">
                    Disponible: <span className="font-medium">{p.stock} {p.unidad}</span>
                  </p>
                </div>
                <button
                  onClick={() => alert(`¡Has reservado ${p.nombre}! Pronto nos contactaremos contigo.`)}
                  disabled={p.stock <= 0}
                  className="mt-6 w-full rounded bg-green-700 py-2 font-medium text-white hover:bg-green-800 disabled:bg-gray-400"
                >
                  {p.stock > 0 ? 'Solicitar pedido' : 'Agotado'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
