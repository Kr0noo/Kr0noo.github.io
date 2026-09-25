import About from "@/features/portfolio/sections/About";
import Certifications from "@/features/portfolio/sections/Certifications";
import CommandPalette from "@/features/command-palette/CommandPalette";
import Contact from "@/features/portfolio/sections/Contact";
import Experience from "@/features/portfolio/sections/Experience";
import Footer from "@/components/layout/Footer";
import Hero from "@/features/portfolio/sections/Hero";
import Marquee from "@/components/ui/Marquee";
import Nav from "@/components/layout/Nav";
import Projects from "@/features/portfolio/sections/Projects";
import ScrollProgress from "@/components/layout/ScrollProgress";
import Skills from "@/features/portfolio/sections/Skills";

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
