import {
  certificaciones,
  educacion,
  experiencia,
  perfil,
  stack,
} from "@/features/portfolio/data/portfolio";

const SITIO = "https://kr0noo.github.io";

/**
 * Datos estructurados schema.org. Le dicen a Google quién eres, dónde
 * trabajas y qué sabes hacer, en vez de que lo deduzca del texto.
 */
export default function JsonLd() {
  const persona = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: perfil.nombreCompleto,
    alternateName: perfil.alias,
    url: `${SITIO}/`,
    image: `${SITIO}${perfil.avatar}`,
    email: `mailto:${perfil.email}`,
    telephone: perfil.telefono,
    jobTitle: perfil.titulo,
    description: perfil.resumen,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lima",
      addressCountry: "PE",
    },
    worksFor: {
      "@type": "Organization",
      name: experiencia[0].empresa,
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: educacion.institucion,
    },
    knowsLanguage: ["es", "en"],
    knowsAbout: stack.flatMap((grupo) => grupo.items),
    hasCredential: certificaciones.map((cert) => ({
      "@type": "EducationalOccupationalCredential",
      name: cert.nombre,
      recognizedBy: { "@type": "Organization", name: cert.emisor },
    })),
    sameAs: [perfil.github, perfil.linkedin, perfil.instagram],
  };

  return (
    <script
      type="application/ld+json"
      // El objeto es nuestro, no viene de fuera: no hay contenido que sanear.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(persona) }}
    />
  );
}
