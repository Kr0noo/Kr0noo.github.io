import { perfil } from "@/features/portfolio/data/portfolio";
import Avatar from "@/components/ui/Avatar";
import TypedRoles from "@/components/ui/TypedRoles";
import {
  ArrowDownIcon,
  DownloadIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
} from "@/components/ui/Icons";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[92svh] items-center overflow-hidden pt-16"
    >
      {/* Decoración de fondo */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="cuadricula absolute inset-0 opacity-40" />
        <div
          className="aurora left-[-10%] top-[8%] h-72 w-72"
          style={{ background: "var(--glow)" }}
        />
        <div
          className="aurora right-[-8%] top-[30%] h-80 w-80"
          style={{ background: "var(--glow)", animationDelay: "-6s" }}
        />
      </div>

      <div className="mx-auto grid w-full max-w-5xl gap-12 px-4 py-20 sm:px-6 md:grid-cols-[1.5fr_auto] md:items-center">
        <div>
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Desarrollador en {perfil.empresaActual} · {perfil.ubicacion}
          </p>

          <p className="font-mono text-sm text-accent">Hola, soy</p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            {perfil.nombre}
          </h1>

          <p className="mt-4 text-2xl font-semibold sm:text-4xl">
            <TypedRoles roles={perfil.roles} />
          </p>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {perfil.resumen}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#proyectos"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-bg transition hover:opacity-90"
            >
              Ver proyectos
              <ArrowDownIcon />
            </a>

            {perfil.cv && (
              <a
                href={perfil.cv}
                download
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-5 py-3 text-sm font-semibold transition hover:border-accent hover:text-accent"
              >
                <DownloadIcon />
                Descargar CV
              </a>
            )}

            <a
              href={`mailto:${perfil.email}`}
              aria-label="Escríbeme por correo"
              className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-surface text-muted transition hover:border-accent hover:text-accent"
            >
              <MailIcon className="h-4 w-4" />
            </a>

            <a
              href={perfil.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-surface text-muted transition hover:border-accent hover:text-accent"
            >
              <LinkedInIcon className="h-4 w-4" />
            </a>

            <a
              href={perfil.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-surface text-muted transition hover:border-accent hover:text-accent"
            >
              <GitHubIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="order-first flex justify-center md:order-none">
          <Avatar tamano={220} />
        </div>
      </div>
    </section>
  );
}
