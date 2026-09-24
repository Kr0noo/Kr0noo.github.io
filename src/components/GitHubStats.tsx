"use client";

import { useEffect, useState } from "react";
import { perfil } from "@/data/portfolio";
import { GitHubIcon, RepoIcon, StarOutlineIcon, UsersIcon } from "./Icons";

const USUARIO = "Kr0noo";

type Datos = {
  repos: number;
  seguidores: number;
  estrellas: number;
  lenguajes: { nombre: string; porcentaje: number }[];
};

type Estado =
  | { fase: "cargando" }
  | { fase: "listo"; datos: Datos }
  | { fase: "error" };

type RepoApi = {
  language: string | null;
  stargazers_count: number;
  fork: boolean;
};

/**
 * Lee la API pública de GitHub desde el navegador (el sitio es estático, así
 * que no hay servidor donde hacerlo). Sin token el límite es de 60 peticiones
 * por hora y por IP; si se agota, el bloque simplemente no se muestra.
 */
export default function GitHubStats() {
  const [estado, setEstado] = useState<Estado>({ fase: "cargando" });

  useEffect(() => {
    const control = new AbortController();

    async function cargar() {
      try {
        const [rUsuario, rRepos] = await Promise.all([
          fetch(`https://api.github.com/users/${USUARIO}`, {
            signal: control.signal,
          }),
          fetch(
            `https://api.github.com/users/${USUARIO}/repos?per_page=100&sort=updated`,
            { signal: control.signal },
          ),
        ]);

        if (!rUsuario.ok || !rRepos.ok) throw new Error("respuesta no válida");

        const usuario = await rUsuario.json();
        const repos: RepoApi[] = await rRepos.json();
        const propios = repos.filter((r) => !r.fork);

        const conteo = new Map<string, number>();
        for (const repo of propios) {
          if (!repo.language) continue;
          conteo.set(repo.language, (conteo.get(repo.language) ?? 0) + 1);
        }

        const total = [...conteo.values()].reduce((a, b) => a + b, 0);
        const lenguajes = [...conteo.entries()]
          .sort((a, b) => b[1] - a[1])
          .slice(0, 4)
          .map(([nombre, n]) => ({
            nombre,
            porcentaje: Math.round((n / total) * 100),
          }));

        setEstado({
          fase: "listo",
          datos: {
            repos: usuario.public_repos ?? propios.length,
            seguidores: usuario.followers ?? 0,
            estrellas: propios.reduce((a, r) => a + r.stargazers_count, 0),
            lenguajes,
          },
        });
      } catch (error) {
        if ((error as Error).name === "AbortError") return;
        setEstado({ fase: "error" });
      }
    }

    cargar();
    return () => control.abort();
  }, []);

  // Si GitHub no responde, no se enseña un bloque roto.
  if (estado.fase === "error") return null;

  const cargando = estado.fase === "cargando";
  const datos = estado.fase === "listo" ? estado.datos : null;

  const metricas = [
    { etiqueta: "Repositorios", valor: datos?.repos, Icono: RepoIcon },
    { etiqueta: "Estrellas", valor: datos?.estrellas, Icono: StarOutlineIcon },
    { etiqueta: "Seguidores", valor: datos?.seguidores, Icono: UsersIcon },
  ];

  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="flex items-center gap-2 text-sm font-semibold">
          <GitHubIcon className="h-4 w-4 text-muted" />
          Actividad en GitHub
        </h3>
        <a
          href={perfil.github}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-muted transition hover:text-accent"
        >
          @{USUARIO}
        </a>
      </div>

      <dl className="mt-5 grid grid-cols-3 gap-3">
        {metricas.map(({ etiqueta, valor, Icono }) => (
          <div
            key={etiqueta}
            className="rounded-xl border border-border bg-surface-2 p-3 text-center"
          >
            <Icono className="mx-auto h-4 w-4 text-accent" />
            <dd className="mt-2 text-xl font-bold tabular-nums">
              {cargando ? (
                <span className="mx-auto block h-6 w-8 animate-pulse rounded bg-border" />
              ) : (
                valor
              )}
            </dd>
            <dt className="mt-0.5 font-mono text-[11px] uppercase tracking-wider text-muted">
              {etiqueta}
            </dt>
          </div>
        ))}
      </dl>

      {datos && datos.lenguajes.length > 0 && (
        <div className="mt-5">
          <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
            Lenguajes más usados
          </p>

          <div className="mt-3 flex h-2 overflow-hidden rounded-full bg-surface-2">
            {datos.lenguajes.map((lenguaje, i) => (
              <div
                key={lenguaje.nombre}
                style={{
                  width: `${lenguaje.porcentaje}%`,
                  // Degradado del acento al secundario según la posición.
                  opacity: 1 - i * 0.22,
                  background:
                    i % 2 === 0 ? "var(--accent)" : "var(--accent-2)",
                }}
                title={`${lenguaje.nombre}: ${lenguaje.porcentaje} %`}
              />
            ))}
          </div>

          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
            {datos.lenguajes.map((lenguaje) => (
              <li
                key={lenguaje.nombre}
                className="text-xs text-muted tabular-nums"
              >
                {lenguaje.nombre} · {lenguaje.porcentaje} %
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
