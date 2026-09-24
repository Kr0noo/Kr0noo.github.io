import { perfil } from "@/data/portfolio";
import { GitHubIcon, InstagramIcon, MailIcon } from "./Icons";
import Reveal from "./Reveal";
import Section from "./Section";

const enlaces = [
  {
    etiqueta: "Correo",
    valor: perfil.email,
    href: `mailto:${perfil.email}`,
    Icono: MailIcon,
    externo: false,
  },
  {
    etiqueta: "GitHub",
    valor: `@${perfil.alias}`,
    href: perfil.github,
    Icono: GitHubIcon,
    externo: true,
  },
  {
    etiqueta: "Instagram",
    valor: "@adderly.r06",
    href: perfil.instagram,
    Icono: InstagramIcon,
    externo: true,
  },
];

export default function Contact() {
  return (
    <Section
      id="contacto"
      numero="05"
      titulo="Hablemos"
      descripcion="Estoy buscando prácticas preprofesionales. Si tienes una vacante o una idea que quieras construir, escríbeme."
    >
      <Reveal>
        <div className="grid gap-4 sm:grid-cols-3">
          {enlaces.map(({ etiqueta, valor, href, Icono, externo }) => (
            <a
              key={etiqueta}
              href={href}
              {...(externo
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="group rounded-2xl border border-border bg-surface p-5 transition hover:border-accent/50"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-soft text-accent">
                <Icono className="h-5 w-5" />
              </span>
              <p className="mt-4 font-mono text-xs uppercase tracking-wider text-muted">
                {etiqueta}
              </p>
              <p className="mt-1 break-words text-sm font-semibold transition group-hover:text-accent">
                {valor}
              </p>
            </a>
          ))}
        </div>
      </Reveal>

      <Reveal delay={140}>
        <div className="mt-6 rounded-2xl border border-border bg-gradient-to-br from-surface to-surface-2 p-8 text-center">
          <p className="text-lg font-semibold">
            ¿Tienes una vacante para un practicante?
          </p>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
            Respondo en menos de 24 horas. Cuéntame del equipo y del stack, y te
            envío mi CV.
          </p>
          <a
            href={`mailto:${perfil.email}?subject=${encodeURIComponent(
              "Oportunidad de prácticas",
            )}`}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-bg transition hover:opacity-90"
          >
            <MailIcon className="h-4 w-4" />
            Enviar correo
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
