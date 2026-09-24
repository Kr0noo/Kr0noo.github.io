import type { ReactNode } from "react";
import Reveal from "./Reveal";

export default function Section({
  id,
  numero,
  titulo,
  descripcion,
  children,
}: {
  id: string;
  numero: string;
  titulo: string;
  descripcion?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <Reveal>
          <header className="mb-12">
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm text-accent">{numero}</span>
              <span className="h-px flex-1 bg-border" aria-hidden="true" />
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              {titulo}
            </h2>
            {descripcion && (
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
                {descripcion}
              </p>
            )}
          </header>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
