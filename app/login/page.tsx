'use client';

import { useState } from 'react';

const CODIGO_ACCESO = process.env.NEXT_PUBLIC_CODIGO_ACCESO || 'AGRO2026';

export default function Login() {
  const [codigo, setCodigo] = useState('');
  const [error, setError] = useState('');

  const ingresar = () => {
    if (codigo === CODIGO_ACCESO) {
      sessionStorage.setItem('acceso', 'true');
      window.location.href = '/dashboard/';
    } else {
      setError('Código incorrecto');
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-green-50">
      <div className="w-full max-w-sm rounded-lg bg-white p-8 shadow">
        <h1 className="text-center text-2xl font-bold text-green-800">ACCESO</h1>
        <input
          type="password"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && ingresar()}
          placeholder="Ingrese su código de acceso"
          className="mt-6 w-full rounded border p-3"
        />
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        <button
          onClick={ingresar}
          className="mt-4 w-full rounded bg-green-700 p-3 text-white hover:bg-green-800"
        >
          ACCEDER
        </button>
      </div>
    </main>
  );
}
