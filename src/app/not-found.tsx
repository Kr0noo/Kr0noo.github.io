import Link from "next/link";
import { perfil } from "@/data/portfolio";

export const metadata = { title: "Página no encontrada" };

export default function NoEncontrada() {
  return (
    <main className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-4 text-center">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="cuadricula absolute inset-0 opacity-40" />
        <div
          className="aurora left-1/2 top-1/3 h-80 w-80 -translate-x-1/2"
          style={{ background: "var(--glow)" }}
        />
      </div>

      <p className="font-mono text-sm text-accent">Error 404</p>

      <h1 className="mt-4 text-5xl font-bold tracking-tight sm:text-7xl">
        Esta página no existe
      </h1>

      <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
        El enlace que seguiste no lleva a ningún sitio. Puede que la dirección
        esté mal escrita o que el contenido ya no esté aquí.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-bg transition hover:opacity-90"
        >
          Volver al inicio
        </Link>
        <Link
          href="/cv"
          className="rounded-xl border border-border bg-surface px-5 py-3 text-sm font-semibold transition hover:border-accent hover:text-accent"
        >
          Ver mi CV
        </Link>
        <a
          href={`mailto:${perfil.email}`}
          className="rounded-xl border border-border bg-surface px-5 py-3 text-sm font-semibold transition hover:border-accent hover:text-accent"
        >
          Escribirme
        </a>
      </div>
    </main>
  );
}
