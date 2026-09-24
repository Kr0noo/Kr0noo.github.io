"use client";

import { useEffect, useRef } from "react";

/** Barra fina en el borde superior que marca cuánto llevas leído. */
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let pendiente = 0;

    const pintar = () => {
      pendiente = 0;
      const el = ref.current;
      if (!el) return;
      const alto =
        document.documentElement.scrollHeight - window.innerHeight;
      const avance = alto > 0 ? window.scrollY / alto : 0;
      el.style.transform = `scaleX(${Math.min(1, Math.max(0, avance))})`;
    };

    // rAF para no recalcular en cada evento de scroll.
    const alScroll = () => {
      if (pendiente) return;
      pendiente = requestAnimationFrame(pintar);
    };

    pintar();
    window.addEventListener("scroll", alScroll, { passive: true });
    window.addEventListener("resize", alScroll, { passive: true });
    return () => {
      if (pendiente) cancelAnimationFrame(pendiente);
      window.removeEventListener("scroll", alScroll);
      window.removeEventListener("resize", alScroll);
    };
  }, []);

  return (
    <div
      className="fixed inset-x-0 top-0 z-[60] h-0.5"
      aria-hidden="true"
    >
      <div ref={ref} className="progreso h-full w-full scale-x-0" />
    </div>
  );
}
