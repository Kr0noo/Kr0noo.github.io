import { perfil, proyectos } from "@/data/portfolio";
import { ExternalIcon, GitHubIcon, LockIcon } from "./Icons";
import ProjectCover from "./ProjectCover";
import Reveal from "./Reveal";
import Section from "./Section";
import Spotlight from "./Spotlight";

export default function Projects() {
  return (
    <Section
      id="proyectos"
      numero="04"
      titulo="Proyectos"
      descripcion="Lo que he construido, con el detalle técnico de cada decisión."
    >
      <div className="grid gap-5">
        {proyectos.map((proyecto, i) => (
          <Reveal key={proyecto.nombre} delay={i * 80}>
            <Spotlight className="group rounded-2xl border border-border bg-surface p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/50 sm:p-8">
              <article className="grid gap-6 md:grid-cols-[minmax(0,300px)_1fr] md:items-start">
                <ProjectCover proyecto={proyecto} />

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    {proyecto.destacado && (
                      <span className="rounded-full bg-accent-soft px-2.5 py-1 font-mono text-xs text-accent">
                        Destacado
                      </span>
                    )}
                    {proyecto.tipo && (
                      <span className="rounded-full border border-border px-2.5 py-1 font-mono text-xs text-muted">
                        {proyecto.tipo}
                      </span>
                    )}
                  </div>

                  <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
                    <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                      {proyecto.nombre}
                    </h3>

                    <div className="flex items-center gap-2">
                      {proyecto.repo && (
                        <a
                          href={proyecto.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Código de ${proyecto.nombre} en GitHub`}
                          className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted transition hover:border-accent hover:text-accent"
                        >
                          <GitHubIcon className="h-4 w-4" />
                        </a>
                      )}
                      {proyecto.privado && (
                        <span
                          title="El código de este proyecto es privado"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-2 font-mono text-xs text-muted"
                        >
                          <LockIcon className="h-3.5 w-3.5" />
                          Código privado
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="mt-3 text-base leading-relaxed text-muted">
                    {proyecto.descripcion}
                  </p>

                  {proyecto.detalles.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {proyecto.detalles.map((detalle) => (
                        <li
                          key={detalle}
                          className="flex gap-3 text-sm leading-relaxed text-muted"
                        >
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                          {detalle}
                        </li>
                      ))}
                    </ul>
                  )}

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {proyecto.tecnologias.map((tec) => (
                      <li
                        key={tec}
                        className="rounded-lg border border-border bg-surface-2 px-2.5 py-1 font-mono text-xs text-muted"
                      >
                        {tec}
                      </li>
                    ))}
                  </ul>

                  {proyecto.demo && (
                    <a
                      href={proyecto.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-bg transition hover:opacity-90"
                    >
                      Ver en vivo
                      <ExternalIcon />
                    </a>
                  )}
                </div>
              </article>
            </Spotlight>
          </Reveal>
        ))}

        <Reveal delay={proyectos.length * 80}>
          <a
            href={perfil.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-4 rounded-2xl border border-dashed border-border bg-surface/50 p-6 transition hover:border-accent sm:p-8"
          >
            <div>
              <h3 className="text-lg font-semibold">Más en GitHub</h3>
              <p className="mt-1 text-sm text-muted">
                Repositorios, experimentos y lo que estoy construyendo ahora.
              </p>
            </div>
            <GitHubIcon className="h-6 w-6 shrink-0 text-muted" />
          </a>
        </Reveal>
      </div>
    </Section>
  );
}
