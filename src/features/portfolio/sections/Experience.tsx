import { experiencia } from "@/features/portfolio/data/portfolio";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import Spotlight from "@/components/ui/Spotlight";

export default function Experience() {
  return (
    <Section
      id="experiencia"
      numero="02"
      titulo="Experiencia"
      descripcion="Dónde he trabajado y qué construí en cada equipo."
    >
      <ol className="relative space-y-5 border-l border-border pl-6 sm:pl-8">
        {experiencia.map((puesto, i) => (
          <li key={`${puesto.empresa}-${puesto.puesto}`} className="relative">
            {/* Punto del hilo temporal */}
            <span
              className={`absolute -left-[31px] top-7 h-3 w-3 rounded-full border-2 border-bg sm:-left-[39px] ${
                puesto.actual ? "bg-accent" : "bg-border"
              }`}
              aria-hidden="true"
            >
              {puesto.actual && (
                <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-75" />
              )}
            </span>

            <Reveal delay={i * 90}>
              <Spotlight className="rounded-2xl border border-border bg-surface p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/50 sm:p-7">
                <article>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
                      {puesto.puesto}
                    </h3>
                    <p className="font-mono text-xs text-muted">
                      {puesto.periodo}
                    </p>
                  </div>

                  <p className="mt-1 flex flex-wrap items-center gap-2 text-sm font-medium text-accent">
                    {puesto.empresa}
                    {puesto.actual && (
                      <span className="rounded-full bg-accent-soft px-2 py-0.5 font-mono text-[11px]">
                        Actual
                      </span>
                    )}
                  </p>

                  <ul className="mt-4 space-y-2">
                    {puesto.logros.map((logro) => (
                      <li
                        key={logro}
                        className="flex gap-3 text-sm leading-relaxed text-muted"
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {logro}
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {puesto.tecnologias.map((tec) => (
                      <li
                        key={tec}
                        className="rounded-lg border border-border bg-surface-2 px-2.5 py-1 font-mono text-xs text-muted"
                      >
                        {tec}
                      </li>
                    ))}
                  </ul>
                </article>
              </Spotlight>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
