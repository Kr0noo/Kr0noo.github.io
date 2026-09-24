/**
 * Next genera las imágenes de metadatos como rutas sin extensión
 * (`out/opengraph-image`, `out/icon`). GitHub Pages deduce el Content-Type
 * de la extensión, así que las serviría como `application/octet-stream` y
 * los rastreadores de LinkedIn, WhatsApp o Slack descartarían la imagen.
 *
 * Este paso las renombra a `.png` y reescribe las referencias en el HTML.
 * Se ejecuta solo con `npm run build` (script `postbuild`).
 */
import { readdir, readFile, rename, stat, writeFile } from "node:fs/promises";
import { join } from "node:path";

const SALIDA = "out";
const RUTAS = ["opengraph-image", "icon"];

async function existe(ruta) {
  try {
    await stat(ruta);
    return true;
  } catch {
    return false;
  }
}

/** Devuelve todos los archivos de texto donde puede haber referencias. */
async function archivosDeTexto(dir) {
  const encontrados = [];
  for (const entrada of await readdir(dir, { withFileTypes: true })) {
    const ruta = join(dir, entrada.name);
    if (entrada.isDirectory()) {
      encontrados.push(...(await archivosDeTexto(ruta)));
    } else if (/\.(html|txt|json)$/.test(entrada.name)) {
      encontrados.push(ruta);
    }
  }
  return encontrados;
}

const renombradas = [];

for (const nombre of RUTAS) {
  const origen = join(SALIDA, nombre);
  if (!(await existe(origen))) continue;
  await rename(origen, `${origen}.png`);
  renombradas.push(nombre);
}

if (renombradas.length === 0) {
  console.log("arreglar-imagenes: no había nada que renombrar");
  process.exit(0);
}

let tocados = 0;

for (const archivo of await archivosDeTexto(SALIDA)) {
  const original = await readFile(archivo, "utf8");
  let texto = original;

  for (const nombre of renombradas) {
    // `/icon?a1b2c3` y `/icon` → `/icon.png`, con o sin hash de caché.
    // El lookahead exige que la ruta termine ahí: así `/icons/x` no se toca.
    texto = texto.replaceAll(
      new RegExp(`/${nombre}(\\?[A-Za-z0-9]+)?(?=["'\\\\\\s)])`, "g"),
      `/${nombre}.png`,
    );
  }

  if (texto !== original) {
    await writeFile(archivo, texto);
    tocados++;
  }
}

console.log(
  `arreglar-imagenes: ${renombradas.join(", ")} → .png (${tocados} archivos actualizados)`,
);
