"use client";

import { useSyncExternalStore } from "react";

type Tema = "light" | "dark";

const EVENTO = "tema:cambio";

/** Avisa a los suscriptores cuando cambia el tema (por el botón o por el SO). */
function suscribir(alCambiar: () => void) {
  const consulta = window.matchMedia("(prefers-color-scheme: dark)");
  consulta.addEventListener("change", alCambiar);
  window.addEventListener(EVENTO, alCambiar);
  return () => {
    consulta.removeEventListener("change", alCambiar);
    window.removeEventListener(EVENTO, alCambiar);
  };
}

function leerEnCliente(): Tema {
  const forzado = document.documentElement.dataset.theme;
  if (forzado === "light" || forzado === "dark") return forzado;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/** En el servidor el tema es desconocido: se pinta un hueco del mismo tamaño. */
const leerEnServidor = (): Tema | null => null;

export default function ThemeToggle() {
  const tema = useSyncExternalStore(suscribir, leerEnCliente, leerEnServidor);

  function alternar() {
    const siguiente: Tema = tema === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = siguiente;
    try {
      localStorage.setItem("tema", siguiente);
    } catch {
      /* almacenamiento bloqueado: el cambio vale solo para esta vista */
    }
    window.dispatchEvent(new Event(EVENTO));
  }

  const esOscuro = tema === "dark";

  return (
    <button
      type="button"
      onClick={alternar}
      aria-label={esOscuro ? "Activar modo claro" : "Activar modo oscuro"}
      className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-surface text-muted transition hover:border-accent hover:text-accent"
    >
      {tema === null ? (
        <span className="h-4 w-4" />
      ) : esOscuro ? (
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79Z" />
        </svg>
      )}
    </button>
  );
}
