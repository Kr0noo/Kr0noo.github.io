# Portafolio — Adderly Valverde

Portafolio personal construido con **Next.js 16**, **TypeScript** y **Tailwind CSS 4**,
exportado como sitio estático y desplegado automáticamente en GitHub Pages.

🔗 **https://kr0noo.github.io**

## Características

- Exportación estática (`output: "export"`) — sin servidor, sin costo.
- Modo claro / oscuro con preferencia guardada y sin parpadeo al cargar.
- Animaciones de entrada al hacer scroll, respetando `prefers-reduced-motion`.
- Navegación con resaltado de la sección activa y menú móvil.
- Metadatos Open Graph y SEO configurados.
- Accesible: enlace de salto al contenido, foco visible, etiquetas ARIA.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # genera /out
```

## Cómo actualizar el contenido

Todo el texto vive en **`src/data/portfolio.ts`**. No hace falta tocar los componentes.

| Qué cambiar | Dónde |
| --- | --- |
| Nombre, título, resumen, email, redes | `perfil` |
| Párrafos de "Sobre mí" | `sobreMi` |
| Tarjetas de datos rápidos | `datosRapidos` |
| Tecnologías por categoría | `stack` |
| Proyectos | `proyectos` (hay una plantilla comentada al final) |
| Certificaciones | `certificaciones` |

### Añadir tu CV

1. Copia tu PDF en `public/cv.pdf`.
2. En `src/data/portfolio.ts`, cambia `cv: null` por `cv: "/cv.pdf"`.

El botón "Descargar CV" aparece solo cuando ese campo tiene valor.

## Despliegue

Cada `push` a `main` dispara `.github/workflows/deploy.yml`, que construye el sitio
y lo publica en GitHub Pages.

Requisito único: en **Settings → Pages**, poner *Source* en **GitHub Actions**.

## Stack

Next.js · React 19 · TypeScript · Tailwind CSS 4 · GitHub Actions
