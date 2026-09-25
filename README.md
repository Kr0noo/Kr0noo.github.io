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

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # genera /out
```

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

Para saber dónde va un componente nuevo: **¿lleva contenido tuyo dentro?** →
`secciones`. **¿Está siempre en pantalla?** → `layout`. **¿Serviría en
cualquier otro proyecto?** → `ui`.

No hay archivos `index.ts` de barril a propósito: añaden ficheros, esconden
de dónde viene cada cosa y pueden provocar importaciones circulares.

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

Un proyecto sin `repo` y con `privado: true` muestra "Código privado" en vez
del enlace a GitHub. Con `demo` aparece el botón "Ver en vivo".

### Capturas de proyectos

Guarda la imagen en `public/proyectos/` y apunta a ella desde el campo
`imagen` del proyecto, por ejemplo `imagen: "/proyectos/shortcam.png"`.
Sin ese campo se dibuja una carátula generada con el monograma.

Todo esto alimenta a la vez la página principal y la página `/cv`.

### Actualizar el CV en PDF

Reemplaza `public/cv.pdf`. El botón "Descargar CV" aparece mientras
`perfil.cv` tenga valor; ponlo en `null` para ocultarlo.

## Por qué existe `scripts/arreglar-imagenes.mjs`

Next genera la imagen Open Graph y el favicon como rutas **sin extensión**
(`out/opengraph-image`). GitHub Pages deduce el Content-Type de la extensión,
así que los serviría como `application/octet-stream` y los rastreadores de
LinkedIn o WhatsApp descartarían la imagen.

El script corre solo después de `npm run build` (hook `postbuild`): renombra
esos archivos a `.png` y reescribe las referencias en el HTML.

## Despliegue

Cada `push` a `main` dispara `.github/workflows/deploy.yml`, que construye el sitio
y lo publica en GitHub Pages.

Requisito único: en **Settings → Pages**, poner *Source* en **GitHub Actions**.

## Stack

Next.js · React 19 · TypeScript · Tailwind CSS 4 · GitHub Actions
