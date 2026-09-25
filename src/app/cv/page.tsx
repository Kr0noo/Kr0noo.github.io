import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  certificaciones,
  educacion,
  experiencia,
  idiomas,
  perfil,
  proyectos,
  stack,
} from "@/features/portfolio/data/portfolio";
import {
  DownloadIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  PhoneIcon,
} from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Currículum",
  description: `Currículum de ${perfil.nombreCompleto} — ${perfil.titulo} en Lima, Perú.`,
  alternates: { canonical: "/cv/" },
};

function Bloque({
  titulo,
  children,
}: {
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-border pt-8">
      <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
        {titulo}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export default function CV() {
  const contacto = [
    { href: `mailto:${perfil.email}`, texto: perfil.email, Icono: MailIcon },
    {
      href: `tel:${perfil.telefonoEnlace}`,
      texto: perfil.telefono,
      Icono: PhoneIcon,
    },
    { href: perfil.linkedin, texto: "LinkedIn", Icono: LinkedInIcon },
    { href: perfil.github, texto: `@${perfil.alias}`, Icono: GitHubIcon },
  ];

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <Link
        href="/"
        className="font-mono text-sm text-muted transition hover:text-accent"
      >
        ← Volver al portafolio
      </Link>

      {/* Encabezado */}
      <header className="mt-8 flex flex-wrap items-center gap-6">
        <Image
          src={perfil.avatar}
          alt={`Foto de ${perfil.nombre}`}
          width={460}
          height={460}
          priority
          className="h-24 w-24 rounded-2xl border border-border object-cover"
        />

        <div className="min-w-0 flex-1">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {perfil.nombreCompleto}
          </h1>
          <p className="mt-1 text-lg font-medium text-accent">
            {perfil.titulo}
          </p>
          <p className="mt-1 text-sm text-muted">{perfil.ubicacion}</p>
        </div>
      </header>

      <ul className="mt-6 flex flex-wrap gap-2">
        {contacto.map(({ href, texto, Icono }) => (
          <li key={texto}>
            <a
              href={href}
              {...(href.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-muted transition hover:border-accent hover:text-accent"
            >
              <Icono className="h-4 w-4" />
              {texto}
            </a>
          </li>
        ))}
        {perfil.cv && (
          <li>
            <a
              href={perfil.cv}
              download
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-3 py-2 text-sm font-semibold text-bg transition hover:opacity-90"
            >
              <DownloadIcon />
              Descargar PDF
            </a>
          </li>
        )}
      </ul>

      <div className="mt-12 space-y-10">
        <Bloque titulo="Educación">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4">
            <h3 className="font-semibold">{educacion.institucion}</h3>
            <p className="font-mono text-xs text-muted">{educacion.periodo}</p>
          </div>
          <p className="mt-1 text-sm text-muted">
            {educacion.carrera} · {educacion.ciclo} · {educacion.ubicacion}
          </p>
          <p className="mt-2 text-sm text-muted">
            Promedio ponderado:{" "}
            <span className="font-semibold text-text">{educacion.promedio}</span>
          </p>
          <ul className="mt-2 space-y-1">
            {educacion.reconocimientos.map((r) => (
              <li key={r} className="text-sm text-muted">
                {r}
              </li>
            ))}
          </ul>
        </Bloque>

        <Bloque titulo="Experiencia">
          <div className="space-y-8">
            {experiencia.map((puesto) => (
              <article key={`${puesto.empresa}-${puesto.puesto}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="font-semibold">{puesto.puesto}</h3>
                  <p className="font-mono text-xs text-muted">
                    {puesto.periodo}
                  </p>
                </div>
                <p className="mt-0.5 text-sm font-medium text-accent">
                  {puesto.empresa}
                </p>
                <ul className="mt-3 space-y-1.5">
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
              </article>
            ))}
          </div>
        </Bloque>

        <Bloque titulo="Proyectos">
          <div className="space-y-6">
            {proyectos.map((proyecto) => (
              <article key={proyecto.nombre}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="font-semibold">
                    {proyecto.repo ? (
                      <a
                        href={proyecto.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition hover:text-accent"
                      >
                        {proyecto.nombre}
                      </a>
                    ) : (
                      proyecto.nombre
                    )}
                  </h3>
                  {proyecto.tipo && (
                    <p className="font-mono text-xs text-muted">
                      {proyecto.tipo}
                    </p>
                  )}
                </div>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  {proyecto.descripcion}
                </p>
                <ul className="mt-2 space-y-1.5">
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
                <p className="mt-2 font-mono text-xs text-muted">
                  {proyecto.tecnologias.join(" · ")}
                </p>
              </article>
            ))}
          </div>
        </Bloque>

        <Bloque titulo="Habilidades">
          <dl className="space-y-3">
            {stack.map((grupo) => (
              <div
                key={grupo.categoria}
                className="grid gap-1 sm:grid-cols-[180px_1fr] sm:gap-4"
              >
                <dt className="text-sm font-semibold">{grupo.categoria}</dt>
                <dd className="text-sm text-muted">
                  {grupo.items.join(" · ")}
                </dd>
              </div>
            ))}
          </dl>
        </Bloque>

        <Bloque titulo="Certificaciones">
          <ul className="space-y-2">
            {certificaciones.map((cert) => (
              <li
                key={cert.nombre}
                className="flex flex-wrap items-baseline justify-between gap-x-4 text-sm"
              >
                <span className="font-medium">{cert.nombre}</span>
                <span className="text-muted">{cert.emisor}</span>
              </li>
            ))}
          </ul>
        </Bloque>

        <Bloque titulo="Idiomas">
          <ul className="space-y-2">
            {idiomas.map((i) => (
              <li
                key={i.idioma}
                className="flex flex-wrap items-baseline justify-between gap-x-4 text-sm"
              >
                <span className="font-medium">{i.idioma}</span>
                <span className="text-muted">{i.nivel}</span>
              </li>
            ))}
          </ul>
        </Bloque>
      </div>
    </main>
  );
}
