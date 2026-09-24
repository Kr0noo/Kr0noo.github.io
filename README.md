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
| Nombre, título, email, teléfono, redes | `perfil` |
| Roles que rotan en el hero | `perfil.roles` |
| Párrafos de "Sobre mí" | `sobreMi` |
| Universidad, ciclo, promedio, premios | `educacion` |
| Tarjetas de datos rápidos | `datosRapidos` |
| Puestos de trabajo | `experiencia` |
| Tecnologías por categoría | `stack` |
| Proyectos | `proyectos` (hay una plantilla comentada al final) |
| Certificaciones | `certificaciones` |
| Idiomas | `idiomas` |

Todo esto alimenta a la vez la página principal y la página `/cv`.

### Actualizar el CV en PDF

Reemplaza `public/cv.pdf`. El botón "Descargar CV" aparece mientras
`perfil.cv` tenga valor; ponlo en `null` para ocultarlo.

## Despliegue

Cada `push` a `main` dispara `.github/workflows/deploy.yml`, que construye el sitio
y lo publica en GitHub Pages.

Requisito único: en **Settings → Pages**, poner *Source* en **GitHub Actions**.

## Stack

Next.js · React 19 · TypeScript · Tailwind CSS 4 · GitHub Actions
