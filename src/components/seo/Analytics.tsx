import { analitica } from "@/features/portfolio/data/portfolio";

/**
 * GoatCounter: sin cookies, sin datos personales y sin banner de consentimiento.
 * El script solo se inserta si hay código configurado, así que en local y
 * mientras no tengas cuenta el sitio no carga nada de terceros.
 */
export default function Analytics() {
  if (!analitica.goatcounter) return null;

  return (
    <script
      data-goatcounter={`https://${analitica.goatcounter}.goatcounter.com/count`}
      async
      src="//gc.zgo.at/count.js"
    />
  );
}
