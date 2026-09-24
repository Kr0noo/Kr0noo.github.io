import type { MetadataRoute } from "next";

// Con `output: "export"` hay que declarar que se genera en el build.
export const dynamic = "force-static";

const SITIO = "https://kr0noo.github.io";

export default function sitemap(): MetadataRoute.Sitemap {
  const ahora = new Date();
  return [
    { url: `${SITIO}/`, lastModified: ahora, changeFrequency: "monthly", priority: 1 },
    { url: `${SITIO}/cv/`, lastModified: ahora, changeFrequency: "monthly", priority: 0.8 },
  ];
}
