import { perfil } from "@/data/portfolio";
import { GitHubIcon, InstagramIcon, MailIcon } from "./Icons";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-4 px-4 py-10 sm:flex-row sm:px-6">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} {perfil.nombre}. Hecho con Next.js y
          Tailwind CSS.
        </p>

        <ul className="flex items-center gap-2">
          <li>
            <a
              href={perfil.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted transition hover:border-accent hover:text-accent"
            >
              <GitHubIcon className="h-4 w-4" />
            </a>
          </li>
          <li>
            <a
              href={perfil.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted transition hover:border-accent hover:text-accent"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
          </li>
          <li>
            <a
              href={`mailto:${perfil.email}`}
              aria-label="Correo"
              className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted transition hover:border-accent hover:text-accent"
            >
              <MailIcon className="h-4 w-4" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
