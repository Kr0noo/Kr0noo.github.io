"use client";

import { useEffect, useState } from "react";
import { navegacion, perfil } from "@/data/portfolio";
import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  const [desplazado, setDesplazado] = useState(false);
  const [abierto, setAbierto] = useState(false);
  const [activo, setActivo] = useState<string>("");

  useEffect(() => {
    const alScroll = () => setDesplazado(window.scrollY > 12);
    alScroll();
    window.addEventListener("scroll", alScroll, { passive: true });
    return () => window.removeEventListener("scroll", alScroll);
  }, []);

  // Marca en el menú la sección que se está viendo.
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const secciones = navegacion
      .map((n) => document.querySelector(n.href))
      .filter((el): el is Element => el !== null);

    const observer = new IntersectionObserver(
      (entradas) => {
        const visible = entradas
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActivo(`#${visible.target.id}`);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5] },
    );

    secciones.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        desplazado
          ? "border-b border-border bg-bg/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Principal"
        className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between gap-4 px-4 sm:px-6"
      >
        <a
          href="#inicio"
          className="font-mono text-sm font-semibold tracking-tight"
        >
          <span className="text-accent">{"<"}</span>
          {perfil.alias}
          <span className="text-accent">{" />"}</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navegacion.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                aria-current={activo === item.href ? "true" : undefined}
                className={`rounded-lg px-3 py-2 text-sm transition hover:text-accent ${
                  activo === item.href ? "text-accent" : "text-muted"
                }`}
              >
                {item.texto}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="/cv/"
            className="hidden rounded-lg border border-border bg-surface px-3 py-2 text-sm text-muted transition hover:border-accent hover:text-accent sm:block"
          >
            CV
          </a>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setAbierto((v) => !v)}
            aria-expanded={abierto}
            aria-controls="menu-movil"
            aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
            className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-surface text-muted transition hover:border-accent hover:text-accent md:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {abierto ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {abierto && (
        <ul
          id="menu-movil"
          className="border-t border-border bg-bg/95 px-4 py-2 backdrop-blur-md md:hidden"
        >
          {navegacion.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setAbierto(false)}
                className="block rounded-lg px-2 py-3 text-sm text-muted transition hover:text-accent"
              >
                {item.texto}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
