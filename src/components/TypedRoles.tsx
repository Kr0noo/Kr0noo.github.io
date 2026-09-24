"use client";

import { useEffect, useState } from "react";

const PAUSA_FINAL = 1900;
const PAUSA_CAMBIO = 320;
const VEL_ESCRIBIR = 72;
const VEL_BORRAR = 38;

/** Escribe y borra los roles en bucle. Con movimiento reducido, se queda fijo. */
export default function TypedRoles({ roles }: { roles: string[] }) {
  const [indice, setIndice] = useState(0);
  const [largo, setLargo] = useState(0);
  const [borrando, setBorrando] = useState(false);

  useEffect(() => {
    const completo = roles[indice];

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (largo !== completo.length) {
        const t = setTimeout(() => setLargo(completo.length), 0);
        return () => clearTimeout(t);
      }
      return;
    }

    // Terminó de escribir: espera y empieza a borrar.
    if (!borrando && largo === completo.length) {
      const t = setTimeout(() => setBorrando(true), PAUSA_FINAL);
      return () => clearTimeout(t);
    }

    // Terminó de borrar: pasa al siguiente rol.
    if (borrando && largo === 0) {
      const t = setTimeout(() => {
        setBorrando(false);
        setIndice((i) => (i + 1) % roles.length);
      }, PAUSA_CAMBIO);
      return () => clearTimeout(t);
    }

    const t = setTimeout(
      () => setLargo((l) => l + (borrando ? -1 : 1)),
      borrando ? VEL_BORRAR : VEL_ESCRIBIR,
    );
    return () => clearTimeout(t);
  }, [largo, borrando, indice, roles]);

  return (
    <span className="inline-flex min-h-[1.2em] items-center">
      {/* Los lectores de pantalla leen la lista completa, no la animación. */}
      <span className="sr-only">{roles.join(", ")}</span>
      <span aria-hidden="true">
        <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
          {roles[indice].slice(0, largo)}
        </span>
        <span className="cursor-escritura h-[0.95em] align-middle" />
      </span>
    </span>
  );
}
