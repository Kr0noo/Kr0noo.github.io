import { datosRapidos, educacion, perfil, sobreMi } from "@/features/portfolio/data/portfolio";
import Counter from "@/components/ui/Counter";
import GitHubStats from "./GitHubStats";
import { GraduationIcon, StarIcon } from "@/components/ui/Icons";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import Spotlight from "@/components/ui/Spotlight";

export default function About() {
  return (
    <Section id="sobre-mi" numero="01" titulo="Sobre mí">
      <div className="grid gap-10 md:grid-cols-[1.6fr_1fr]">
        <div className="space-y-6">
          <Reveal>
            <div className="space-y-4 text-base leading-relaxed text-muted">
              {sobreMi.map((parrafo, i) => (
                <p key={i}>{parrafo}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={80}>
            <Spotlight className="rounded-2xl border border-border bg-surface p-6 transition hover:border-accent/50">
              <div className="flex items-start gap-4">
                <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                  <GraduationIcon />
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-semibold">{educacion.institucion}</h3>
                    <p className="font-mono text-xs text-muted">
                      {educacion.periodo}
                    </p>
                  </div>

                  <p className="mt-1 text-sm text-muted">
                    {educacion.carrera} · {educacion.ciclo}
                  </p>

                  <p className="mt-3 text-sm">
                    <span className="text-muted">Promedio ponderado: </span>
                    <span className="font-semibold text-accent">
                      {educacion.promedio}
                    </span>
                  </p>

                  <ul className="mt-3 space-y-1.5">
                    {educacion.reconocimientos.map((reconocimiento) => (
                      <li
                        key={reconocimiento}
                        className="flex items-center gap-2 text-sm text-muted"
                      >
                        <StarIcon className="h-3.5 w-3.5 shrink-0 text-accent" />
                        {reconocimiento}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Spotlight>
          </Reveal>
        </div>

        <div className="space-y-4">
          <Reveal delay={120}>
          <Spotlight className="rounded-2xl border border-border bg-surface p-6 transition hover:border-accent/50">
            <dl className="space-y-4">
              {datosRapidos.map((dato) => (
                <div key={dato.etiqueta}>
                  <dt className="font-mono text-xs uppercase tracking-wider text-muted">
                    {dato.etiqueta}
                  </dt>
                  <dd className="mt-0.5 text-sm font-semibold">
                    {dato.numero !== undefined ? (
                      <Counter valor={dato.numero} sufijo={dato.sufijo} />
                    ) : (
                      dato.valor
                    )}
                  </dd>
                </div>
              ))}
              <div>
                <dt className="font-mono text-xs uppercase tracking-wider text-muted">
                  Ubicación
                </dt>
                <dd className="mt-0.5 text-sm font-semibold">
                  {perfil.ubicacion}
                </dd>
              </div>
            </dl>
          </Spotlight>
          </Reveal>

          <Reveal delay={200}>
            <GitHubStats />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
