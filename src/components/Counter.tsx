"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Cuenta de 0 al número indicado la primera vez que entra en pantalla.
 * `sufijo` conserva textos como "9.º" o "5+".
 */
export default function Counter({
  valor,
  sufijo = "",
  duracion = 900,
}: {
  valor: number;
  sufijo?: string;
  duracion?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [actual, setActual] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const sinMovimiento = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (sinMovimiento || typeof IntersectionObserver === "undefined") {
      const t = setTimeout(() => setActual(valor), 0);
      return () => clearTimeout(t);
    }

    let cuadro = 0;
    const observer = new IntersectionObserver(
      (entradas) => {
        if (!entradas[0].isIntersecting) return;
        observer.disconnect();

        const inicio = performance.now();
        const animar = (ahora: number) => {
          const avance = Math.min(1, (ahora - inicio) / duracion);
          // easeOutCubic: arranca rápido y frena al final.
          const suave = 1 - Math.pow(1 - avance, 3);
          setActual(Math.round(valor * suave));
          if (avance < 1) cuadro = requestAnimationFrame(animar);
        };
        cuadro = requestAnimationFrame(animar);
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (cuadro) cancelAnimationFrame(cuadro);
    };
  }, [valor, duracion]);

  return (
    <span ref={ref}>
      {actual}
      {sufijo}
    </span>
  );
}
