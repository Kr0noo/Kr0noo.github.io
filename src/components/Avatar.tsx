import Image from "next/image";
import { perfil } from "@/data/portfolio";

/** Foto de perfil con anillo de gradiente giratorio y resplandor detrás. */
export default function Avatar({ tamano = 200 }: { tamano?: number }) {
  return (
    <div
      className="relative flotar-suave"
      style={{ width: tamano, height: tamano }}
    >
      <div
        className="absolute -inset-6 rounded-full blur-2xl"
        style={{ background: "var(--glow)" }}
        aria-hidden="true"
      />
      <div className="anillo absolute -inset-[3px] rounded-full" aria-hidden="true" />
      <div className="absolute inset-0 overflow-hidden rounded-full border border-border bg-surface">
        <Image
          src={perfil.avatar}
          alt={`Foto de ${perfil.nombre}`}
          width={460}
          height={460}
          priority
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
