"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SearchIcon } from "@/components/ui/Icons";
import { EVENTO_PALETA } from "@/features/command-palette/paleta";
import { construirComandos } from "./comandos";


/** Quita acentos y mayúsculas para que "seccion" encuentre "Sección". */
function normalizar(texto: string) {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

export default function CommandPalette() {
  const router = useRouter();
  const [abierto, setAbierto] = useState(false);
  const [consulta, setConsulta] = useState("");
  const [indice, setIndice] = useState(0);
  const [copiado, setCopiado] = useState<string | null>(null);

  const entradaRef = useRef<HTMLInputElement>(null);
  const listaRef = useRef<HTMLUListElement>(null);
  // Para devolver el foco a donde estaba al cerrar.
  const focoPrevio = useRef<HTMLElement | null>(null);

  const cerrar = useCallback(() => setAbierto(false), []);

  /** Cada apertura empieza con la búsqueda limpia y la primera opción marcada. */
  const alternar = useCallback(() => {
    setConsulta("");
    setIndice(0);
    setAbierto((v) => !v);
  }, []);

  const copiar = useCallback(async (valor: string, etiqueta: string) => {
    try {
      await navigator.clipboard.writeText(valor);
      setCopiado(etiqueta);
      setTimeout(() => setCopiado(null), 1600);
    } catch {
      /* el navegador bloqueó el portapapeles: no hay nada que avisar */
    }
  }, []);

  const comandos = useMemo(
    () =>
      construirComandos({
        cerrar,
        copiar,
        copiado,
        irARuta: (ruta) => router.push(ruta),
      }),
    [cerrar, copiar, copiado, router],
  );

  const filtrados = useMemo(() => {
    const q = normalizar(consulta.trim());
    if (!q) return comandos;
    return comandos.filter((c) =>
      normalizar(`${c.texto} ${c.grupo} ${c.pistas ?? ""}`).includes(q),
    );
  }, [comandos, consulta]);

  /** Marca el primer comando de cada grupo, para pintar su cabecera. */
  const conCabecera = useMemo(
    () =>
      filtrados.map((comando, i) => ({
        comando,
        abreGrupo: i === 0 || comando.grupo !== filtrados[i - 1].grupo,
      })),
    [filtrados],
  );

  // Atajo global: ⌘K en Mac, Ctrl+K en el resto.
  useEffect(() => {
    const alPulsar = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        alternar();
      }
    };
    const alPedirApertura = () => alternar();

    window.addEventListener("keydown", alPulsar);
    window.addEventListener(EVENTO_PALETA, alPedirApertura);
    return () => {
      window.removeEventListener("keydown", alPulsar);
      window.removeEventListener(EVENTO_PALETA, alPedirApertura);
    };
  }, [alternar]);

  // Al abrir: recuerda el foco y bloquea el scroll del fondo.
  useEffect(() => {
    if (!abierto) return;

    focoPrevio.current = document.activeElement as HTMLElement | null;

    const scrollPrevio = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => entradaRef.current?.focus(), 0);

    return () => {
      clearTimeout(t);
      document.body.style.overflow = scrollPrevio;
      focoPrevio.current?.focus();
    };
  }, [abierto]);

  // Mantiene la opción marcada dentro de la zona visible.
  useEffect(() => {
    listaRef.current
      ?.querySelector('[data-marcado="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [indice, filtrados.length]);

  if (!abierto) return null;

  function alTeclear(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      e.preventDefault();
      cerrar();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndice((i) => (filtrados.length ? (i + 1) % filtrados.length : 0));
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndice((i) =>
        filtrados.length ? (i - 1 + filtrados.length) % filtrados.length : 0,
      );
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      filtrados[indice]?.ejecutar();
    }
  }

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-center bg-black/60 p-4 pt-[12vh] backdrop-blur-sm"
      onClick={cerrar}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Paleta de comandos"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={alTeclear}
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl"
      >
        <div className="flex items-center gap-3 border-b border-border px-4">
          <SearchIcon className="h-4 w-4 shrink-0 text-muted" />
          <input
            ref={entradaRef}
            value={consulta}
            onChange={(e) => {
              setConsulta(e.target.value);
              setIndice(0);
            }}
            placeholder="Buscar sección, copiar correo, cambiar tema…"
            aria-label="Buscar comando"
            className="w-full bg-transparent py-4 text-sm outline-none placeholder:text-muted"
          />
          <kbd className="shrink-0 rounded border border-border px-1.5 py-0.5 font-mono text-[11px] text-muted">
            esc
          </kbd>
        </div>

        <ul ref={listaRef} className="max-h-[52vh] overflow-y-auto p-2">
          {filtrados.length === 0 && (
            <li className="px-3 py-8 text-center text-sm text-muted">
              Nada coincide con «{consulta}».
            </li>
          )}

          {conCabecera.map(({ comando, abreGrupo }, i) => {
            const marcado = i === indice;

            return (
              <li key={comando.id}>
                {abreGrupo && (
                  <p className="px-3 pb-1 pt-3 font-mono text-[11px] uppercase tracking-wider text-muted">
                    {comando.grupo}
                  </p>
                )}
                <button
                  type="button"
                  data-marcado={marcado}
                  onMouseEnter={() => setIndice(i)}
                  onClick={comando.ejecutar}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                    marcado
                      ? "bg-accent-soft text-accent"
                      : "text-muted hover:text-text"
                  }`}
                >
                  <comando.Icono className="h-4 w-4 shrink-0" />
                  <span className="truncate">{comando.texto}</span>
                  {marcado && (
                    <kbd className="ml-auto shrink-0 rounded border border-border px-1.5 py-0.5 font-mono text-[11px]">
                      ↵
                    </kbd>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-4 border-t border-border px-4 py-2.5 font-mono text-[11px] text-muted">
          <span>↑↓ moverse</span>
          <span>↵ ejecutar</span>
          <span>esc cerrar</span>
          {copiado && (
            <span className="ml-auto text-accent">¡{copiado} copiado!</span>
          )}
        </div>
      </div>
    </div>
  );
}
