import { perfil } from "@/features/portfolio/data/portfolio";
import {
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  PhoneIcon,
} from "@/components/ui/Icons";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";

const enlaces = [
  {
    etiqueta: "Correo",
    valor: perfil.email,
    href: `mailto:${perfil.email}`,
    Icono: MailIcon,
    externo: false,
  },
  {
    etiqueta: "Teléfono",
    valor: perfil.telefono,
    href: `tel:${perfil.telefonoEnlace}`,
    Icono: PhoneIcon,
    externo: false,
  },
  {
    etiqueta: "LinkedIn",
    valor: "Adderly Valverde Ramos",
    href: perfil.linkedin,
    Icono: LinkedInIcon,
    externo: true,
  },
  {
    etiqueta: "GitHub",
    valor: `@${perfil.alias}`,
    href: perfil.github,
    Icono: GitHubIcon,
    externo: true,
  },
];

export default function Contact() {
  return (
    <Section
      id="contacto"
      numero="06"
      titulo="Hablemos"
      descripcion="Si tienes un proyecto, una vacante o una idea que quieras construir, escríbeme."
    >
      <Reveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {enlaces.map(({ etiqueta, valor, href, Icono, externo }) => (
            <a
              key={etiqueta}
              href={href}
              {...(externo
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="group flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 transition hover:-translate-y-1 hover:border-accent/50"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                <Icono className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="font-mono text-xs uppercase tracking-wider text-muted">
                  {etiqueta}
                </p>
                <p className="mt-0.5 break-words text-sm font-semibold transition group-hover:text-accent">
                  {valor}
                </p>
              </div>
            </a>
          ))}
        </div>
      </Reveal>

      <Reveal delay={140}>
        <div className="mt-6 rounded-2xl border border-border bg-gradient-to-br from-surface to-surface-2 p-8 text-center">
          <p className="text-lg font-semibold">
            ¿Buscas un desarrollador para tu equipo?
          </p>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
            Respondo en menos de 24 horas. Cuéntame del proyecto y del stack, y
            te comparto mi disponibilidad.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${perfil.email}?subject=${encodeURIComponent(
                "Oportunidad laboral",
              )}`}
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-bg transition hover:opacity-90"
            >
              <MailIcon className="h-4 w-4" />
              Enviar correo
            </a>
            <a
              href={perfil.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-6 py-3 text-sm font-semibold transition hover:border-accent hover:text-accent"
            >
              <LinkedInIcon className="h-4 w-4" />
              Conectar en LinkedIn
            </a>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
