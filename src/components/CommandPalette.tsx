"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { navegacion, perfil } from "@/data/portfolio";
import {
  CheckIcon,
  CopyIcon,
  DownloadIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  PhoneIcon,
  SearchIcon,
  SectionIcon,
  ThemeIcon,
} from "./Icons";
import { EVENTO_PALETA } from "./paleta";

type Comando = {
  id: string;
  texto: string;
  grupo: string;
  pistas?: string;
  Icono: (p: { className?: string }) => React.ReactElement;
  ejecutar: () => void;
};

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

  const comandos: Comando[] = useMemo(() => {
    const irA = (href: string) => () => {
      cerrar();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    };

    const abrir = (url: string) => () => {
      cerrar();
      window.open(url, "_blank", "noopener,noreferrer");
    };

    return [
      ...navegacion.map((item) => ({
        id: `ir-${item.href}`,
        texto: `Ir a ${item.texto}`,
        grupo: "Navegación",
        Icono: SectionIcon,
        ejecutar: irA(item.href),
      })),
      {
        id: "cv",
        texto: "Ver mi currículum",
        grupo: "Navegación",
        pistas: "cv resumen hoja de vida",
        Icono: SectionIcon,
        ejecutar: () => {
          cerrar();
          router.push("/cv/");
        },
      },
      {
        id: "descargar-cv",
        texto: "Descargar CV en PDF",
        grupo: "Acciones",
        pistas: "pdf descargar",
        Icono: DownloadIcon,
        ejecutar: () => {
          cerrar();
          const a = document.createElement("a");
          a.href = "/cv.pdf";
          a.download = "CV-Adderly-Valverde.pdf";
          a.click();
        },
      },
      {
        id: "copiar-correo",
        texto: `Copiar correo · ${perfil.email}`,
        grupo: "Acciones",
        pistas: "email mail portapapeles",
        Icono: copiado === "correo" ? CheckIcon : CopyIcon,
        ejecutar: () => copiar(perfil.email, "correo"),
      },
      {
        id: "copiar-telefono",
        texto: `Copiar teléfono · ${perfil.telefono}`,
        grupo: "Acciones",
        pistas: "celular numero portapapeles",
        Icono: copiado === "teléfono" ? CheckIcon : CopyIcon,
        ejecutar: () => copiar(perfil.telefono, "teléfono"),
      },
      {
        id: "escribir",
        texto: "Escribirme un correo",
        grupo: "Acciones",
        pistas: "contacto mail",
        Icono: MailIcon,
        ejecutar: () => {
          cerrar();
          window.location.href = `mailto:${perfil.email}`;
        },
      },
      {
        id: "llamar",
        texto: "Llamarme",
        grupo: "Acciones",
        pistas: "telefono celular",
        Icono: PhoneIcon,
        ejecutar: () => {
          cerrar();
          window.location.href = `tel:${perfil.telefonoEnlace}`;
        },
      },
      {
        id: "tema",
        texto: "Cambiar tema claro / oscuro",
        grupo: "Acciones",
        pistas: "modo noche dark light",
        Icono: ThemeIcon,
        ejecutar: () => {
          const raiz = document.documentElement;
          const actual =
            raiz.dataset.theme ??
            (window.matchMedia("(prefers-color-scheme: dark)").matches
              ? "dark"
              : "light");
          const siguiente = actual === "dark" ? "light" : "dark";
          raiz.dataset.theme = siguiente;
          try {
            localStorage.setItem("tema", siguiente);
          } catch {
            /* almacenamiento bloqueado */
          }
          window.dispatchEvent(new Event("tema:cambio"));
          cerrar();
        },
      },
      {
        id: "github",
        texto: "Abrir GitHub",
        grupo: "Enlaces",
        Icono: GitHubIcon,
        ejecutar: abrir(perfil.github),
      },
      {
        id: "linkedin",
        texto: "Abrir LinkedIn",
        grupo: "Enlaces",
        Icono: LinkedInIcon,
        ejecutar: abrir(perfil.linkedin),
      },
    ];
  }, [cerrar, copiar, copiado, router]);

  const filtrados = useMemo(() => {
    const q = normalizar(consulta.trim());
    if (!q) return comandos;
    return comandos.filter((c) =>
      normalizar(`${c.texto} ${c.grupo} ${c.pistas ?? ""}`).includes(q),
    );
  }, [comandos, consulta]);

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

  let grupoActual = "";

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

          {filtrados.map((comando, i) => {
            const nuevoGrupo = comando.grupo !== grupoActual;
            grupoActual = comando.grupo;
            const marcado = i === indice;

            return (
              <li key={comando.id}>
                {nuevoGrupo && (
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
