# Portafolio — Adderly Valverde

Portafolio personal construido con **Next.js 16**, **TypeScript** y **Tailwind CSS 4**,
exportado como sitio estático y desplegado automáticamente en GitHub Pages.

🔗 **https://kr0noo.github.io**

## Características

- Exportación estática (`output: "export"`) — sin servidor, sin costo.
- Página `/cv` con el currículum en HTML, más el PDF descargable.
- Modo claro / oscuro con preferencia guardada y sin parpadeo al cargar.
- Animaciones de entrada al hacer scroll, respetando `prefers-reduced-motion`.
- Navegación con resaltado de la sección activa y menú móvil.
- Metadatos Open Graph y SEO configurados.
- Accesible: enlace de salto al contenido, foco visible, etiquetas ARIA.
- Paleta de comandos con ⌘K / Ctrl+K: navegar, copiar datos, cambiar tema.
- Tarjeta de actividad de GitHub alimentada por su API pública.
- Imagen de previsualización (Open Graph) y favicon generados en el build.
- JSON-LD de persona, `sitemap.xml`, `robots.txt` y página 404 propia.
- Estilos de impresión: `/cv` sale legible en papel aunque el tema sea oscuro.

## Estructura

```
src/
├── app/                  rutas y archivos de metadatos (sitemap, robots, og)
├── components/
│   ├── secciones/        cada bloque de la home, con contenido propio
│   ├── layout/           el armazón siempre presente (nav, pie, paleta ⌘K)
│   ├── ui/               piezas reutilizables sin contenido propio
│   └── seo/              no pintan nada visible (JSON-LD, analítica)
├── data/portfolio.ts     todo el contenido del sitio
└── lib/                  constantes compartidas
```

Requisito único: en **Settings → Pages**, poner *Source* en **GitHub Actions**.

## Stack

Next.js · React 19 · TypeScript · Tailwind CSS 4 · GitHub Actions
