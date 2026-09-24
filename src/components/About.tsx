import { datosRapidos, perfil, sobreMi } from "@/data/portfolio";
import Counter from "./Counter";
import Reveal from "./Reveal";
import Section from "./Section";
import Spotlight from "./Spotlight";

export default function About() {
  return (
    <Section id="sobre-mi" numero="01" titulo="Sobre mí">
      <div className="grid gap-10 md:grid-cols-[1.6fr_1fr]">
        <Reveal>
          <div className="space-y-4 text-base leading-relaxed text-muted">
            {sobreMi.map((parrafo, i) => (
              <p key={i}>{parrafo}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <Spotlight className="h-full rounded-2xl border border-border bg-surface p-6 transition hover:border-accent/50">
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
      </div>
    </Section>
  );
}
