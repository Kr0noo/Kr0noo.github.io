import type { MetadataRoute } from "next";

// Con `output: "export"` hay que declarar que se genera en el build.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://kr0noo.github.io/sitemap.xml",
  };
}
