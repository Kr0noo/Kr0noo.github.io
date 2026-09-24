import { certificaciones } from "@/data/portfolio";
import { BadgeIcon, ExternalIcon } from "./Icons";
import Reveal from "./Reveal";
import Section from "./Section";

export default function Certifications() {
  return (
    <Section
      id="certificaciones"
      numero="04"
      titulo="Certificaciones"
      descripcion="Formación complementaria en cloud, programación y metodologías ágiles."
    >
      <ul className="grid gap-4 sm:grid-cols-2">
        {certificaciones.map((cert, i) => (
          <li key={cert.nombre}>
            <Reveal delay={i * 70}>
              <div className="flex h-full items-start gap-4 rounded-2xl border border-border bg-surface p-5 transition hover:border-accent/50">
                <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                  <BadgeIcon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold leading-snug">
                    {cert.nombre}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{cert.emisor}</p>
                  {cert.url && (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1.5 text-xs text-accent hover:underline"
                    >
                      Ver credencial
                      <ExternalIcon className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
