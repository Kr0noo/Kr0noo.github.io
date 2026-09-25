"use client";

import { SearchIcon } from "@/components/ui/Icons";
import { EVENTO_PALETA } from "@/lib/paleta";

/**
 * Vive dentro de la barra de navegación. El diálogo no puede montarse aquí:
 * el `backdrop-blur` del header crea un bloque contenedor que atraparía un
 * elemento `fixed`. Por eso solo avisa por evento y la paleta se monta aparte.
 */
export default function CommandPaletteButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(EVENTO_PALETA))}
      aria-label="Abrir la paleta de comandos"
      className="hidden items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-muted transition hover:border-accent hover:text-accent md:inline-flex"
    >
      <SearchIcon className="h-4 w-4" />
      <span className="font-mono text-xs">⌘K</span>
    </button>
  );
}
