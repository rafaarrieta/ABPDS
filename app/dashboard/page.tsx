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
      if (guardado) {
        const parsed = JSON.parse(guardado);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProductos(parsed);
        }
      }
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

  const agregar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || Number(precio) <= 0 || Number(stock) < 0 || stock === '') {
      setError('Completa el nombre, un precio mayor a 0 y una cantidad válida.');
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

  const cerrarSesion = () => {
    sessionStorage.removeItem('acceso');
    window.location.href = '/login/';
  };

  if (!autorizado) return null;

  const totalStock = productos.reduce((suma, p) => suma + p.stock, 0);

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
                Panel del Agricultor
              </h1>
              <p className="text-xs text-slate-500">Gestión de inventario y cosechas</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/catalogo/"
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Ver catálogo
            </a>
            <button
              onClick={cerrarSesion}
              className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-red-50 hover:text-red-600"
            >
              Salir
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        {/* Tarjetas de métricas */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <p className="text-sm font-medium text-slate-500">Productos registrados</p>
            <p className="mt-2 text-3xl font-extrabold text-slate-900">{productos.length}</p>
            <p className="mt-1 text-xs text-emerald-600">Activos en catálogo</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <p className="text-sm font-medium text-slate-500">Stock total acumulado</p>
            <p className="mt-2 text-3xl font-extrabold text-slate-900">
              {totalStock.toLocaleString('es-CO')}
            </p>
            <p className="mt-1 text-xs text-slate-500">Unidades / kg disponibles</p>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6 shadow-xs sm:col-span-2 lg:col-span-1">
            <p className="text-sm font-medium text-emerald-800">Estado del sistema</p>
            <p className="mt-2 text-lg font-bold text-emerald-900">Sincronizado localmente</p>
            <p className="mt-1 text-xs text-emerald-700">Los cambios se reflejan al instante</p>
          </div>
        </div>

        {/* Formulario de registro */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900">Agregar nuevo producto</h2>
            <p className="text-sm text-slate-500">
              Ingresa los datos de tu cosecha para publicarla en el catálogo.
            </p>
          </div>

          <form onSubmit={agregar} className="mt-6">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <div className="sm:col-span-2 lg:col-span-1">
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Producto
                </label>
                <input
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej. Ñame espino"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Precio (COP)
                </label>
                <input
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  type="number"
                  min="1"
                  placeholder="Ej. 3200"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Unidad de medida
                </label>
                <select
                  value={unidad}
                  onChange={(e) => setUnidad(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:outline-none"
                >
                  <option value="kg">Kilogramo (kg)</option>
                  <option value="libra">Libra (lb)</option>
                  <option value="unidad">Unidad</option>
                  <option value="bulto">Bulto</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Cantidad disponible
                </label>
                <input
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  type="number"
                  min="0"
                  placeholder="Ej. 50"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:outline-none"
                />
              </div>
            </div>

            {error && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="rounded-xl bg-emerald-700 px-6 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-emerald-800 active:scale-[0.99]"
              >
                + Guardar producto
              </button>
            </div>
          </form>
        </section>

        {/* Tabla de inventario */}
        <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
          <div className="border-b border-slate-200 px-6 py-4">
            <h2 className="text-lg font-bold text-slate-900">Inventario actual</h2>
          </div>

          {productos.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-sm font-medium text-slate-600">No hay productos registrados.</p>
              <p className="mt-1 text-xs text-slate-400">
                Usa el formulario de arriba para agregar el primero.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold tracking-wider text-slate-500 uppercase">
                    <th className="px-6 py-3.5">Producto</th>
                    <th className="px-6 py-3.5">Precio</th>
                    <th className="px-6 py-3.5">Stock disponible</th>
                    <th className="px-6 py-3.5 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {productos.map((p) => (
                    <tr key={p.id} className="transition hover:bg-slate-50/80">
                      <td className="px-6 py-4 font-semibold text-slate-900">{p.nombre}</td>
                      <td className="px-6 py-4 font-medium text-emerald-700">
                        ${p.precio.toLocaleString('es-CO')}{' '}
                        <span className="text-xs font-normal text-slate-500">/ {p.unidad}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-600/20 ring-inset">
                          {p.stock} {p.unidad}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => eliminar(p.id)}
                          className="rounded-lg px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
