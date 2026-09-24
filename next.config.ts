import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Exportación estática: genera HTML plano en /out para GitHub Pages.
  output: "export",
  // GitHub Pages sirve /ruta/ como carpeta, no como archivo.
  trailingSlash: true,
  // El optimizador de imágenes de Next necesita un servidor; en Pages no existe.
  images: { unoptimized: true },
};

export default nextConfig;
