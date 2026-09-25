import Image from "next/image";
import type { Proyecto } from "@/features/portfolio/data/portfolio";

/** Suma de códigos del nombre: da a cada proyecto un ángulo distinto y estable. */
function semilla(texto: string) {
  let n = 0;
  for (let i = 0; i < texto.length; i++) n = (n + texto.charCodeAt(i) * 7) % 360;
  return n;
}

function monograma(nombre: string) {
  return nombre
    .replace(/[^\p{L}\p{N} ]/gu, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

/**
 * Portada del proyecto. Con `imagen` muestra la captura; sin ella dibuja
 * una carátula generada para que la rejilla no quede coja.
 */
export default function ProjectCover({ proyecto }: { proyecto: Proyecto }) {
  if (proyecto.imagen) {
    return (
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border bg-surface-2">
        <Image
          src={proyecto.imagen}
          alt={`Captura de ${proyecto.nombre}`}
          fill
          sizes="(max-width: 768px) 100vw, 320px"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
    );
  }

  const angulo = semilla(proyecto.nombre);

  return (
    <div
      className="relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-xl border border-border"
      style={{
        background: `linear-gradient(${angulo}deg, var(--surface-2), var(--surface))`,
      }}
      aria-hidden="true"
    >
      <div className="cuadricula absolute inset-0 opacity-30" />
      <div
        className="absolute -right-6 -top-10 h-32 w-32 rounded-full blur-2xl"
        style={{ background: "var(--glow)" }}
      />
      <span className="relative bg-gradient-to-br from-accent to-accent-2 bg-clip-text font-mono text-5xl font-bold text-transparent">
        {monograma(proyecto.nombre)}
      </span>
    </div>
  );
}
