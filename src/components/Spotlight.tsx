"use client";

import type { CSSProperties, MouseEvent, ReactNode } from "react";

/**
 * Envoltorio que mueve el brillo de la tarjeta hacia el cursor.
 * Sin JS activo la tarjeta se ve igual, solo sin el brillo.
 */
export default function Spotlight({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  function alMover(evento: MouseEvent<HTMLDivElement>) {
    const caja = evento.currentTarget.getBoundingClientRect();
    evento.currentTarget.style.setProperty(
      "--mx",
      `${evento.clientX - caja.left}px`,
    );
    evento.currentTarget.style.setProperty(
      "--my",
      `${evento.clientY - caja.top}px`,
    );
  }

  return (
    <div onMouseMove={alMover} className={`foco ${className}`} style={style}>
      {children}
    </div>
  );
}
