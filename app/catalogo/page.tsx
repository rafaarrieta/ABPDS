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
        const parsed = JSON.parse(guardado);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProductos(parsed);
        }
      }
    } catch {
      /* si falla la lectura se muestran los productos iniciales */
    }
  }, []);

  const filtrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Barra superior */}
      <header className="border-b border-slate-200 bg-white shadow-xs">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-700 font-bold text-white shadow-sm">
              AG
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                Catálogo de Productos
              </h1>
              <p className="text-xs text-slate-500">Directo del campo a tu mesa</p>
            </div>
          </div>

          <Link
            href="/login/"
            className="rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-emerald-800"
          >
            Soy agricultor
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        {/* Barra de búsqueda */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="w-full max-w-md">
            <label className="mb-1.5 block text-xs font-semibold tracking-wider text-slate-500 uppercase">
              Buscar cosecha
            </label>
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Ej. Yuca, Plátano, Ñame..."
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:outline-none"
            />
          </div>

          <p className="text-sm text-slate-500">
            Mostrando <span className="font-semibold text-slate-900">{filtrados.length}</span>{' '}
            {filtrados.length === 1 ? 'producto' : 'productos'}
          </p>
        </div>

        {/* Cuadrícula de productos */}
        {filtrados.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-xs">
            <p className="text-base font-semibold text-slate-700">
              No se encontraron productos disponibles
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Intenta con otro nombre o limpia el filtro de búsqueda.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtrados.map((p) => (
              <div
                key={p.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition hover:border-emerald-300 hover:shadow-md"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="text-xl font-bold text-slate-900">{p.nombre}</h2>
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-600/20 ring-inset">
                      {p.stock > 0 ? `${p.stock} ${p.unidad} disp.` : 'Agotado'}
                    </span>
                  </div>

                  <p className="mt-4 text-3xl font-extrabold text-emerald-700">
                    ${p.precio.toLocaleString('es-CO')}{' '}
                    <span className="text-sm font-normal text-slate-500">/ {p.unidad}</span>
                  </p>
                </div>

                <button
                  onClick={() =>
                    alert(`¡Has reservado ${p.nombre}! Pronto el agricultor se contactará contigo.`)
                  }
                  disabled={p.stock <= 0}
                  className="mt-6 w-full rounded-xl bg-emerald-700 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-emerald-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
                >
                  {p.stock > 0 ? 'Solicitar pedido' : 'Sin stock'}
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
