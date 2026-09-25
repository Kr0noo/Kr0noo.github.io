import About from "@/components/secciones/About";
import Certifications from "@/components/secciones/Certifications";
import CommandPalette from "@/components/layout/CommandPalette";
import Contact from "@/components/secciones/Contact";
import Experience from "@/components/secciones/Experience";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/secciones/Hero";
import Marquee from "@/components/ui/Marquee";
import Nav from "@/components/layout/Nav";
import Projects from "@/components/secciones/Projects";
import ScrollProgress from "@/components/layout/ScrollProgress";
import Skills from "@/components/secciones/Skills";

export default function Home() {
  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-bg"
      >
        Saltar al contenido
      </a>

      <ScrollProgress />
      <CommandPalette />
      <Nav />

      <main id="contenido" className="flex-1">
        <Hero />
        <Marquee />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
