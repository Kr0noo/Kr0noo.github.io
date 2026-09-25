import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { perfil } from "@/features/portfolio/data/portfolio";

// Con `output: "export"` hay que declarar que la imagen se genera en el build.
export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${perfil.nombre} — ${perfil.titulo}`;

const FONDO = "#0a0e14";
const BORDE = "#1f2c3a";
const TEXTO = "#e6edf3";
const APAGADO = "#8da0b5";
const ACENTO = "#2dd4bf";

const ETIQUETAS = ["Django REST", "Next.js", "Spring Boot", "AWS", "Python"];

/**
 * Tarjeta que ven LinkedIn, WhatsApp, X y Slack al compartir el enlace.
 * Se genera una sola vez durante el build, así que puede leer del disco.
 */
export default function Image() {
  const avatar = readFileSync(join(process.cwd(), "public", "avatar.jpg"));
  const avatarSrc = `data:image/jpeg;base64,${avatar.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 64,
          padding: 80,
          background: FONDO,
          color: TEXTO,
          fontFamily: "sans-serif",
        }}
      >
        {/* Franja de acento a la izquierda */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 14,
            background: `linear-gradient(180deg, ${ACENTO}, #38bdf8)`,
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ display: "flex", fontSize: 26, color: ACENTO }}>
            {perfil.ubicacion}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 700,
              marginTop: 12,
              letterSpacing: -2,
            }}
          >
            {perfil.nombre}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 40,
              color: ACENTO,
              marginTop: 8,
            }}
          >
            {perfil.titulo}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 26,
              color: APAGADO,
              marginTop: 24,
            }}
          >
            {perfil.empresaActual} · Ingeniería de Sistemas
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 40 }}>
            {ETIQUETAS.map((etiqueta) => (
              <div
                key={etiqueta}
                style={{
                  display: "flex",
                  padding: "10px 20px",
                  borderRadius: 12,
                  border: `1px solid ${BORDE}`,
                  color: APAGADO,
                  fontSize: 22,
                }}
              >
                {etiqueta}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", position: "relative" }}>
          <div
            style={{
              position: "absolute",
              inset: -10,
              borderRadius: 999,
              background: `linear-gradient(135deg, ${ACENTO}, #38bdf8)`,
            }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={avatarSrc}
            alt=""
            width={300}
            height={300}
            style={{ borderRadius: 999, objectFit: "cover" }}
          />
        </div>
      </div>
    ),
    size,
  );
}
