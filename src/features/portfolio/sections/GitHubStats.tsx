"use client";

import { useEffect, useState } from "react";
import { perfil } from "@/features/portfolio/data/portfolio";
import { GitHubIcon, RepoIcon, StarOutlineIcon, UsersIcon } from "@/components/ui/Icons";

const USUARIO = "Kr0noo";

type Datos = {
  repos: number;
  seguidores: number;
  estrellas: number;
};

type Estado =
  | { fase: "cargando" }
  | { fase: "listo"; datos: Datos }
  | { fase: "error" };

type RepoApi = {
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

        setEstado({
          fase: "listo",
          datos: {
            repos: usuario.public_repos ?? propios.length,
            seguidores: usuario.followers ?? 0,
            estrellas: propios.reduce((a, r) => a + r.stargazers_count, 0),
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
    </div>
  );
}
