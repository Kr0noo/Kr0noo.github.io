import type { ReactElement } from "react";
import { navegacion, perfil } from "@/features/portfolio/data/portfolio";
import {
  CheckIcon,
  CopyIcon,
  DownloadIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  PhoneIcon,
  SectionIcon,
  ThemeIcon,
} from "@/components/ui/Icons";

export type Comando = {
  id: string;
  texto: string;
  grupo: string;
  /** Palabras extra por las que también se encuentra el comando al buscar. */
  pistas?: string;
  Icono: (p: { className?: string }) => ReactElement;
  ejecutar: () => void;
};

/** Lo que la paleta necesita del componente para poder actuar. */
type Contexto = {
  cerrar: () => void;
  copiar: (valor: string, etiqueta: string) => void;
  /** Qué se acaba de copiar, para enseñar el visto en vez del icono normal. */
  copiado: string | null;
  irARuta: (ruta: string) => void;
};

function alternarTema() {
  const raiz = document.documentElement;
  const actual =
    raiz.dataset.theme ??
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");
  const siguiente = actual === "dark" ? "light" : "dark";

  raiz.dataset.theme = siguiente;
  try {
    localStorage.setItem("tema", siguiente);
  } catch {
    /* almacenamiento bloqueado: el cambio vale solo para esta vista */
  }
  window.dispatchEvent(new Event("tema:cambio"));
}

function descargarCV() {
  const a = document.createElement("a");
  a.href = "/cv.pdf";
  a.download = "CV-Adderly-Valverde.pdf";
  a.click();
}

/**
 * Construye la lista completa de comandos de la paleta.
 * Vive aparte del componente para que añadir uno sea editar solo este archivo.
 */
export function construirComandos({
  cerrar,
  copiar,
  copiado,
  irARuta,
}: Contexto): Comando[] {
  const irASeccion = (href: string) => () => {
    cerrar();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const abrirExterno = (url: string) => () => {
    cerrar();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const irAEnlace = (destino: string) => () => {
    cerrar();
    window.location.href = destino;
  };

  return [
    ...navegacion.map((item) => ({
      id: `ir-${item.href}`,
      texto: `Ir a ${item.texto}`,
      grupo: "Navegación",
      Icono: SectionIcon,
      ejecutar: irASeccion(item.href),
    })),
    {
      id: "cv",
      texto: "Ver mi currículum",
      grupo: "Navegación",
      pistas: "cv resumen hoja de vida",
      Icono: SectionIcon,
      ejecutar: () => {
        cerrar();
        irARuta("/cv/");
      },
    },
    {
      id: "descargar-cv",
      texto: "Descargar CV en PDF",
      grupo: "Acciones",
      pistas: "pdf descargar",
      Icono: DownloadIcon,
      ejecutar: () => {
        cerrar();
        descargarCV();
      },
    },
    {
      id: "copiar-correo",
      texto: `Copiar correo · ${perfil.email}`,
      grupo: "Acciones",
      pistas: "email mail portapapeles",
      Icono: copiado === "correo" ? CheckIcon : CopyIcon,
      ejecutar: () => copiar(perfil.email, "correo"),
    },
    {
      id: "copiar-telefono",
      texto: `Copiar teléfono · ${perfil.telefono}`,
      grupo: "Acciones",
      pistas: "celular numero portapapeles",
      Icono: copiado === "teléfono" ? CheckIcon : CopyIcon,
      ejecutar: () => copiar(perfil.telefono, "teléfono"),
    },
    {
      id: "escribir",
      texto: "Escribirme un correo",
      grupo: "Acciones",
      pistas: "contacto mail",
      Icono: MailIcon,
      ejecutar: irAEnlace(`mailto:${perfil.email}`),
    },
    {
      id: "llamar",
      texto: "Llamarme",
      grupo: "Acciones",
      pistas: "telefono celular",
      Icono: PhoneIcon,
      ejecutar: irAEnlace(`tel:${perfil.telefonoEnlace}`),
    },
    {
      id: "tema",
      texto: "Cambiar tema claro / oscuro",
      grupo: "Acciones",
      pistas: "modo noche dark light",
      Icono: ThemeIcon,
      ejecutar: () => {
        alternarTema();
        cerrar();
      },
    },
    {
      id: "github",
      texto: "Abrir GitHub",
      grupo: "Enlaces",
      Icono: GitHubIcon,
      ejecutar: abrirExterno(perfil.github),
    },
    {
      id: "linkedin",
      texto: "Abrir LinkedIn",
      grupo: "Enlaces",
      Icono: LinkedInIcon,
      ejecutar: abrirExterno(perfil.linkedin),
    },
  ];
}
