import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Analytics from "@/components/seo/Analytics";
import JsonLd from "@/components/seo/JsonLd";
import { perfil } from "@/features/portfolio/data/portfolio";
import "./globals.css";

const sans = Geist({ variable: "--font-sans-stack", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono-stack", subsets: ["latin"] });

const url = "https://kr0noo.github.io";
const descripcion = perfil.resumen;

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: `${perfil.nombre} — ${perfil.titulo}`,
    template: `%s · ${perfil.nombre}`,
  },
  description: descripcion,
  keywords: [
    "Adderly Valverde",
    "desarrollador backend",
    "Spring Boot",
    "Java",
    "AWS",
    "Next.js",
    "portafolio",
    "prácticas preprofesionales",
  ],
  authors: [{ name: perfil.nombre, url: perfil.github }],
  creator: perfil.nombre,
  openGraph: {
    type: "website",
    locale: "es_PE",
    url,
    siteName: `${perfil.nombre} — Portafolio`,
    title: `${perfil.nombre} — ${perfil.titulo}`,
    description: descripcion,
  },
  twitter: {
    card: "summary_large_image",
    title: `${perfil.nombre} — ${perfil.titulo}`,
    description: descripcion,
  },
  robots: { index: true, follow: true },
};

/**
 * Aplica el tema guardado antes del primer pintado para evitar el parpadeo
 * blanco→negro al cargar.
 */
const scriptTema = `
try {
  var t = localStorage.getItem("tema");
  if (t === "dark" || t === "light") document.documentElement.dataset.theme = t;
} catch (e) {}
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // `suppressHydrationWarning`: el script de arriba añade `data-theme` antes
    // de que React hidrate, así que el HTML del servidor y el DOM del cliente
    // difieren a propósito. Solo silencia los atributos de este elemento.
    <html
      lang="es"
      className={`${sans.variable} ${mono.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: scriptTema }} />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <JsonLd />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
