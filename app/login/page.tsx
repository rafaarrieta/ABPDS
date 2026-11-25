'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Login() {
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');

  const ingresar = (e: React.FormEvent) => {
    e.preventDefault();
    if (clave.trim() === 'AGRO2026') {
      sessionStorage.setItem('acceso', 'true');
      window.location.href = '/dashboard/';
    } else {
      setError('Código de acceso incorrecto. Intenta nuevamente.');
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 text-slate-900">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-700 text-lg font-bold text-white shadow-sm">
            AG
          </div>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
            Acceso Agricultores
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Ingresa tu clave institucional para gestionar el inventario
          </p>
        </div>

        <form onSubmit={ingresar} className="mt-8 space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Código de acceso
            </label>
            <input
              type="password"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:outline-none"
            />
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-emerald-700 py-3 text-sm font-semibold text-white shadow-xs transition hover:bg-emerald-800 active:scale-[0.99]"
          >
            Acceder al panel
          </button>
        </form>

        <div className="mt-6 border-t border-slate-100 pt-5 text-center">
          <Link
            href="/catalogo/"
            className="text-sm font-medium text-slate-600 transition hover:text-emerald-700"
          >
            ← Volver al catálogo de productos
          </Link>
        </div>
      </div>
    </div>
  );
}
