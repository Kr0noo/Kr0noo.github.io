import { stack } from "@/data/portfolio";

// Se recorre una sola vez el stack para armar la cinta.
const tecnologias = stack.flatMap((grupo) => grupo.items);

export default function Marquee() {
  return (
    <div className="marquesina-marco overflow-hidden border-y border-border bg-surface/40 py-4">
      {/* La lista va duplicada: al desplazarse -50% el bucle es invisible. */}
      <div className="marquesina gap-3">
        {[0, 1].map((copia) => (
          <ul key={copia} className="flex gap-3 pr-3" aria-hidden={copia === 1}>
            {tecnologias.map((tec) => (
              <li
                key={tec}
                className="whitespace-nowrap rounded-lg border border-border bg-surface px-4 py-2 font-mono text-sm text-muted"
              >
                {tec}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
