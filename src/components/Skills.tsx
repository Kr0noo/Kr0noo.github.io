import { stack } from "@/data/portfolio";
import Reveal from "./Reveal";
import Section from "./Section";

export default function Skills() {
  return (
    <Section
      id="stack"
      numero="02"
      titulo="Stack técnico"
      descripcion="Tecnologías con las que trabajo a diario y las que estoy incorporando."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {stack.map((grupo, i) => (
          <Reveal key={grupo.categoria} delay={i * 70}>
            <div className="h-full rounded-2xl border border-border bg-surface p-6 transition hover:border-accent/50">
              <h3 className="font-mono text-xs uppercase tracking-wider text-accent">
                {grupo.categoria}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {grupo.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-border bg-surface-2 px-2.5 py-1 text-sm text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
